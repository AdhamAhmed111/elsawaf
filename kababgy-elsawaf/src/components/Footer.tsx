import React from 'react';
import { Phone, MapPin, Clock, Lock, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Logo } from './Logo';

interface FooterProps {
  isAdmin?: boolean;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isAdmin, onOpenAdminLogin }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-2">
            <a href="#hero" className="text-xl font-black text-amber-500 flex items-center gap-2.5">
              <Logo size="sm" />
              <span>كبابجي الصواف (Elsawaf)</span>
            </a>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              أفضل مشويات وكفتة بلدي على الفحم في السلام الغربية والقاهرة. نلتزم بأعلى معايير النظافة واللحوم البلدية الطازجة 100% يومياً، مع خدمة دليفري ممتدة حتى الرابعة فجراً.
            </p>
            <div className="pt-2 flex items-center gap-3 text-neutral-300">
              <span className="font-semibold text-amber-400">الخط الساخن:</span>
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-mono text-sm font-bold text-white hover:text-amber-400">
                {RESTAURANT_INFO.phoneFormatted}
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">الرئيسية وعرض السهرة</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">من نحن وسر الصنعة</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">قائمة المشويات والأسعار</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">خدمات الصالة والدليفري</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">تقييمات وآراء العملاء</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">الموقع وخرائط جوجل</a></li>
            </ul>
          </div>

          {/* Col 3: Hours & Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">العنوان وساعات العمل</h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>يومياً: من 12:00 ظهراً حتى 4:00 صباحاً</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} كبابجي الصواف - جميع الحقوق محفوظة لمطعم مشويات الصواف بالسلام.
          </div>
          
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                وضع الإدارة مفعل
              </span>
            ) : (
              onOpenAdminLogin && (
                <button
                  onClick={onOpenAdminLogin}
                  className="text-neutral-500 hover:text-amber-400 transition-colors flex items-center gap-1 text-[11px]"
                  title="تسجيل دخول الإدارة"
                >
                  <Lock className="w-3 h-3" />
                  <span>لوحة الإدارة</span>
                </button>
              )
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
