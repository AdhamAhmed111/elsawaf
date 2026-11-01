import React from 'react';
import { Plus, Settings, RotateCcw, LogOut, ShieldCheck } from 'lucide-react';

interface AdminBarProps {
  onOpenAddItem: () => void;
  onOpenBannerSettings: () => void;
  onResetMenu: () => void;
  onLogout: () => void;
  totalCustomItemsCount: number;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  onOpenAddItem,
  onOpenBannerSettings,
  onResetMenu,
  onLogout,
}) => {
  return (
    <aside aria-label="لوحة تحكم كبابجي الصواف" className="bg-gradient-to-r from-red-950 via-amber-950 to-neutral-900 border-b-2 border-amber-500 text-white px-4 py-3 z-50 sticky top-0 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Title & Status */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wide text-amber-300">
                لوحة تحكم كبابجي الصواف (Admin Mode)
              </span>
              <span className="bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                مسجّل بحساب جوجل
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 mt-0.5">
              يمكنك إضافة أو تعديل أو حذف أصناف المشويات والأسعار، وإدارة وحذف التعليقات، وتحديث العروض مباشرة.
            </p>
          </div>
        </div>

        {/* Admin Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Add Item Button */}
          <button
            onClick={onOpenAddItem}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black rounded-lg transition-transform hover:scale-105 shadow"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ إضافة صنف مشويات جديد</span>
          </button>

          {/* Edit Banner, Offers & Contents */}
          <button
            onClick={onOpenBannerSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 text-xs font-bold rounded-lg transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>تعديل العروض ومحتوياتها</span>
          </button>

          {/* Reset Menu */}
          <button
            onClick={onResetMenu}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900/90 hover:bg-red-950/80 text-neutral-300 hover:text-red-300 border border-neutral-800 text-xs rounded-lg transition-colors"
            title="استعادة قائمة الأصناف الافتراضية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">استعادة الافتراضي</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/40 hover:bg-red-800/80 text-red-200 border border-red-700/60 text-xs font-bold rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج من الإدارة</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
