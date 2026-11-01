import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Star,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  PhoneCall,
  Flame,
  Award,
  Calculator,
  Compass,
} from 'lucide-react';
import { RESTAURANT_INFO, MARKETING_STRATEGY_DECK } from '../data/restaurantData';

interface MarketingPitchDeckProps {
  onBackToLanding: () => void;
}

export const MarketingPitchDeck: React.FC<MarketingPitchDeckProps> = ({ onBackToLanding }) => {
  // Calculator state
  const [dailyOrders, setDailyOrders] = useState<number>(20);
  const [avgTicket, setAvgTicket] = useState<number>(350);
  const [commissionRate, setCommissionRate] = useState<number>(25);

  const monthlyOrders = dailyOrders * 30;
  const monthlyRevenue = monthlyOrders * avgTicket;
  const monthlyLostToCommission = Math.round(monthlyRevenue * (commissionRate / 100));
  const yearlyLost = monthlyLostToCommission * 12;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation Return Button */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold rounded-xl text-xs border border-neutral-700 transition-colors"
          >
            <span>&rarr;</span>
            <span>العودة لمعاينة صفحة الهبوط المباشرة</span>
          </button>

          <div className="text-right">
            <span className="text-[11px] font-bold text-neutral-400 block">عرض تسويقي موجه خصيصاً إلى:</span>
            <span className="text-sm font-black text-white">إدارة مطعم كبابجي الصواف (Elsawaf)</span>
          </div>
        </div>

        {/* Pitch Hero Header */}
        <div className="bg-gradient-to-r from-amber-950/60 via-neutral-900 to-neutral-900 border-2 border-amber-600/60 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>خطة التحول الرقمي ومضاعفة مبيعات المشويات</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            لماذا يحتاج "كبابجي الصواف" إلى صفحة هبوط مستقلة الآن؟
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            مطعمك يمتلك 4 مميزات ذهبية: <strong className="text-amber-400">لحم بلدي أصيل، خدمة محترمة، تغليف ممتاز، والعمل حتى 4:00 فجراً</strong>. هذا العرض يوضح لك بالأرقام كيف تحوّل هذه الميزات إلى مبيعات مضاعفة، وتوفر آلاف الجنيهات الشهرية التي تذهب لتطبيقات التوصيل كعمولات.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800 text-xs">
            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
              <span className="text-neutral-400 block">التقييم الحالي على Google</span>
              <span className="text-xl font-bold text-amber-400 font-mono">3.9 / 5</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">فرصة للقفز إلى 4.6+</span>
            </div>
            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
              <span className="text-neutral-400 block">ساعات العمل التنافسية</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">حتى 4:00 ص</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">ميزة احتكار طلبات الليل</span>
            </div>
            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
              <span className="text-neutral-400 block">التوفير المالي المستهدف</span>
              <span className="text-xl font-bold text-amber-400 font-mono">25% عمولة</span>
              <span className="text-[10px] text-neutral-400 block mt-0.5">أرباح تبقى في جيبك مباشرة</span>
            </div>
          </div>
        </div>

        {/* Section 1: Google Maps Deep Audit */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                1. تشخيص الوضع الحالي على Google Maps (نقاط القوة والتحديات)
              </h2>
              <p className="text-xs text-neutral-400">
                تحليل حقيقي لـ 63 تقييماً مسجلاً لمطعم كبابجي الصواف في السلام
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="p-5 bg-neutral-950/80 rounded-xl border border-emerald-900/40 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>نقاط القوة المثبتة (مبنية على تجارب الزبائن)</span>
              </h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>جودة اللحم:</strong> إجماع على أن الكفتة والكباب مصنوعة من لحم بلدي طازج بدون دهن صناعي.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>أدب الخدمة:</strong> احترام كبير للعائلات ومعاملة راقية من طاقم الصالة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>العمل حتى الفجر:</strong> المطعم وجهة أولى للشباب والزبائن بعد منتصف الليل.</span>
                </li>
              </ul>
            </div>

            {/* Opportunities / Challenges */}
            <div className="p-5 bg-neutral-950/80 rounded-xl border border-amber-900/40 space-y-3">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>التحديات التي تعالجها صفحة الهبوط فوراً</span>
              </h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">!</span>
                  <span><strong>ملاحظات السعر:</strong> بعض الزبائن يقارنون بالأسعار المجردة دون إدراك فرق اللحم البلدي الصافي. صفحة الهبوط تشرح القيمة وتبرز الصواني الاقتصادية.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">!</span>
                  <span><strong>التقييم 3.9:</strong> خوارزميات جوجل تفضل ترشيح المطاعم فوق 4.2. نحتاج نظام جمع تقييمات تلقائي يرفع التقييم خلال 60 يوماً.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">!</span>
                  <span><strong>فقدان الزبائن المترددين:</strong> من يبحث على جوجل عن "مشويات السلام" ولا يجد منيو واضحاً وأرقام طلب سريعة يذهب للمنافسين.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Section 2: Interactive Commission Savings Calculator */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                2. حاسبة الأرباح المهدرة: كم توفر بامتلاك صفحة طلب مباشرة؟
              </h2>
              <p className="text-xs text-neutral-400">
                حساب الأثر المالي لتلقي الطلبات عبر الموقع وواتساب بدلاً من تطبيقات التوصيل الخارجية
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Interactive Sliders (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                  <span>عدد طلبات التوصيل اليومية:</span>
                  <span className="text-amber-400 font-mono font-bold">{dailyOrders} أوردر / يوم</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={dailyOrders}
                  onChange={(e) => setDailyOrders(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                  <span>متوسط قيمة الأوردر (المشويات):</span>
                  <span className="text-amber-400 font-mono font-bold">{avgTicket} ج.م</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="1200"
                  step="50"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-1.5">
                  <span>نسبة عمولة تطبيقات التوصيل الخارجية (طلبات / غيرها):</span>
                  <span className="text-amber-400 font-mono font-bold">{commissionRate}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="35"
                  step="1"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <p className="text-[11px] text-neutral-400 leading-relaxed bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                💡 عندما يطلب الزبون مباشرة من موقع كبابجي الصواف عبر الواتساب أو الهاتف، فأنت تدفع <strong className="text-emerald-400">0% عمولة</strong>، وتتحكم بالكامل في بيانات زبائنك لتعيد استهدافهم مجدداً.
              </p>
            </div>

            {/* Calculation Output Card (6 cols) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-neutral-950 to-amber-950/40 p-6 rounded-2xl border border-amber-600/50 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase">
                الوفورات المالية المباشرة لمطعمك
              </span>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-300 pb-2 border-b border-neutral-800">
                  <span>مبيعات التوصيل الشهرية المتوقعة:</span>
                  <span className="font-mono font-bold text-white">{monthlyRevenue.toLocaleString()} ج.م</span>
                </div>

                <div className="flex items-center justify-between text-sm text-neutral-200 pb-2 border-b border-neutral-800">
                  <span>المبلغ الذي توفره شهرياً لعدم دفع عمولات:</span>
                  <span className="font-mono font-black text-emerald-400 text-lg">
                    +{monthlyLostToCommission.toLocaleString()} ج.م / شهر
                  </span>
                </div>

                <div className="flex items-center justify-between text-base font-bold text-white pt-1">
                  <span>إجمالي التوفير السنوي الصافي:</span>
                  <span className="font-mono font-black text-amber-400 text-xl">
                    +{yearlyLost.toLocaleString()} ج.م / سنة
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-600/20 border border-amber-500/40 rounded-xl text-xs text-amber-200 text-center font-medium">
                🎯 تكلفة تصميم صفحة الهبوط تُسترد بالكامل خلال أول شهرين من تشغيل الطلب المباشر!
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: The 5 Strategic Growth Pillars */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              3. خمس استراتيجيات تسويقية فورية لمضاعفة مبيعات الصواف
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              خطوات عملية وسهلة التنفيذ لا تتطلب ميزانيات ضخمة، بل تعتمد على استغلال نقاط القوة القائمة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MARKETING_STRATEGY_DECK.fivePillars.map((pillar) => (
              <div
                key={pillar.num}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-600/50 transition-all hover:bg-neutral-900/90"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-amber-500 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                      {pillar.num}
                    </span>
                    <Flame className="w-4 h-4 text-amber-500" />
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 text-[11px] text-amber-300 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/80">
                  <strong className="text-white block mb-0.5">الخطوة العملية الفورية:</strong>
                  <span>{pillar.actionable}</span>
                </div>
              </div>
            ))}

            {/* Bonus Growth Lever: Google 5-Star Acceleration */}
            <div className="bg-gradient-to-br from-neutral-900 to-amber-950/40 border border-amber-600/50 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-amber-400 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-700/50">
                    06 (بونص)
                  </span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  خطة قفز تقييمات Google إلى 4.6+ نجوم
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  توزيع بطاقات QR Code في أكياس الدليفري وعلى طاولات الصالة تمنح الزبون حلوى مجانية أو خصم 10% مقابل تقييم 5 نجوم على الخرائط.
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800 text-[11px] text-emerald-300 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/80">
                <strong className="text-white block mb-0.5">النتيجة:</strong>
                <span>وصول المطعم لأول 3 نتائج بحث في منطقة السلام وقسم السلام عند كتابة "أفضل كبابجي".</span>
              </div>
            </div>

          </div>
        </div>

        {/* Section 4: Implementation Roadmap (First 30 Days) */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <span>4. جدول تطبيق خطة الـ 30 يوماً الأولى</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
              <div className="text-amber-400 font-bold">الأسبوع 1: الإطلاق الأساسي</div>
              <p className="text-neutral-400">
                إطلاق صفحة الهبوط وتفعيل رقم واتساب المباشر وربط رابط الموقع بخرائط جوجل وصفحات السوشيال ميديا.
              </p>
            </div>
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
              <div className="text-amber-400 font-bold">الأسبوع 2: حملة سهرة الفجر</div>
              <p className="text-neutral-400">
                بدء حملة استهداف إعلاني محلي لمنطقة السلام بين 11 مساءً و 3 فجراً مع عرض لتر بيبسي مجاناً بعد منتصف الليل.
              </p>
            </div>
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
              <div className="text-amber-400 font-bold">الأسبوع 3: برنامج تقييمات جوجل</div>
              <p className="text-neutral-400">
                طباعة كروت QR التقييمات وتدريب طياري الدليفري وويتر الصالة على تحفيز الزبائن لترك تقييم إيجابي.
              </p>
            </div>
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
              <div className="text-amber-400 font-bold">الأسبوع 4: التوسع للشركات</div>
              <p className="text-neutral-400">
                تسويق صواني الغداء المجمعة لورش الحرفيين والشركات المحلية في السلام ليوم الخميس والولائم.
              </p>
            </div>
          </div>
        </div>

        {/* Pitch Closing Callout */}
        <div className="bg-amber-600 rounded-3xl p-8 text-center text-neutral-950 space-y-4 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black">
            جاهزون لنقل مبيعات "كبابجي الصواف" إلى المستوى التالي؟
          </h2>
          <p className="text-sm text-neutral-900 max-w-xl mx-auto font-medium">
            صفحة الهبوط جاهزة وتعمل بالفعل بكامل تفاصيلها من المنيو، والسلة، وتحديد الموقع، والتواصل المباشر.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onBackToLanding}
              className="px-6 py-3 bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-xs rounded-xl shadow transition-all"
            >
              استعراض صفحة الهبوط للزبائن الآن
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs rounded-xl shadow transition-all"
            >
              الاتصال بالرقم المسجل: {RESTAURANT_INFO.phoneFormatted}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
