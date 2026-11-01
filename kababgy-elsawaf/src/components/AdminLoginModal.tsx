import React from 'react';
import { X, Lock, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  signingIn: boolean;
  error: string | null;
  firebaseReady: boolean;
}

/** Owner sign-in. Real protection: Google account check + Firestore rules (no shared password). */
export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  signingIn,
  error,
  firebaseReady,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-900 border border-amber-600/50 rounded-2xl shadow-2xl p-6 text-neutral-100">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">تسجيل الدخول للوحة الإدارة</h3>
            <p className="text-xs text-neutral-400">متاح لحساب جوجل الخاص بإدارة المطعم فقط</p>
          </div>
        </div>

        {!firebaseReady && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs leading-relaxed">
            لم يتم ربط قاعدة البيانات بعد (متغيرات VITE_FIREBASE_*)، لذلك لوحة الإدارة غير متاحة.
          </div>
        )}

        {error && (
          <div role="alert" className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs leading-relaxed flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={onLogin}
          disabled={signingIn}
          className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-sm font-bold transition-colors disabled:opacity-60"
        >
          {signingIn ? 'جاري تسجيل الدخول...' : 'الدخول بحساب جوجل'}
        </button>
      </div>
    </div>
  );
};
