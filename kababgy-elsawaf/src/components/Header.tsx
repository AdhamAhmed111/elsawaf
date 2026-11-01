import React from 'react';
import { Phone, MessageSquare, ShieldAlert, Bell, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { BannerSettings } from './AdminBannerModal';
import { Logo } from './Logo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  bannerSettings: BannerSettings;
  isAdmin: boolean;
  onOpenAdminSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  bannerSettings,
  isAdmin,
  onOpenAdminSettings,
}) => {
  return (
    <>
      {/* Top Banner Notice: Working Hours & Location */}
      <div className="bg-amber-950/70 border-b border-amber-900/40 text-amber-200 text-xs px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {bannerSettings.lateNightBadge || RESTAURANT_INFO.lateNightBadge}
            </span>
            <span className="text-amber-400/40" aria-hidden="true">|</span>
            <span className="hidden sm:inline text-neutral-300">
              العنوان: {RESTAURANT_INFO.shortLocation}
            </span>
          </div>

          {/* Admin Tag indicator only shown when URL has the secret key */}
          {isAdmin && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border bg-amber-600/30 border-amber-500/60 text-amber-300">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>وضع الإدارة نشط</span>
              </div>
              {onOpenAdminSettings && (
                <button
                  onClick={onOpenAdminSettings}
                  className="px-2 py-1 rounded text-[11px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
                >
                  تعديل الإعلانات
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Special Announcement Banner if configured by Admin */}
      {bannerSettings.customAnnouncement && (
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-neutral-950 font-bold text-xs py-2 px-4 text-center border-b border-amber-500 flex items-center justify-center gap-2 shadow-sm">
          <Bell className="w-3.5 h-3.5 animate-bounce shrink-0" />
          <span>{bannerSettings.customAnnouncement}</span>
          {isAdmin && onOpenAdminSettings && (
            <button
              onClick={onOpenAdminSettings}
              className="text-[10px] underline hover:text-white mr-2"
            >
              (تعديل الإعلان)
            </button>
          )}
        </div>
      )}

      {/* Main Navigation Bar (3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single text element wordmark with official logo */}
          <a href="#hero" className="text-xl sm:text-2xl font-black text-amber-500 tracking-tight flex items-center gap-2.5 hover:text-amber-400 transition-colors">
            <Logo size="md" />
            <span>كبابجي الصواف</span>
          </a>

          {/* Zone 2: Clean navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-neutral-300">
            <a href="#hero" className="hover:text-amber-400 transition-colors">الرئيسية</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">من نحن</a>
            <a href="#menu" className="hover:text-amber-400 transition-colors">قائمة المشويات</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">خدماتنا</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">آراء العملاء</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">التوصيل والموقع</a>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 rounded-lg transition-colors border border-neutral-800"
              title="عرض سلة الطلب"
            >
              <MessageSquare className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct Phone Call Button */}
            <a
              href={`tel:${bannerSettings.phone || RESTAURANT_INFO.phone}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg text-sm font-bold shadow-md hover:shadow-amber-600/20 transition-all whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span className="font-mono tabular-nums">{bannerSettings.phone || RESTAURANT_INFO.phone}</span>
            </a>
          </div>

        </div>
      </header>
    </>
  );
};
