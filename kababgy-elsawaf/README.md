# كبابجي الصواف - Elsawaf

موقع مطعم (React + Vite + Tailwind) مع لوحة إدارة محمية بتسجيل دخول Google وقاعدة بيانات Firebase.

## التشغيل محلياً
```
npm install
cp .env.example .env.local   # ثم املأ قيم Firebase
npm run dev
```

## لوحة الإدارة
- افتح الموقع بإضافة `#admin` في آخر الرابط (مثال: `https://موقعك.vercel.app/#admin`).
- سجّل الدخول بحساب جوجل المسموح به فقط. لا توجد كلمة مرور داخل الكود.
- التعديلات (الأصناف، الأسعار، العروض، التعليقات) تُحفظ في قاعدة البيانات ويراها كل الزوار.

## إعداد Firebase (مرة واحدة)
1. أنشئ مشروع Firebase وأضف Web app وانسخ القيم إلى متغيرات `VITE_FIREBASE_*` (محلياً في `.env.local`، وعلى Vercel في Settings > Environment Variables).
2. Authentication > Sign-in method: فعّل **Google**.
3. Authentication > Settings > Authorized domains: أضف دومين الموقع (مثل `xxx.vercel.app`).
4. Firestore Database: أنشئ قاعدة بيانات، ثم Rules: الصق محتوى `firestore.rules` واضغط Publish.
5. غيّر الإيميل في `firestore.rules` و`VITE_ADMIN_EMAILS` لو الإدارة بحساب آخر.
6. أعد النشر (Redeploy) بعد إضافة المتغيرات.
