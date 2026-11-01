import React, { useState } from 'react';
import { Plus, Flame, Sparkles, Check, Edit3, Trash2, Award, ShieldCheck } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import platterImage from '../assets/images/platter.webp';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, portion: 'kilo' | 'half' | 'quarter' | 'single') => void;
  isAdmin?: boolean;
  onOpenAddItem?: () => void;
  onEditItem?: (item: MenuItem) => void;
  onDeleteItem?: (id: string) => void;
  royalPlatterPrice?: number;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onAddToCart,
  isAdmin = false,
  onOpenAddItem,
  onEditItem,
  onDeleteItem,
  royalPlatterPrice,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);
  const [deletingItem, setDeletingItem] = useState<{ id: string; name: string } | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const handleAdd = (item: MenuItem, portion: 'kilo' | 'half' | 'quarter' | 'single') => {
    onAddToCart(item, portion);
    const portionLabels: Record<string, string> = {
      kilo: 'كيلو',
      half: 'نصف كيلو',
      quarter: 'ربع كيلو',
      single: 'طلب',
    };
    setAddedNotice(`تمت إضافة ${item.name} (${portionLabels[portion]}) إلى سلة الطلب!`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  // Find Royal Platter if present or use default
  const royalPlatter = items.find((m) => m.id === 'platter-royal') || items.find((m) => m.category === 'platters');

  return (
    <section id="menu" className="py-20 bg-neutral-900 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold text-amber-500 tracking-wider">
            من الجزارة والشواية مباشرة لمائدتك
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            قائمة مشويات كبابجي الصواف
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            أسعار واضحة، لحوم بلدي 100% بدون خلط، وكل طلب يأتيك كاملاً مع سلطة خضراء، طحينة سمسم فاخرة، وخبز بلدي ساخن مجاناً.
          </p>

          {/* Admin Indicator inside Section */}
          {isAdmin && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-600/70 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>وضع تحرير المنيو نشط: يمكنك تعديل الأسعار، حذف، أو إضافة أصناف جديدة</span>
            </div>
          )}
        </div>

        {/* Value Clarification Banner */}
        <div className="mb-10 bg-amber-950/40 border border-amber-800/50 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                لماذا مشويات كبابجي الصواف تستحق كل جنيه؟
              </h4>
              <p className="text-xs text-neutral-300 mt-0.5">
                نستخدم لحوماً بلدية مذبوحة طازجة يومياً بأوزان صافية بالجرام. لن تجد دهوناً مضافة أو صويا تزيد الوزن وهمياً.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs text-amber-400 font-semibold bg-neutral-900/90 px-3 py-1.5 rounded-lg border border-neutral-800">
            <span>🔥 جميع الأسعار تشمل السلطات والخبز والخدمة</span>
          </div>
        </div>

        {/* Featured Visual Spotlight (Platter) */}
        {royalPlatter && (
          <div className="mb-12 bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center relative">
            
            {isAdmin && onEditItem && (
              <button
                onClick={() => onEditItem(royalPlatter)}
                className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5"
                title="تعديل تفاصيل وسعر الصينية الملكية"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل الصينية</span>
              </button>
            )}

            <div className="lg:col-span-6 relative h-64 lg:h-full">
              <img
                src={royalPlatter.image || platterImage}
                alt="صينية مشويات كبابجي الصواف المتكاملة"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>الصواني العائلية الأكثر طلباً</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                {royalPlatter.name}
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                {royalPlatter.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                <div>
                  <span className="text-xs text-neutral-400 block">السعر التوفيري للعائلات</span>
                  <span className="text-2xl font-black text-amber-400 font-mono tabular-nums">
                    {royalPlatter.priceSingle ?? royalPlatterPrice ?? 920} ج.م
                  </span>
                </div>
                <button
                  onClick={() => handleAdd(royalPlatter, 'single')}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>أضف الصينية للطلب</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs & Admin Quick Add Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'جميع الأصناف' },
              { id: 'grills', label: 'المشويات بالكيلو' },
              { id: 'platters', label: 'صواني التوفير واللمة' },
              { id: 'meals', label: 'الوجبات الفردية' },
              { id: 'sides', label: 'السلطات والمقبلات' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                    : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Admin Button to Add Item */}
          {isAdmin && onOpenAddItem && (
            <button
              onClick={onOpenAddItem}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ إضافة صنف جديد للمنيو</span>
            </button>
          )}
        </div>

        {/* Toast Notice for Adding */}
        {addedNotice && (
          <div className="fixed bottom-6 left-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400 animate-bounce">
            <Check className="w-4 h-4" />
            <span>{addedNotice}</span>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Admin Dashed Card placeholder for adding */}
          {isAdmin && onOpenAddItem && (
            <button
              onClick={onOpenAddItem}
              className="border-2 border-dashed border-amber-600/50 hover:border-amber-400 bg-amber-950/20 hover:bg-amber-950/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-all group min-h-[260px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  إضافة صنف مشويات جديد
                </h4>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                  أدخل اسم الصنف والسعر والوصف ليظهر فوراً في المنيو للزبائن.
                </p>
              </div>
            </button>
          )}

          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-700/40 transition-all hover:bg-neutral-950 relative group overflow-hidden"
            >
              {/* Admin Quick Action Controls */}
              {isAdmin && (
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  {onEditItem && (
                    <button
                      onClick={() => onEditItem(item)}
                      className="p-1.5 bg-neutral-900/90 hover:bg-amber-600 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 backdrop-blur transition-colors shadow"
                      title="تعديل الصنف والسعر"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDeleteItem && (
                    <button
                      onClick={() => setDeletingItem({ id: item.id, name: item.name })}
                      className="p-1.5 bg-neutral-900/90 hover:bg-red-600 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 backdrop-blur transition-colors shadow"
                      title="حذف هذا الصنف من المنيو"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Item Image if provided */}
              {item.image && (
                <div className="relative h-44 -mx-5 -mt-5 mb-4 overflow-hidden bg-neutral-900 border-b border-neutral-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-base font-bold text-white leading-snug">
                    {item.name}
                  </h4>
                  {item.popular && (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 px-2 py-0.5 rounded-full shrink-0">
                      الأكثر طلباً
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>

                {item.valueHighlight && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-300 bg-amber-950/30 px-2.5 py-1 rounded-md border border-amber-900/40">
                    <Flame className="w-3 h-3 text-amber-500" />
                    <span>{item.valueHighlight}</span>
                  </div>
                )}
              </div>

              {/* Price & Order Action Options */}
              <div className="pt-4 mt-4 border-t border-neutral-800 space-y-3">
                
                {/* For grills with Kilo / Half / Quarter */}
                {item.priceKilo && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-neutral-300">
                      <span>كيلو: <strong className="text-white font-mono tabular-nums">{item.priceKilo} ج</strong></span>
                      <span>نصف: <strong className="text-white font-mono tabular-nums">{item.priceHalf} ج</strong></span>
                      <span>ربع: <strong className="text-white font-mono tabular-nums">{item.priceQuarter} ج</strong></span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <button
                        onClick={() => handleAdd(item, 'quarter')}
                        className="py-1.5 px-2 bg-neutral-800 hover:bg-amber-600 hover:text-white text-neutral-300 text-[11px] font-semibold rounded-lg transition-colors text-center"
                      >
                        + ربع ك
                      </button>
                      <button
                        onClick={() => handleAdd(item, 'half')}
                        className="py-1.5 px-2 bg-neutral-800 hover:bg-amber-600 hover:text-white text-neutral-300 text-[11px] font-semibold rounded-lg transition-colors text-center"
                      >
                        + نصف ك
                      </button>
                      <button
                        onClick={() => handleAdd(item, 'kilo')}
                        className="py-1.5 px-2 bg-amber-700/80 hover:bg-amber-600 text-white text-[11px] font-bold rounded-lg transition-colors text-center"
                      >
                        + 1 كيلو
                      </button>
                    </div>
                  </div>
                )}

                {/* For Platters, Meals, Sides with single price */}
                {item.priceSingle && (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-neutral-400 block">{item.unit}</span>
                      <span className="text-lg font-black text-amber-400 font-mono tabular-nums">
                        {item.priceSingle} ج.م
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(item, 'single')}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>أضف للطلب</span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* In-app reliable Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={() => {
          if (deletingItem && onDeleteItem) {
            onDeleteItem(deletingItem.id);
          }
        }}
        itemName={deletingItem?.name || ''}
      />
    </section>
  );
};
