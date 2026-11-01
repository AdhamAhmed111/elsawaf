import React from 'react';
import { Award, Users, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import ambianceImage from '../assets/images/ambiance.webp';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-neutral-900 border-t border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-amber-500 tracking-wider">
            عراقة الطعم وسر الصنعة
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            من نحن: قصة كبابجي الصواف في تقديم المشويات الأصيلة
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            بدأت رحلتنا في كبابجي الصواف من حب متأصل لأصول المشويات المصرية. نؤمن بأن قطعة اللحم الممتازة لا تحتاج سوى أمانة في الاختيار، وتتبيلة متوارثة، وتسوية على نار الفحم الهادئة.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src={ambianceImage}
                alt="أجواء وصالة كبابجي الصواف العائلية"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-84 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 right-4 left-4 bg-neutral-950/85 backdrop-blur-md p-4 rounded-xl border border-neutral-800 text-xs space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>ضيافة عائلية تليق بأهالي السلام</span>
                </div>
                <p className="text-neutral-300">
                  صالة طعام مكيفة، طاقم خدمة على أعلى مستوى من الأدب والاحترام، واهتمام فائق بأدق تفاصيل النظافة.
                </p>
              </div>
            </div>
          </div>

          {/* Text Description & Value Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                في سوق مليء بالخيارات، يختار زبائننا <strong className="text-white">كبابجي الصواف</strong> لسبب واحد واضح: <span className="text-amber-400 font-semibold">الثقة المطلقة في نوعية اللحوم</span>. نحن نرفض تماماً استخدام اللحوم المجمدة أو إضافة فول الصويا والخلطات الرخيصة لتكبير حجم الكفتة.
              </p>
              <p>
                كل سيخ كفتة، وكل قطعة كباب أو ريش ضاني، تقطع وتفرم يومياً طازجة. تتبيلتنا تعتمد على عصارة البصل المصفى والتوابل المصرية الكلاسيكية دون إخفاء طعم اللحم البلدي الأصيل.
              </p>
            </div>

            {/* Three Pillars Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">لحوم بلدي 100%</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  ذبائح يومية طازجة من مزارع موثوقة دون أي خلط أو مجمدات.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">خدمة مؤدبة ومحترمة</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  أشاد بها زوارنا على خرائط جوجل.. اهتمام شخصي براحة كل عائلة.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">قيمة حقيقية لسعرك</h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  وزن بالجرام على الميزان، مع كامل السلطات والخبز البلدي مجاناً.
                </p>
              </div>

            </div>

            {/* Quality Checklist */}
            <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>شواء حصري على الفحم النباتي الطبيعي لإعطاء نكهة التدخين الأصيلة.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>طرب بلدي بمنديل خروف رقيق ومقرمش يذوب بدون دسامة ثقيلة.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>مطعم متكامل يوفر الصالة العائلية، التيك أواي السريع، والدليفري الليلي.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
