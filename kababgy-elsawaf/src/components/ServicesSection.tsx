import React from 'react';
import { Utensils, ShoppingBag, Bike, Clock, Check, Phone } from 'lucide-react';
import { RESTAURANT_INFO, SERVICES_LIST } from '../data/restaurantData';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-neutral-950 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-amber-500 tracking-wider">
            خدمات مصممة لراحتك في كل وقت
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ثلاث طرق للاستمتاع بمشويات كبابجي الصواف
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            سواء كنت تبحث عن سهرة عائلية هادئة في صالتنا، أو تيك أواي سريع في طريق عودتك، أو دليفري ملهلب لبيتك حتى الرابعة فجراً.
          </p>
        </div>

        {/* 3-Column Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Service 1: Dine-in */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-700/50 transition-all hover:shadow-xl hover:shadow-amber-950/20 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-500 uppercase">
                  تناول داخل المطعم
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  صالة طعام عائلية راقية (Dine-in)
                </h3>
              </div>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                استمتع بنزول أسياخ الكفتة والكباب مباشرة من على شواية الفحم إلى طاولتك، مع خبز بلدي ساخن من الفرن ومقبلات طازجة.
              </p>

              <div className="pt-2 border-t border-neutral-800 space-y-2.5 text-xs text-neutral-300">
                {SERVICES_LIST[0].details.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800/80">
              <div className="text-xs text-amber-400 font-semibold mb-2">
                {SERVICES_LIST[0].tagline}
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-200 hover:text-white group-hover:translate-x-[-4px] transition-transform"
              >
                <span>احجز طاولتك أو زُرنا اليوم</span>
                <span aria-hidden="true">&larr;</span>
              </a>
            </div>
          </div>

          {/* Service 2: Takeaway */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-700/50 transition-all hover:shadow-xl hover:shadow-amber-950/20 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-500 uppercase">
                  سفري فوري
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  سفري وتيك أواي فاخر (Takeaway)
                </h3>
              </div>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                استلم طلبك مجهزاً خلال دقائق مع خدمة الاتصال المسبق، مغلف بأحدث علب العزل الحراري ليظل ساخناً حتى وصولك للبيت.
              </p>

              <div className="pt-2 border-t border-neutral-800 space-y-2.5 text-xs text-neutral-300">
                {SERVICES_LIST[1].details.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800/80">
              <div className="text-xs text-amber-400 font-semibold mb-2">
                {SERVICES_LIST[1].tagline}
              </div>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-200 hover:text-white group-hover:translate-x-[-4px] transition-transform"
              >
                <span>اتصل جهز أوردرك في طريقك: {RESTAURANT_INFO.phone}</span>
                <span aria-hidden="true">&larr;</span>
              </a>
            </div>
          </div>

          {/* Service 3: Late Night Delivery (Highlighted) */}
          <div className="bg-gradient-to-b from-neutral-900 via-neutral-900 to-amber-950/30 border-2 border-amber-600/70 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative shadow-xl shadow-amber-950/30 group">
            
            <div className="absolute -top-3 left-6 bg-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
              مفتوح حتى 4:00 فجراً
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/60 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Bike className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>توصيل سريع طوال الليل</span>
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  خدمة دليفري حتى 4:00 صباحاً
                </h3>
              </div>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                أسطول طيارين دليفري مخصص لتغطية جميع أحياء السلام الغربية والشرقية ومحيطها، لتستمتع بمشويات طازجة في أي ساعة من الليل.
              </p>

              <div className="pt-2 border-t border-neutral-800 space-y-2.5 text-xs text-neutral-300">
                {SERVICES_LIST[2].details.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-800/80">
              <div className="text-xs text-amber-300 font-semibold mb-2">
                مناطق التغطية: السلام، الحرفيين، والنهضة
              </div>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>اطلب دليفري الآن: {RESTAURANT_INFO.phoneFormatted}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
