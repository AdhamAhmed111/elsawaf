import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { DeliveryHotlineSection } from './components/DeliveryHotlineSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { OrderDrawer, CartItem } from './components/OrderDrawer';
import { AdminBar } from './components/AdminBar';
import { AdminItemModal } from './components/AdminItemModal';
import { AdminBannerModal, BannerSettings, DEFAULT_OFFER_ITEMS } from './components/AdminBannerModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { MenuItem, MENU_ITEMS, ReviewItem, REVIEWS_DATA, RESTAURANT_INFO } from './data/restaurantData';
import { useAdminAuth } from './hooks/useAdminAuth';
import {
  loadSiteData,
  seedMenu,
  saveMenuItemRemote,
  deleteMenuItemRemote,
  saveBannerRemote,
  saveReviewsRemote,
  resetRemote,
} from './lib/siteStore';
import { isFirebaseConfigured } from './lib/firebase';
import { Phone, MessageCircle, ShoppingBag, ShieldCheck } from 'lucide-react';

const defaultBanner = (): BannerSettings => ({
  offerTitle: 'عرض السهرات والعائلات',
  offerSubtitle: 'صينية الصواف الملكية المتكاملة',
  offerServings: 'تكفي 5 - 6 أفراد',
  offerItems: DEFAULT_OFFER_ITEMS,
  lateNightBadge: RESTAURANT_INFO.lateNightBadge,
  customAnnouncement: '',
  phone: RESTAURANT_INFO.phone,
  royalPlatterPrice: 920,
});

