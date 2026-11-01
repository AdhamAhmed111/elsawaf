import React from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-950 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-amber-500 tracking-wider">
            زيارتك تشرفنا في صالتنا
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            موقع المطعم وساعات العمل
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            موقع متميز يسهل الوصول إليه في السلام الغربية، مع مساحات ركن مريحة وصالة استقبال مكيفة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Address & Hours Details (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              {/* Address Item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">العنوان بالتفصيل</h4>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-mono text-amber-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    Google Plus Code: 5C95+QWV
                  </span>
                </div>
              </div>

              {/* Hours Item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">مواعيد العمل اليومية</h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    طوال أيام الأسبوع: من <strong className="text-amber-400">12:00 ظهراً</strong> حتى <strong className="text-amber-400">4:00 صباحاً</strong>
                  </p>
                  <p className="text-[11px] text-emerald-400 mt-1">
                    ✓ استقبال زوار الصالة والطلبات الخارجية والتوصيل متواصل دون انقطاع.
                  </p>
                </div>
              </div>

              {/* Phone item */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">رقم الحجز والاستفسارات</h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    تواصل مباشر مع إدارة الصالة أو الدليفري:
                  </p>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="inline-block mt-1 text-sm font-bold text-amber-400 font-mono"
                    dir="ltr"
                  >
                    {RESTAURANT_INFO.phoneFormatted}
                  </a>
                </div>
              </div>

            </div>

            {/* Direct Google Maps Direction CTA */}
            <div className="pt-4 border-t border-neutral-800">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('كبابجي الصواف 5C95+QWV As Salam Al Gharbeyah Cairo')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 border border-neutral-700 transition-colors"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>فتح الاتجاهات على خرائط Google</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>

          </div>

          {/* Map Preview Container (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden min-h-[380px] relative flex flex-col">
            <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-neutral-300">خريطة الموقع المباشر: كبابجي الصواف</span>
              </div>
              <span className="font-mono text-[11px]">4644120 Cairo</span>
            </div>

            <div className="relative flex-1 bg-neutral-950 flex items-center justify-center p-6">
              {/* Stylized Map Card Simulation */}
              <div className="w-full max-w-lg p-6 bg-neutral-900/90 rounded-2xl border border-neutral-800 shadow-xl space-y-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-600/20 border border-amber-500/50 flex items-center justify-center text-amber-400 mx-auto">
                  <MapPin className="w-8 h-8 text-amber-500" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">مطعم كبابجي الصواف (Elsawaf)</h4>
                  <p className="text-xs text-neutral-400">
                    السلام الغربية - قسم أول السلام - محافظة القاهرة
                  </p>
                  <p className="text-xs text-amber-400 font-mono">5C95+QWV</p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950 text-xs text-neutral-300 border border-neutral-800/80">
                  📍 بجوار أهم المعالم الحيوية في السلام الغربية، سهولة تامة في الوصول والركن.
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('5C95+QWV Cairo')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  <span>انقر لبدء الملاحة والـ GPS</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
