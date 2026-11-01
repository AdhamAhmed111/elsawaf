import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';
import { MenuItem, RESTAURANT_INFO } from '../data/restaurantData';

export interface CartItem {
  id: string;
  item: MenuItem;
  portion: 'kilo' | 'half' | 'quarter' | 'single';
  portionPrice: number;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const portionNames: Record<string, string> = {
    kilo: '1 كيلو',
    half: 'نصف كيلو',
    quarter: 'ربع كيلو',
    single: 'طلب / صينية',
  };

  const subtotal = cart.reduce((sum, item) => sum + item.portionPrice * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;

    let message = `*طلب دليفري جديد من موقع كبابجي الصواف*%0A%0A`;
    message += `👤 *الاسم:* ${customerName || 'عميل محترم'}%0A`;
    message += `📱 *الهاتف:* ${customerPhone || 'سيتم تأكيده'}%0A`;
    message += `📍 *العنوان:* ${customerAddress || 'السلام الغربية'}%0A`;
    if (notes) message += `📝 *ملاحظات:* ${notes}%0A`;
    message += `%0A*الأصناف المطلوبة:*%0A`;

    cart.forEach((c, idx) => {
      message += `${idx + 1}. ${c.item.name} (${portionNames[c.portion]}) × ${c.quantity} = ${c.portionPrice * c.quantity} ج%0A`;
    });

    message += `%0A💰 *إجمالي المشويات:* ${subtotal} ج.م`;
    message += `%0A🛵 *خدمة التوصيل:* ${deliveryFee} ج.م`;
    message += `%0A🔥 *المجموع الكلي:* ${total} ج.م`;
    message += `%0A%0A_شكراً لاختياركم كبابجي الصواف - بانتظار تأكيدكم الفوري!_`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-start">
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-white">سلة طلبك من الصواف</h3>
            <span className="text-xs bg-amber-950 border border-amber-800 text-amber-400 px-2 py-0.5 rounded-full font-mono">
              {cart.reduce((n, i) => n + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-white">سلتك ما زالت فارغة!</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                تصفح قائمة المشويات والصواني، واختر ما يعجبك لإرسال الطلب فوراً في ثوانٍ.
              </p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-1 border-b border-neutral-800">
                  <span>الأصناف المختارة ({cart.length})</span>
                  <button
                    onClick={onClearCart}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>إفراغ السلة</span>
                  </button>
                </div>

                {cart.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">
                        {cartItem.item.name}
                      </h5>
                      <span className="text-[11px] text-amber-400">
                        {portionNames[cartItem.portion]} - {cartItem.portionPrice} ج
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-white font-mono">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.id)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>بيانات التوصيل السريع</span>
                </h4>

                <input
                  type="text"
                  placeholder="الاسم الكريم *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />

                <input
                  type="tel"
                  placeholder="رقم الهاتف للاتصال *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />

                <input
                  type="text"
                  placeholder="العنوان بالتفصيل (الشارع - رقم العمارة - الشقة) *"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />

                <textarea
                  rows={2}
                  placeholder="ملاحظاتك (مثلاً: زيادة طحينة، بدون بصل، عيش ساخن إضافي...)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* Value reminder */}
              <div className="p-3 bg-amber-950/30 border border-amber-900/40 rounded-xl text-[11px] text-amber-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>يصلك الأوردر مغلفاً حرارياً ومعه كامل السلطات والخبز البلدي مجاناً.</span>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Totals and Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-300">
              <div className="flex items-center justify-between">
                <span>إجمالي الأصناف:</span>
                <span className="font-mono font-bold text-white">{subtotal} ج.م</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>توصيل دليفري (السلام ومحيطها):</span>
                <span className="font-mono">{deliveryFee} ج.م</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                <span>المبلغ الإجمالي عند الاستلام:</span>
                <span className="text-amber-400 font-mono text-base">{total} ج.م</span>
              </div>
            </div>
                        <p className="text-[11px] leading-relaxed text-amber-200/90 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 text-center">
              هذا موقع تجريبي من Zexen Agency، والطلب سيصل إلى فريقنا وليس إلى المطعم.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleSendWhatsApp}
                className="py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال عبر واتساب</span>
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="py-3 px-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال هاتفي مباشر</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
