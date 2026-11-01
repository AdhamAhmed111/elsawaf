import React, { useState, useEffect } from 'react';
import { X, Save, Clock, Phone, Sparkles, Bell, Tag, Plus, Trash2, ListPlus, Users, AlignLeft } from 'lucide-react';

export interface BannerSettings {
  offerTitle: string;
  offerSubtitle: string;
  offerServings: string;
  offerItems: string[];
  lateNightBadge: string;
  customAnnouncement: string;
  phone: string;
  royalPlatterPrice: number;
}

export const DEFAULT_OFFER_ITEMS: string[] = [
  'نصف كيلو كفتة بلدي فاخرة على الفحم',
  'نصف كيلو كباب ضاني متبل قطع طازجة',
  'ربع كيلو طرب بلدي مقرمش + 1/2 ك شيش',
  'أرز بالمكسرات + 6 سلطات + 10 عيش ساخن مجاناً',
];

interface AdminBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: BannerSettings;
  onSave: (newSettings: BannerSettings) => void;
}

export const AdminBannerModal: React.FC<AdminBannerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [offerTitle, setOfferTitle] = useState(settings.offerTitle || 'عرض السهرات والعائلات');
  const [offerSubtitle, setOfferSubtitle] = useState(settings.offerSubtitle || 'صينية الصواف الملكية المتكاملة');
  const [offerServings, setOfferServings] = useState(settings.offerServings || 'تكفي 5 - 6 أفراد');
  const [offerItems, setOfferItems] = useState<string[]>(
    settings.offerItems && settings.offerItems.length > 0 ? settings.offerItems : DEFAULT_OFFER_ITEMS
  );
  const [newItemText, setNewItemText] = useState('');
  const [lateNightBadge, setLateNightBadge] = useState(settings.lateNightBadge || 'مفتوح حتى 4:00 فجراً');
  const [customAnnouncement, setCustomAnnouncement] = useState(settings.customAnnouncement || '');
  const [phone, setPhone] = useState(settings.phone || '01008359193');
  const [royalPlatterPrice, setRoyalPlatterPrice] = useState(settings.royalPlatterPrice || 920);

  // Synchronize state when modal opens or settings change
  useEffect(() => {
    if (isOpen) {
      setOfferTitle(settings.offerTitle || 'عرض السهرات والعائلات');
      setOfferSubtitle(settings.offerSubtitle || 'صينية الصواف الملكية المتكاملة');
      setOfferServings(settings.offerServings || 'تكفي 5 - 6 أفراد');
      setOfferItems(
        settings.offerItems && settings.offerItems.length > 0 ? settings.offerItems : DEFAULT_OFFER_ITEMS
      );
      setNewItemText('');
      setLateNightBadge(settings.lateNightBadge || 'مفتوح حتى 4:00 فجراً');
      setCustomAnnouncement(settings.customAnnouncement || '');
      setPhone(settings.phone || '01008359193');
      setRoyalPlatterPrice(settings.royalPlatterPrice || 920);
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    setOfferItems((prev) => [...prev, newItemText.trim()]);
    setNewItemText('');
  };

  const handleRemoveItem = (index: number) => {
    setOfferItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, val: string) => {
    setOfferItems((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalItems = offerItems.map((item) => item.trim()).filter((item) => item.length > 0);

    onSave({
      offerTitle: offerTitle.trim() || 'عرض السهرات والعائلات',
      offerSubtitle: offerSubtitle.trim() || 'صينية الصواف الملكية المتكاملة',
      offerServings: offerServings.trim() || 'تكفي 5 - 6 أفراد',
      offerItems: finalItems.length > 0 ? finalItems : DEFAULT_OFFER_ITEMS,
      lateNightBadge: lateNightBadge.trim() || 'مفتوح حتى 4:00 فجراً',
      customAnnouncement: customAnnouncement.trim(),
      phone: phone.trim() || '01008359193',
      royalPlatterPrice: Number(royalPlatterPrice) || 920,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border-2 border-amber-500/60 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-base font-black text-white">
                تعديل العرض الترويجي ومحتوياته وساعات العمل
              </h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                التحكم الكامل في اسم وسعر ومحتويات العرض وصينية التوفير
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* 1. Main Offer Title & Basic Info */}
          <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-neutral-800">
              <Tag className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-amber-300">
                1. بيانات وعنوان العرض الرئيسي
              </h4>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1">
                اسم أو عنوان العرض في واجهة الموقع *
              </label>
              <input
                type="text"
                placeholder="مثال: عرض الجمعة، عرض سهرة الصحاب، عرض السهرات والعائلات"
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-neutral-400 mt-1 block">
                💡 يظهر كعنوان رئيسي كبير في أول كارت بالموقع.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1 flex items-center gap-1">
                  <AlignLeft className="w-3.5 h-3.5 text-amber-500" />
                  <span>الوصف الفرعي للصينية / العرض</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: صينية دلع كرشك، صينية الصواف الملكية"
                  value={offerSubtitle}
                  onChange={(e) => setOfferSubtitle(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-300 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  <span>عدد الأفراد</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: تكفي 5 - 6 أفراد"
                  value={offerServings}
                  onChange={(e) => setOfferServings(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Offer Contents / Items Manager (NEW REQUEST: User controls items like "5 كيلو كفتة") */}
          <div className="bg-neutral-950 p-4 rounded-2xl border-2 border-amber-600/50 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ListPlus className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-amber-300">
                  2. محتويات وأصناف العرض (المكونات بالتفصيل)
                </h4>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-bold">
                {offerItems.length} مكونات
              </span>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed">
              اكتب هنا محتويات العرض بدقة (مثلاً: <strong>5 كيلو كفتة بلدي</strong>، <strong>1 كيلو كباب</strong>، <strong>أرز وسلطات وعيش</strong>). كل بند سيظهر فوراً في كارت العرض أمام الزبائن.
            </p>

            {/* List of current items */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {offerItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1.5 px-2.5">
                  <span className="text-xs text-amber-500 font-bold font-mono w-5 shrink-0 text-center">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateItem(idx, e.target.value)}
                    placeholder="اكتب مكوناً (مثال: 5 كيلو كفتة بلدي على الفحم)"
                    className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    className="p-1 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors"
                    title="حذف هذا المكون"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Item Input */}
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
              <input
                type="text"
                placeholder="أضف صنفاً أو مكوناً جديداً (مثال: 5 كيلو كفتة بلدي)..."
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem();
                  }
                }}
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleAddItem}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>+ إضافة صنف</span>
              </button>
            </div>
          </div>

          {/* 3. Offer & Royal Platter Price (Connected to Menu Section Platter) */}
          <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-2">
            <label className="block text-xs font-bold text-amber-400">
              3. سعر العرض وصينية التوفير (جنيه مصري) *
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="10"
                value={royalPlatterPrice}
                onChange={(e) => setRoyalPlatterPrice(Number(e.target.value))}
                required
                className="w-40 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-base text-white font-mono font-bold focus:outline-none focus:border-amber-500"
              />
              <div className="text-xs text-neutral-300">
                <span className="font-bold text-white">ج.م</span>
                <span className="block text-[11px] text-amber-400 mt-0.5">
                  🔗 مربوط تلقائياً: يتم تعديله في واجهة العرض وفي صينية التوفير بقائمة المشويات
                </span>
              </div>
            </div>
          </div>

          {/* 4. Special Custom Announcement banner */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>إعلان إضافي في أعلى الموقع (اختياري)</span>
            </label>
            <textarea
              rows={2}
              placeholder="مثال: 🔥 عرض خاص اليوم: لتر بيبسي هدية مع كل صينية عائلية!"
              value={customAnnouncement}
              onChange={(e) => setCustomAnnouncement(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {/* 5. Working Hours & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>شارة مواعيد العمل</span>
              </label>
              <input
                type="text"
                placeholder="مثال: مفتوح حتى 4:00 فجراً"
                value={lateNightBadge}
                onChange={(e) => setLateNightBadge(e.target.value)}
                required
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>رقم هاتف الدليفري والطلبات</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold rounded-xl transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-900/40 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>حفظ الإعدادات والمحتويات</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
