import { useEffect, useState } from 'react';
import {
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured, ADMIN_EMAILS } from '../lib/firebase';

const isAllowed = (email?: string | null) => !!email && ADMIN_EMAILS.includes(email.toLowerCase());

/** Google blocks sign-in inside in-app browsers (WhatsApp, Facebook, Instagram...). */
const isInAppBrowser = (): boolean =>
  typeof navigator !== 'undefined' &&
  /FBAN|FBAV|Instagram|Line\/|WhatsApp|MicroMessenger|Snapchat|TikTok|; wv\)/i.test(navigator.userAgent);

const explain = (error: any): string => {
  const code: string = error?.code || '';
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  switch (code) {
    case 'auth/unauthorized-domain':
      return `هذا الدومين (${host}) غير مضاف في Firebase. افتح Authentication ثم Settings ثم Authorized domains وأضفه.`;
    case 'auth/operation-not-allowed':
      return 'تسجيل الدخول بجوجل غير مفعّل في Firebase (Authentication ثم Sign-in method).';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'تم إغلاق نافذة تسجيل الدخول قبل الإتمام. حاول مرة أخرى.';
    case 'auth/network-request-failed':
      return 'مشكلة في الاتصال بالإنترنت. حاول مرة أخرى.';
    default:
      return `فشل تسجيل الدخول${code ? ` (${code})` : ''}. حاول مرة أخرى.`;
  }
};

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    getRedirectResult(auth).catch((e) => setAuthError(explain(e)));
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && isAllowed(u.email)) {
        setUser(u);
        setAuthError(null);
      } else {
        if (u) {
          setAuthError(`الحساب ${u.email || ''} غير مصرّح له بإدارة الموقع.`);
          signOut(auth).catch(() => undefined);
        }
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    setAuthError(null);
    if (!isFirebaseConfigured || !auth) {
      setAuthError('Firebase غير مُعدّ على هذا الموقع. أضف متغيرات VITE_FIREBASE_* ثم أعد النشر.');
      return;
    }
    if (isInAppBrowser()) {
      setAuthError('جوجل يمنع تسجيل الدخول داخل متصفح واتساب أو فيسبوك. افتح الرابط من Chrome أو Safari.');
      return;
    }
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e: any) {
      const code: string = e?.code || '';
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (re: any) {
          setAuthError(explain(re));
        }
      } else {
        setAuthError(explain(e));
      }
    } finally {
      setSigningIn(false);
    }
  };

  const logout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch {
        /* ignore */
      }
    }
    setUser(null);
  };

  return {
    user,
    isAdmin: !!user && isAllowed(user.email),
    loading,
    signingIn,
    authError,
    firebaseReady: isFirebaseConfigured && !!auth,
    loginWithGoogle,
    logout,
  };
}
