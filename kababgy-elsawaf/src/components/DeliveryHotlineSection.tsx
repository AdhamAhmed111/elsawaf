import React from 'react';
import { Phone, MessageCircle, Clock, Bike, ShieldCheck, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface DeliveryHotlineSectionProps {
  onOpenQuickOrder: () => void;
}

export const DeliveryHotlineSection: React.FC<DeliveryHotlineSectionProps> = ({ onOpenQuickOrder }) => {
  return (
    <section id="contact" className="py-20 bg-neutral-900 border-t border-neutral-800 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Banner Card */}
        <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950/60 border-2 border-amber-600/80 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 text-center max-w-4xl mx-auto">
          
          {/* Header pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/20 border border-amber-500/50 text-amber-300 text-xs font-bold">
            <Bike className="w-4 h-4 text-amber-400" />
            <span>خدمة دليفري الصواف الصاروخية حتى 4:00 فجراً</span>
          </div>

          {/* Bold Callout */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              سهران وجعان؟ أوردرك ملهلب في دقائق
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              لا تنتظر ساعات على تطبيقات الدليفري الخارجية.. اتصل مباشرة بخط مشويات كبابجي الصواف وسيتوجه الطيار إلى باب منزلك فور خروج المشويات من على شواية الفحم.
            </p>
          </div>

          {/* Gigantic Phone Callout Card */}
          <div className="bg-neutral-950/90 border border-amber-500/40 p-6 sm:p-8 rounded-2xl max-w-xl mx-auto space-y-4 shadow-inner">
            <span className="text-xs font-semibold text-neutral-400 block">
              الخط الساخن لطلبات الدليفري والتيك أواي السريع:
            </span>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center justify-center gap-3 text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 hover:text-amber-300 transition-colors font-mono tracking-wider tabular-nums group"
              dir="ltr"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-amber-400" />
              </div>
              <span>{RESTAURANT_INFO.phoneFormatted}</span>
            </a>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-amber-900/40 transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>اتصل هاتفياً الآن</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أريد طلب دليفري من كبابجي الصواف')}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>طلب سريع عبر واتساب</span>
              </a>

              <button
                onClick={onOpenQuickOrder}
                className="px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-sm rounded-xl border border-neutral-700 transition-all"
              >
                <span>تجميع الأوردر أونلاين</span>
              </button>
            </div>
          </div>

          {/* Delivery Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs text-neutral-300 text-right">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/50 border border-neutral-800">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <span><strong>ضمان السخونة:</strong> شنط عزل حراري تحافظ على الطعام ملهلباً كأنه خرج من الشواية.</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/50 border border-neutral-800">
              <Clock className="w-5 h-5 text-amber-500 shrink-0" />
              <span><strong>ساعات التوصيل:</strong> متواصلون يومياً من 12 ظهراً وحتى 4:00 صباحاً.</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/50 border border-neutral-800">
              <Flame className="w-5 h-5 text-amber-500 shrink-0" />
              <span><strong>مرفقات مجانية:</strong> طحينة سمسم، سلطة خضراء بلدي، وخبز ساخن مع كل طلب.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
