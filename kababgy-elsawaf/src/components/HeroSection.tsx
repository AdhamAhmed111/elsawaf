import React from 'react';
import { Phone, MessageCircle, Flame, Clock, Sparkles, MapPin, ShieldCheck, Edit3, Bell } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { BannerSettings, DEFAULT_OFFER_ITEMS } from './AdminBannerModal';
import heroImage from '../assets/images/hero.webp';

interface HeroSectionProps {
  onOpenMenu: () => void;
  onOpenQuickOrder: () => void;
  bannerSettings: BannerSettings;
  isAdmin?: boolean;
  onOpenAdminSettings?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenMenu,
  onOpenQuickOrder,
  bannerSettings,
  isAdmin = false,
  onOpenAdminSettings,
}) => {
  const currentPrice = bannerSettings.royalPlatterPrice || 920;
  const currentTitle = bannerSettings.offerTitle || 'عرض السهرات والعائلات';
  const currentSubtitle = bannerSettings.offerSubtitle || 'صينية الصواف الملكية المتكاملة';
  const currentServings = bannerSettings.offerServings || 'تكفي 5 - 6 أفراد';
  const currentPhone = bannerSettings.phone || RESTAURANT_INFO.phone;
  const currentOfferItems = (bannerSettings.offerItems && bannerSettings.offerItems.length > 0)
    ? bannerSettings.offerItems
    : DEFAULT_OFFER_ITEMS;

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-neutral-950 pt-8 pb-16">
      {/* Background Graphic & Atmosphere Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="مشويات وكفتة كبابجي الصواف على الفحم"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 md:opacity-35 scale-105 transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        <div className="absolute inset-0 bg-radial from-amber-950/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Context Notice Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>لحوم بلدي طازجة يومياً على جمر الفحم الطبيعي</span>
            </div>

            {/* Slogan & Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight text-balance">
              أصل المشويات على الفحم في السلام..{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-amber-500 to-amber-200">
                طازة وسخنة لسهرتك حتى 4:00 فجراً!
              </span>
            </h1>

            {/* Sub-slogan / Value proposition */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              في <strong className="text-amber-400 font-bold">كبابجي الصواف</strong>، لا نساوم أبداً على الجودة: لحوم بلدي طازجة 100% مختارة بعناية يومياً، بتتبيلة الحاتي التراثية على الفحم الهادئ. استمتع بأطرى كفتة وألذ كباب في صالتنا العائلية أو بتوصيل دليفري حراري ساخن حتى باب بيتك.
            </p>

            {/* Action Buttons Hub */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Primary Call Action */}
              <a
                href={`tel:${currentPhone}`}
                className="flex items-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-base shadow-lg shadow-amber-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="w-5 h-5 text-white" />
                <span>اتصل واطلب الآن:</span>
                <span className="font-mono tabular-nums text-amber-100">{currentPhone}</span>
              </a>

              {/* WhatsApp Quick Order */}
              <button
                onClick={onOpenQuickOrder}
                className="flex items-center gap-2 px-5 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 text-emerald-200" />
                <span>طلب سريع عبر واتساب</span>
              </button>

              {/* View Menu Button */}
              <a
                href="#menu"
                onClick={onOpenMenu}
                className="flex items-center gap-2 px-4 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 font-semibold rounded-xl text-sm transition-all"
              >
                <span>تصفح المنيو والأسعار</span>
              </a>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>لحم بلدي صافي 100%</span>
              </div>
              <span className="text-neutral-700">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>خدمة وتوصيل حتى 4:00 فجراً</span>
              </div>
              <span className="text-neutral-700">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>السلام الغربية - القاهرة</span>
              </div>
            </div>

          </div>

          {/* Hero Feature Visual Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/80 p-6 backdrop-blur shadow-2xl space-y-5">
              
              {/* Admin Quick Edit Button for Platter & Offer */}
              {isAdmin && onOpenAdminSettings && (
                <button
                  onClick={onOpenAdminSettings}
                  className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                  title="تعديل اسم وسعر العرض"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل العرض</span>
                </button>
              )}

              {/* Card Header & Badge - Reacts dynamically to offerTitle, offerSubtitle, and offerServings */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-amber-300 font-black">{currentTitle}</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{currentSubtitle}</p>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/50 px-2.5 py-1 rounded-md shrink-0">
                  {currentServings}
                </span>
              </div>

              {/* Special Offer announcement banner if configured */}
              {bannerSettings.customAnnouncement && (
                <div className="bg-gradient-to-r from-amber-600/30 to-amber-950/60 border border-amber-500/60 p-2.5 rounded-xl text-xs text-amber-200 font-bold flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400 animate-bounce shrink-0" />
                  <span>{bannerSettings.customAnnouncement}</span>
                </div>
              )}

              {/* Dynamic Contents / Items of the Offer (Controlled by Admin) */}
              <div className="space-y-2 text-xs text-neutral-300">
                {currentOfferItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 border-b border-neutral-800/60 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-neutral-200 font-medium">{item}</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-950/60 border border-amber-800/40 px-1.5 py-0.5 rounded shrink-0 mr-1.5">
                      طازة
                    </span>
                  </div>
                ))}
              </div>

              {/* Price & Immediate Order Action */}
              <div className="pt-2 flex items-center justify-between bg-neutral-950/80 p-3.5 rounded-xl border border-neutral-800">
                <div>
                  <div className="text-[11px] text-neutral-400">سعر الصينية في العرض</div>
                  <div className="text-xl font-black text-amber-400 font-mono tabular-nums">
                    {currentPrice} <span className="text-xs text-neutral-300 font-normal">جنيه مصري</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(`السلام عليكم، أريد طلب ${currentTitle} (${currentPrice} ج) دليفري`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>اطلب العرض الآن</span>
                </a>
              </div>

              <div className="text-[11px] text-center text-neutral-400">
                🔥 تغليف حراري معزول لضمان وصول المشويات ساخنة كأنك في الصالة
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
