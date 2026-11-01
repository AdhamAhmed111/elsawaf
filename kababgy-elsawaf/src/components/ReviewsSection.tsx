import React, { useState } from 'react';
import { Star, MessageSquareQuote, ThumbsUp, Send, CheckCircle2, Trash2, ShieldCheck, RotateCcw } from 'lucide-react';
import { ReviewItem, REVIEWS_DATA, RESTAURANT_INFO } from '../data/restaurantData';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  isAdmin?: boolean;
  onDeleteReview?: (id: string) => void;
  onAddReview?: (newReview: ReviewItem) => void;
  onRestoreReviews?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  isAdmin = false,
  onDeleteReview,
  onAddReview,
  onRestoreReviews,
}) => {
  const [userRating, setUserRating] = useState<number>(5);
  const [userName, setUserName] = useState<string>('');
  const [userComment, setUserComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [deletingReview, setDeletingReview] = useState<ReviewItem | null>(null);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    if (onAddReview) {
      onAddReview({
        id: `rev-${Date.now()}`,
        author: userName.trim(),
        rating: userRating,
        date: 'الآن (عميل جديد)',
        comment: userComment.trim(),
        sentiment: userRating >= 4 ? 'positive' : 'constructive',
        serviceType: 'تناول داخل المطعم / دليفري',
      });
    }

    setSubmitted(true);
  };

  return (
    <section id="reviews" className="py-20 bg-neutral-950 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Google Stats */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-bold text-amber-500 tracking-wider">
            ثقة عملائنا وشهاداتهم
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ماذا يقول زبائن كبابجي الصواف؟
          </h2>
          
          {/* Google Maps Score Badge */}
          <div className="inline-flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-2xl">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-xl font-black font-mono tabular-nums">{RESTAURANT_INFO.googleRating}</span>
              <span className="text-xs text-neutral-400">من 5</span>
            </div>
            <span className="text-neutral-700" aria-hidden="true">|</span>
            <span className="text-xs text-neutral-300">
              بناءً على <strong className="font-mono text-white">{RESTAURANT_INFO.totalReviews} تقييماً</strong> موثقاً على خرائط جوجل
            </span>
          </div>

          <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            نفتخر بشهادة عملائنا حول أدب طاقم العمل، ونظافة المكان، وطعم الكفتة البلدي المميز، ونعمل دائماً لتطوير خدماتنا لنصل إلى الـ 5 نجوم المستحقة.
          </p>

          {/* Admin Indicator for Reviews Management */}
          {isAdmin && (
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-600/70 text-amber-300 text-xs font-bold mt-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>وضع إدارة التعليقات نشط: يمكنك حذف أي تعليق تريده أو تركه معروضاً للزبائن</span>
              {reviews.length < REVIEWS_DATA.length && onRestoreReviews && (
                <button
                  type="button"
                  onClick={onRestoreReviews}
                  className="mr-2 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-amber-200 rounded-lg text-[11px] border border-neutral-700 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3 text-amber-400" />
                  <span>استعادة كل التعليقات</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors relative group"
              >
                <div className="space-y-3">
                  
                  {/* Review Header & Admin Delete Control */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                      <span className="text-[11px] text-neutral-400 block">{rev.serviceType}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-neutral-800 text-neutral-700'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Admin Delete Button for Each Review */}
                      {isAdmin && onDeleteReview && (
                        <button
                          type="button"
                          onClick={() => setDeletingReview(rev)}
                          className="p-1.5 px-2 bg-neutral-800 hover:bg-red-600 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 transition-colors flex items-center gap-1 text-[11px] font-bold shadow"
                          title="حذف هذا التعليق نهائياً"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
                          <span>حذف</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Comment Body */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                </div>

                {/* Footer Date */}
                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>تم التقييم {rev.date}</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ThumbsUp className="w-3 h-3" />
                    <span>عميل موثق</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 mb-12 text-center space-y-3">
            <p className="text-sm text-neutral-300">
              لا توجد تعليقات معروضة حالياً.
            </p>
            {isAdmin && onRestoreReviews && (
              <button
                onClick={onRestoreReviews}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة التعليقات الأصلية</span>
              </button>
            )}
          </div>
        )}

        {/* Interactive Google Review Booster Component */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-amber-800/40 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-6">
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-amber-500" />
              <span>جربت مشويات الصواف؟ شاركنا رأيك وساعدنا نكون الأفضل دائماً</span>
            </h3>
            <p className="text-xs text-neutral-300 max-w-md mx-auto">
              رأيك في جودة اللحوم وسرعة الخدمة هو الدافع الأكبر لفريق العمل.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-xl p-5 text-center space-y-2 text-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">شكراً جزيلاً لرأيك الكريم!</h4>
              <p className="text-xs">
                نقدّر وقتك ورأيك، وهو يساعدنا على تقديم أفضل مشويات ممكنة. يمكنك أيضاً مشاركة تقييمك على خرائط جوجل ليراه الجميع.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Star Selector */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs text-neutral-400 ml-2">تقييمك للمطعم:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= userRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-neutral-800 text-neutral-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="اسمك الكريم"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="رقم الهاتف (اختياري للتواصل وتقديم هدية)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <textarea
                rows={2}
                placeholder="اكتب ملاحظاتك عن جودة الكفتة، المشويات، التوصيل، أو الأجواء..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
                required
              />

              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] text-neutral-400">
                  ⭐ يساعدنا رأيك في الوصول للتقييم الكامل على Google Maps
                </span>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال التقييم</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* Review Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingReview}
        onClose={() => setDeletingReview(null)}
        onConfirm={() => {
          if (deletingReview && onDeleteReview) {
            onDeleteReview(deletingReview.id);
          }
        }}
        itemName={`تعليق العميل: "${deletingReview?.author || ''}"`}
        title="تأكيد حذف التعليق"
        description="هل أنت متأكد من حذف هذا التعليق نهائياً؟ سيتم إزالته من الموقع ولن يظهر للزبائن."
        confirmLabel="نعم، احذف التعليق"
      />
    </section>
  );
};
