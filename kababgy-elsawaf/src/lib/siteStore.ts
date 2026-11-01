/**
 * Shared storage (Firestore): menu items, offer/banner settings and reviews.
 * Everyone can READ; only the owner account can WRITE (enforced by firestore.rules).
 *
 * Layout:
 *   sawaf_menu/{itemId}      one document per menu item (keeps each document small, images included)
 *   sawaf_settings/banner    offer / banner / phone settings
 *   sawaf_settings/reviews   { items: [...] }
 *   sawaf_settings/menuMeta  { seeded: true } once the menu was saved to the database
 */
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, writeBatch } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import type { MenuItem, ReviewItem } from '../data/restaurantData';

const MENU = 'sawaf_menu';
const SETTINGS = 'sawaf_settings';

// Firestore rejects `undefined`, so strip it before saving.
const clean = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

export interface RemoteData {
  menuSeeded: boolean;
  menu: MenuItem[];
  banner: any | null;
  reviews: ReviewItem[] | null;
}

export async function loadSiteData(): Promise<RemoteData | null> {
  if (!isFirebaseConfigured || !db) return null;
  const [menuSnap, metaSnap, bannerSnap, reviewsSnap] = await Promise.all([
    getDocs(collection(db, MENU)),
    getDoc(doc(db, SETTINGS, 'menuMeta')),
    getDoc(doc(db, SETTINGS, 'banner')),
    getDoc(doc(db, SETTINGS, 'reviews')),
  ]);

  const menu = menuSnap.docs
    .map((d) => d.data() as MenuItem)
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));

  return {
    menuSeeded: metaSnap.exists() || menu.length > 0,
    menu,
    banner: bannerSnap.exists() ? bannerSnap.data() : null,
    reviews: reviewsSnap.exists() ? ((reviewsSnap.data().items as ReviewItem[]) || []) : null,
  };
}

/** First save: store the whole current menu so the database becomes the source of truth. */
export async function seedMenu(items: MenuItem[]): Promise<void> {
  if (!db) throw new Error('Firebase is not configured');
  for (let start = 0; start < items.length; start += 400) {
    const batch = writeBatch(db);
    items.slice(start, start + 400).forEach((item, i) => {
      batch.set(doc(db!, MENU, item.id), clean({ ...item, order: item.order ?? start + i }));
    });
    await batch.commit();
  }
  await setDoc(doc(db, SETTINGS, 'menuMeta'), { seeded: true });
}

export async function saveMenuItemRemote(item: MenuItem): Promise<void> {
  if (!db) throw new Error('Firebase is not configured');
  await setDoc(doc(db, MENU, item.id), clean(item));
}

export async function deleteMenuItemRemote(id: string): Promise<void> {
  if (!db) throw new Error('Firebase is not configured');
  await deleteDoc(doc(db, MENU, id));
}

export async function saveBannerRemote(banner: unknown): Promise<void> {
  if (!db) throw new Error('Firebase is not configured');
  await setDoc(doc(db, SETTINGS, 'banner'), clean(banner));
}

export async function saveReviewsRemote(items: ReviewItem[]): Promise<void> {
  if (!db) throw new Error('Firebase is not configured');
  await setDoc(doc(db, SETTINGS, 'reviews'), clean({ items }));
}

/** Back to the built-in defaults: remove everything the owner saved. */
export async function resetRemote(): Promise<void> {
  if (!db) throw new Error('Firebase is not configured');
  const snap = await getDocs(collection(db, MENU));
  for (let start = 0; start < snap.docs.length; start += 400) {
    const batch = writeBatch(db);
    snap.docs.slice(start, start + 400).forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
  await Promise.all(['banner', 'reviews', 'menuMeta'].map((id) => deleteDoc(doc(db!, SETTINGS, id))));
}