const normalizeBanner = (parsed: any): BannerSettings => {
  const d = defaultBanner();
  return {
    offerTitle: parsed?.offerTitle || d.offerTitle,
    offerSubtitle: parsed?.offerSubtitle || d.offerSubtitle,
    offerServings: parsed?.offerServings || d.offerServings,
    offerItems: Array.isArray(parsed?.offerItems) && parsed.offerItems.length > 0 ? parsed.offerItems : d.offerItems,
    lateNightBadge: parsed?.lateNightBadge || d.lateNightBadge,
    customAnnouncement: parsed?.customAnnouncement || '',
    phone: parsed?.phone || d.phone,
    royalPlatterPrice: parsed?.royalPlatterPrice || d.royalPlatterPrice,
  };
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState<boolean>(false);

  // Real owner authentication (Google account + Firestore rules). No password inside the code,
  // and nothing in the URL can switch admin mode on.
  const { isAdmin, signingIn, authError, firebaseReady, loginWithGoogle, logout } = useAdminAuth();
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState<boolean>(false);
  const [adminWelcomeToast, setAdminWelcomeToast] = useState<string | null>(null);

  // Shared data (loaded from the database; defaults are used until then / if it is not set up)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [bannerSettings, setBannerSettings] = useState<BannerSettings>(defaultBanner);
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  // true once the menu has been saved to the database at least once
  const menuSeededRef = useRef(false);

  const toast = (message: string, ms = 4000) => {
    setAdminWelcomeToast(message);
    setTimeout(() => setAdminWelcomeToast(null), ms);
  };

  const saveFailed = (err: unknown) => {
    console.error('Saving to the database failed:', err);
    toast('تعذر الحفظ على قاعدة البيانات. تأكد من الاتصال ومن نشر قواعد Firestore (firestore.rules).', 7000);
  };

  // Load what the owner saved (so every visitor sees the latest menu, prices and offers)
  useEffect(() => {
    let cancelled = false;
    loadSiteData()
      .then((data) => {
        if (cancelled || !data) return;
        if (data.menuSeeded) {
          menuSeededRef.current = true;
          setMenuItems(data.menu);
        }
        if (data.banner) setBannerSettings(normalizeBanner(data.banner));
        if (data.reviews) setReviews(data.reviews);
      })
      .catch((err) => console.warn('Could not load saved site data, using defaults:', err));
    return () => {
      cancelled = true;
    };
  }, []);

  // The login window opens when the address ends with #admin. This only SHOWS the sign-in,
  // it never grants access by itself.
  useEffect(() => {
    const check = () => {
      if (window.location.hash.toLowerCase() === '#admin') setIsAdminLoginModalOpen(true);
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  // Close the window and greet the owner once sign-in succeeded
  const wasAdminRef = useRef(false);
  useEffect(() => {
    if (isAdmin && !wasAdminRef.current) {
      setIsAdminLoginModalOpen(false);
      toast('👑 مرحباً بك! تم تفعيل وضع إدارة كبابجي الصواف.');
      if (window.location.hash.toLowerCase() === '#admin') {
        window.history.replaceState({}, '', window.location.pathname + window.location.search);
      }
    }
    wasAdminRef.current = isAdmin;
  }, [isAdmin]);

  const closeLoginModal = () => {
    setIsAdminLoginModalOpen(false);
    if (window.location.hash.toLowerCase() === '#admin') {
      window.history.replaceState({}, '', window.location.pathname + window.location.search);
    }
  };

  // ---- Persistence helpers (owner only; the database rules enforce this too) ----
  const persistMenuItem = async (item: MenuItem, fullList: MenuItem[]) => {
    if (!isFirebaseConfigured) return;
    try {
      if (!menuSeededRef.current) {
        await seedMenu(fullList);
        menuSeededRef.current = true;
      } else {
        await saveMenuItemRemote(item);
      }
    } catch (err) {
      saveFailed(err);
    }
  };

  const persistBanner = async (banner: BannerSettings) => {
    if (!isFirebaseConfigured) return;
    try {
      await saveBannerRemote(banner);
    } catch (err) {
      saveFailed(err);
    }
  };

  const persistReviews = async (items: ReviewItem[]) => {
    if (!isFirebaseConfigured) return;
    try {
      await saveReviewsRemote(items);
    } catch (err) {
      saveFailed(err);
    }
  };

  // Sync banner/offer changes (and keep the royal platter menu item connected to the offer)
  const saveBannerSettings = (newSettings: BannerSettings) => {
    setBannerSettings(newSettings);
    persistBanner(newSettings);

    const updated = menuItems.map((item) => {
      if (item.id === 'platter-royal' || (item.category === 'platters' && item.popular)) {
        return {
          ...item,
          name: newSettings.offerSubtitle
            ? `${newSettings.offerSubtitle} (${newSettings.offerServings || 'تكفي 5 - 6 أفراد'})`
            : item.name,
          description:
            newSettings.offerItems && newSettings.offerItems.length > 0
              ? newSettings.offerItems.join(' + ')
              : item.description,
          priceSingle: newSettings.royalPlatterPrice,
        };
      }
      return item;
    });
    setMenuItems(updated);
    updated.forEach((item, i) => {
      if (item !== menuItems[i]) persistMenuItem(item, updated);
    });
  };

  // Admin actions
  const handleSaveItem = (itemToSave: MenuItem) => {
    const previous = menuItems.find((m) => m.id === itemToSave.id);
    let itemWithOrder: MenuItem;
    if (previous) {
      itemWithOrder = { ...itemToSave, order: itemToSave.order ?? previous.order };
    } else {
      const orders = menuItems.map((m) => m.order).filter((o): o is number => typeof o === 'number');
      itemWithOrder = { ...itemToSave, order: (orders.length ? Math.min(...orders) : 0) - 1 };
    }
    const updated = previous
      ? menuItems.map((m) => (m.id === itemWithOrder.id ? itemWithOrder : m))
      : [itemWithOrder, ...menuItems];
    setMenuItems(updated);
    persistMenuItem(itemWithOrder, updated);

    // Two-way synchronization: If saving the platter, keep bannerSettings connected
    if (itemWithOrder.id === 'platter-royal' || itemWithOrder.category === 'platters') {
      const newPrice = itemWithOrder.priceSingle || itemWithOrder.priceKilo || bannerSettings.royalPlatterPrice;
      const cleanName = itemWithOrder.name.replace(/\(.*?\)/g, '').trim();
      const updatedBanner: BannerSettings = {
        ...bannerSettings,
        royalPlatterPrice: newPrice,
        offerSubtitle: cleanName || bannerSettings.offerSubtitle,
      };
      setBannerSettings(updatedBanner);
      persistBanner(updatedBanner);
    }

    const priceLabel = itemWithOrder.priceSingle
      ? `${itemWithOrder.priceSingle} ج.م`
      : itemWithOrder.priceKilo
      ? `${itemWithOrder.priceKilo} ج/كجم`
      : '';
    toast(`تم حفظ وتحديث "${itemWithOrder.name}" ${priceLabel ? `بـ ${priceLabel}` : ''} بنجاح!`);
  };

  const handleDeleteItem = async (id: string) => {
    const updated = menuItems.filter((m) => m.id !== id);
    setMenuItems(updated);
    if (isFirebaseConfigured) {
      try {
        if (!menuSeededRef.current) {
          await seedMenu(updated);
          menuSeededRef.current = true;
        } else {
          await deleteMenuItemRemote(id);
        }
      } catch (err) {
        saveFailed(err);
        return;
      }
    }
    toast('تم حذف الصنف من المنيو بنجاح.');
  };

  // Review handlers for Admin
  const saveReviews = (newReviews: ReviewItem[]) => {
    setReviews(newReviews);
    persistReviews(newReviews);
  };

  const handleDeleteReview = (id: string) => {
    const reviewToDelete = reviews.find((r) => r.id === id);
    saveReviews(reviews.filter((r) => r.id !== id));
    toast(`تم حذف تعليق العميل "${reviewToDelete?.author || ''}" بنجاح.`);
  };

  // Visitors' reviews are not published automatically (nothing is shown without the owner);
  // only the owner can add reviews to the public list.
  const handleAddReview = (newReview: ReviewItem) => {
    if (!isAdmin) return;
    saveReviews([newReview, ...reviews]);
  };

  const handleRestoreReviews = () => {
    saveReviews(REVIEWS_DATA);
    toast('تمت استعادة كافة التقييمات والتعليقات الافتراضية.');
  };

  const handleResetMenu = async () => {
    setMenuItems(MENU_ITEMS);
    setReviews(REVIEWS_DATA);
    setBannerSettings(defaultBanner());
    if (isFirebaseConfigured) {
      try {
        await resetRemote();
        menuSeededRef.current = false;
      } catch (err) {
        saveFailed(err);
        return;
      }
    }
    toast('تمت استعادة القائمة والأسعار والتعليقات الافتراضية بنجاح.');
  };

  const handleLogoutAdmin = async () => {
    await logout();
    toast('تم الخروج من وضع الإدارة بنجاح.', 3000);
  };

  // Cart Handlers
  const handleAddToCart = (item: MenuItem, portion: 'kilo' | 'half' | 'quarter' | 'single') => {
    let price = 0;
    if (portion === 'kilo') price = item.priceKilo || 0;
    else if (portion === 'half') price = item.priceHalf || 0;
    else if (portion === 'quarter') price = item.priceQuarter || 0;
    else price = item.priceSingle || (item.id === 'platter-royal' ? bannerSettings.royalPlatterPrice : 0);

    const cartItemId = `${item.id}-${portion}`;

    setCart((prev) => {
      const existing = prev.find((c) => c.id === cartItemId);
      if (existing) {
        return prev.map((c) =>
          c.id === cartItemId ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          item,
          portion,
          portionPrice: price,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id === id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter((c): c is CartItem => c !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-['Cairo',sans-serif]">
      
      {/* Admin Control Bar (visible only after the owner signs in with Google) */}
      {isAdmin && (
        <AdminBar
          onOpenAddItem={() => {
            setEditingItem(null);
            setIsItemModalOpen(true);
          }}
          onOpenBannerSettings={() => setIsBannerModalOpen(true)}
          onResetMenu={handleResetMenu}
          onLogout={handleLogoutAdmin}
          totalCustomItemsCount={menuItems.length}
        />
      )}

      {/* Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsOrderDrawerOpen(true)}
        bannerSettings={bannerSettings}
        isAdmin={isAdmin}
        onOpenAdminSettings={() => setIsBannerModalOpen(true)}
      />

      {/* Admin Feedback Toast */}
      {adminWelcomeToast && (
        <div className="fixed top-24 right-4 left-4 md:left-auto md:w-96 z-50 bg-neutral-900 border-2 border-amber-500 text-white p-4 rounded-2xl shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
          <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs leading-relaxed">
            <span className="font-bold text-amber-300 block mb-0.5">تنبيه نظام الإدارة:</span>
            <span>{adminWelcomeToast}</span>
          </div>
        </div>
      )}

      {/* Main Landing Page */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenMenu={() => {
            const el = document.getElementById('menu');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuickOrder={() => setIsOrderDrawerOpen(true)}
          bannerSettings={bannerSettings}
          isAdmin={isAdmin}
          onOpenAdminSettings={() => setIsBannerModalOpen(true)}
        />

        {/* 2. About Us Section */}
        <AboutSection />

        {/* 3. Core Services Section */}
        <ServicesSection />

        {/* Menu & Food Showcase (Admin edit capabilities only active when isAdmin is true) */}
        <MenuSection
          items={menuItems}
          onAddToCart={handleAddToCart}
          isAdmin={isAdmin}
          onOpenAddItem={() => {
            setEditingItem(null);
            setIsItemModalOpen(true);
          }}
          onEditItem={(item) => {
            setEditingItem(item);
            setIsItemModalOpen(true);
          }}
          onDeleteItem={handleDeleteItem}
          royalPlatterPrice={bannerSettings.royalPlatterPrice}
        />

        {/* Customer Reviews & Google Booster */}
        <ReviewsSection
          reviews={reviews}
          isAdmin={isAdmin}
          onDeleteReview={handleDeleteReview}
          onAddReview={handleAddReview}
          onRestoreReviews={handleRestoreReviews}
        />

        {/* 4. Quick Call & Delivery Hotline Section */}
        <DeliveryHotlineSection onOpenQuickOrder={() => setIsOrderDrawerOpen(true)} />

        {/* Location & Directions */}
        <LocationSection />

        {/* Footer */}
        <Footer isAdmin={isAdmin} />

        {/* Mobile Bottom Quick Action Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xl">
          <a
            href={`tel:${bannerSettings.phone}`}
            className="flex-1 py-2.5 px-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>اتصل: {bannerSettings.phone}</span>
          </a>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أريد طلب دليفري من كبابجي الصواف')}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>واتساب سريع</span>
          </a>

          <button
            onClick={() => setIsOrderDrawerOpen(true)}
            className="relative p-2.5 bg-neutral-900 border border-neutral-700 text-amber-400 rounded-xl"
            title="السلة"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </main>

      {/* Slide-over Cart / Quick Order Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Admin Modal for Adding / Editing Menu Items */}
      {isAdmin && (
        <AdminItemModal
          isOpen={isItemModalOpen}
          onClose={() => {
            setIsItemModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
          initialItem={editingItem}
        />
      )}

      {/* Admin Modal for Banner Settings & Working Hours */}
      {isAdmin && (
        <AdminBannerModal
          isOpen={isBannerModalOpen}
          onClose={() => setIsBannerModalOpen(false)}
          settings={bannerSettings}
          onSave={saveBannerSettings}
        />
      )}

      {/* Owner sign-in (opens when the address ends with #admin) */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen && !isAdmin}
        onClose={closeLoginModal}
        onLogin={loginWithGoogle}
        signingIn={signingIn}
        error={authError}
        firebaseReady={firebaseReady}
      />

    </div>
  );
}
