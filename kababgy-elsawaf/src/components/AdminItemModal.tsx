import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Plus, Flame, Trash2, Camera, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';

interface AdminItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: MenuItem) => void;
  onDelete?: (id: string) => void;
  initialItem?: MenuItem | null;
}

export const AdminItemModal: React.FC<AdminItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialItem,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'grills' | 'platters' | 'meals' | 'sides'>('grills');
  const [pricingType, setPricingType] = useState<'kilo' | 'single'>('kilo');
  
  // Prices
  const [priceKilo, setPriceKilo] = useState<number>(450);
  const [priceHalf, setPriceHalf] = useState<number>(230);
  const [priceQuarter, setPriceQuarter] = useState<number>(115);
  const [priceSingle, setPriceSingle] = useState<number>(150);
  
  const [unit, setUnit] = useState('كجم');
  const [popular, setPopular] = useState(false);
  const [valueHighlight, setValueHighlight] = useState('لحم بلدي 100% طازج');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Image upload & URL state
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setConfirmDelete(false);
    if (initialItem) {
      setName(initialItem.name);
      setDescription(initialItem.description);
      setCategory(initialItem.category);
      setUnit(initialItem.unit || 'كجم');
      setPopular(!!initialItem.popular);
      setValueHighlight(initialItem.valueHighlight || '');
      setImageUrl(initialItem.image || '');

      if (initialItem.priceKilo) {
        setPricingType('kilo');
        setPriceKilo(initialItem.priceKilo);
        setPriceHalf(initialItem.priceHalf || Math.round(initialItem.priceKilo / 2));
        setPriceQuarter(initialItem.priceQuarter || Math.round(initialItem.priceKilo / 4));
      } else {
        setPricingType('single');
        setPriceSingle(initialItem.priceSingle || 100);
      }
    } else {
      // Defaults for new item
      setName('');
      setDescription('');
      setCategory('grills');
      setPricingType('kilo');
      setPriceKilo(480);
      setPriceHalf(245);
      setPriceQuarter(125);
      setPriceSingle(150);
      setUnit('كجم');
      setPopular(false);
      setValueHighlight('لحم بلدي 100% على الفحم');
      setImageUrl('');
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  // Handle image file selection (from camera or file picker) and optimize
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawData = event.target?.result as string;
      if (!rawData) return;

      // Resize image on canvas to maintain high quality while optimizing memory
      const img = new Image();
      img.onload = () => {
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimized = canvas.toDataURL('image/jpeg', 0.85);
          setImageUrl(optimized);
        } else {
          setImageUrl(rawData);
        }
      };
      img.src = rawData;
    };
    reader.readAsDataURL(file);

    // Reset input value so same file can be re-selected if needed
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const item: MenuItem = {
      id: initialItem?.id || `item-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'مشويات طازجة على الفحم بخلطة كبابجي الصواف.',
      category,
      unit: pricingType === 'kilo' ? 'كجم' : (unit || 'طلب'),
      popular,
      valueHighlight: valueHighlight.trim() || undefined,
      image: imageUrl.trim() || undefined,
    };

    if (pricingType === 'kilo') {
      item.priceKilo = Number(priceKilo);
      item.priceHalf = Number(priceHalf);
      item.priceQuarter = Number(priceQuarter);
    } else {
      item.priceSingle = Number(priceSingle);
    }

    onSave(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border-2 border-amber-500/60 rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-black text-white">
              {initialItem ? 'تعديل صنف في المنيو' : 'إضافة صنف مشويات جديد'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">
              اسم الصنف *
            </label>
            <input
              type="text"
              placeholder="مثال: كفتة حاتي بلدي مخصوص، نيفة ضاني، طرب..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">
              القسم في المنيو *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'grills', label: 'مشويات بالكيلو' },
                { id: 'platters', label: 'صواني التوفير' },
                { id: 'meals', label: 'وجبات فردية' },
                { id: 'sides', label: 'سلطات ومقبلات' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => {
                    setCategory(c.id as any);
                    if (c.id === 'grills') {
                      setPricingType('kilo');
                      setUnit('كجم');
                    } else {
                      setPricingType('single');
                      if (c.id === 'platters') setUnit('صينية');
                      else if (c.id === 'meals') setUnit('وجبة');
                      else setUnit('علبة');
                    }
                  }}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                    category === c.id
                      ? 'bg-amber-600 text-white border-amber-500'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload & URL Picker (NEW) */}
          <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>صورة الصنف (عبر الكاميرا أو رفع ملف أو رابط URL)</span>
              </label>

              {/* Mode switch */}
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageInputMode('upload')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    imageInputMode === 'upload'
                      ? 'bg-amber-600 text-white'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  كاميرا / رفع
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode('url')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    imageInputMode === 'url'
                      ? 'bg-amber-600 text-white'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  رابط URL
                </button>
              </div>
            </div>

            {/* Hidden native file & camera inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileSelect}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            {imageInputMode === 'upload' ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {/* Camera Button */}
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="p-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500 rounded-xl flex flex-col items-center justify-center gap-1.5 text-xs text-white transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4" />
                    </div>
                    <span className="font-bold">📸 التقاط بالكاميرا</span>
                    <span className="text-[10px] text-neutral-400">تصوير الوجبة مباشرة</span>
                  </button>

                  {/* Device File Upload Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500 rounded-xl flex flex-col items-center justify-center gap-1.5 text-xs text-white transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-4 h-4" />
                    </div>
                    <span className="font-bold">📁 اختيار من المعرض</span>
                    <span className="text-[10px] text-neutral-400">رفع صورة من جهازك</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      placeholder="https://example.com/grilled-meat.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-3 pr-8 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                    <LinkIcon className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-3" />
                  </div>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs"
                      title="مسح الرابط"
                    >
                      مسح
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-neutral-400 block">
                  💡 يمكنك لصق أي رابط صورة مباشر لمشويات الصواف على الإنترنت.
                </span>
              </div>
            )}

            {/* Live Image Preview */}
            {imageUrl && (
              <div className="relative rounded-xl overflow-hidden border border-amber-600/40 bg-neutral-900 p-2 flex items-center gap-3">
                <img
                  src={imageUrl}
                  alt="معاينة صورة الصنف"
                  className="w-16 h-16 object-cover rounded-lg border border-neutral-700 shrink-0"
                  onError={() => {
                    // fallback if broken url
                  }}
                />
                <div className="flex-1 min-w-0 text-right">
                  <span className="text-xs font-bold text-amber-300 block truncate">
                    تم تجهيز الصورة بنجاح
                  </span>
                  <span className="text-[10px] text-neutral-400 block truncate mt-0.5">
                    ستظهر هذه الصورة داخل بطاقة الصنف في المنيو للزبائن.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="p-1.5 bg-red-950/80 hover:bg-red-900 text-red-300 rounded-lg border border-red-800 shrink-0 transition-colors"
                  title="حذف الصورة"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Pricing Scheme */}
          <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">نظام التسعير:</span>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPricingType('kilo')}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    pricingType === 'kilo'
                      ? 'bg-amber-600 text-white'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  بالأوزان (كيلو/نصف/ربع)
                </button>
                <button
                  type="button"
                  onClick={() => setPricingType('single')}
                  className={`px-3 py-1 rounded-lg font-bold ${
                    pricingType === 'single'
                      ? 'bg-amber-600 text-white'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  سعر موحد للطلب
                </button>
              </div>
            </div>

            {pricingType === 'kilo' ? (
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">سعر الكيلو (ج.م)</label>
                  <input
                    type="number"
                    min="1"
                    value={priceKilo}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPriceKilo(val);
                      setPriceHalf(Math.round(val / 2));
                      setPriceQuarter(Math.round(val / 4));
                    }}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">سعر النصف (ج.م)</label>
                  <input
                    type="number"
                    min="1"
                    value={priceHalf}
                    onChange={(e) => setPriceHalf(Number(e.target.value))}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">سعر الربع (ج.م)</label>
                  <input
                    type="number"
                    min="1"
                    value={priceQuarter}
                    onChange={(e) => setPriceQuarter(Number(e.target.value))}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">السعر الإجمالي (ج.م)</label>
                  <input
                    type="number"
                    min="1"
                    value={priceSingle}
                    onChange={(e) => setPriceSingle(Number(e.target.value))}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">الوحدة المكتوبة</label>
                  <input
                    type="text"
                    placeholder="مثال: صينية عائلية، وجبة كاملة"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">
              وصف الصنف والمكونات
            </label>
            <textarea
              rows={2}
              placeholder="وصف تفصيلي للمكونات والتتبيلة..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {/* Value highlight */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">
              ميزة الصنف (شعار تبرير القيمة والجودة)
            </label>
            <input
              type="text"
              placeholder="مثال: لحوم بلدي 100% بدون خلط، منديل خروف مقرمش..."
              value={valueHighlight}
              onChange={(e) => setValueHighlight(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Popular Toggle */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="popular-check"
              checked={popular}
              onChange={(e) => setPopular(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded"
            />
            <label htmlFor="popular-check" className="text-xs text-neutral-300 font-bold cursor-pointer">
              تمييز كـ "الأكثر طلباً" على الموقع ⭐
            </label>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
            {initialItem && onDelete && (
              <div>
                {!confirmDelete ? (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="px-4 py-2.5 bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف الصنف</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(initialItem.id);
                        onClose();
                      }}
                      className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>تأكيد الحذف</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-2.5 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-xl hover:bg-neutral-700"
                    >
                      إلغاء
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 mr-auto">
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
                <span>حفظ الصنف ونشره فوراً</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
