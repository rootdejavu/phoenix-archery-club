# 🚀 راهنمای انتشار وب‌سایت روی هاست و دامنه

این سند تمام مراحل راه‌اندازی وب‌سایت باشگاه ققنوس را از صفر توضیح می‌دهد.

---

## ۱. پیش از انتشار — چک‌لیست اجباری

### ⚠️ جایگزینی محتوای نمونه

محتوای فعلی پروژه **نمونه** است و واقعی نیست. پیش از انتشار عمومی حتماً موارد زیر را اصلاح کنید:

| فایل | چه چیزی را عوض کنید |
|---|---|
| `src/data/site-settings.md` | شماره تلفن، موبایل، ایمیل، آدرس، لینک شبکه‌های اجتماعی |
| `src/data/coaches.json` | نام و مشخصات واقعی مربیان |
| `src/data/programs.json` | نام دوره‌ها و شهریه واقعی |
| `src/data/achievements.json` | افتخارات واقعی باشگاه |
| `src/data/facilities.json` | امکانات واقعی مجموعه |
| `src/submitService.js` | مقصد ارسال فرم ثبت‌نام |

### تصاویر (مهم برای سرعت سایت)

تصاویر فعلی از آدرس بیرونی لود می‌شوند. برای نسخه نهایی:

1. تصاویر واقعی باشگاه را تهیه کنید
2. به فرمت **WebP** تبدیل کنید (مرورگر سریع‌تر لود می‌کند):
   ```bash
   # با ابزار cwebp
   cwebp -q 82 hero.jpg -o hero.webp
   ```
3. در پوشه `public/images/` قرار دهید
4. در فایل `src/helpers.jsx` مقادیر `IMAGES` را عوض کنید:

```js
export const IMAGES = {
  hero: '/images/hero.webp',
  equipment: '/images/equipment.webp',
  field: '/images/field.webp',
  target: '/images/target.webp',
};
```

### تصویر اشتراک‌گذاری (Open Graph)

مقدار `og_image` در `site-settings.md` باید یک **آدرس کامل و عمومی** باشد (نه مسیر نسبی)، وگرنه در تلگرام و واتساپ پیش‌نمایش نمایش داده نمی‌شود:

```
og_image: https://phoenixarchery.ir/images/og-cover.webp
```

ابعاد پیشنهادی: **1200 × 630 پیکسل**

---

## ۲. ساخت نسخه نهایی

```bash
npm install
npm run build
```

خروجی در پوشه `dist/` ساخته می‌شود. محتویات **داخل** این پوشه را باید روی هاست قرار دهید (نه خود پوشه).

پیش‌نمایش محلی پیش از آپلود:

```bash
npm run preview
```

---

## ۳. انتخاب روش انتشار

### روش الف — هاست اشتراکی ایرانی (cPanel / DirectAdmin)

مناسب وقتی دامنه `.ir` دارید و می‌خواهید همه‌چیز داخل ایران باشد.

**مراحل:**

1. پس از `npm run build`، وارد پوشه `dist/` شوید
2. تمام فایل‌ها را در یک فایل zip بریزید
3. در cPanel → File Manager → پوشه `public_html`
4. فایل zip را آپلود و Extract کنید
5. مطمئن شوید `index.html` درست در ریشه `public_html` قرار دارد

**مهم — فایل `.htaccess`:**

در پوشه `public_html` یک فایل `.htaccess` بسازید با محتوای زیر (برای فشرده‌سازی و کش):

```apache
# فشرده‌سازی فایل‌ها (سرعت بیشتر)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# کش مرورگر برای فایل‌های ایستا
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# انتقال خودکار به HTTPS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

### روش ب — Vercel (رایگان و سریع‌ترین راه)

1. وارد [vercel.com](https://vercel.com) شوید و با گیت‌هاب لاگین کنید
2. گزینه **Add New → Project** را بزنید
3. ریپازیتوری `phoenix-archery-club` را انتخاب کنید
4. تنطیمات خودکار شناسایی می‌شود (Framework: Vite)
5. **Deploy** را بزنید

پس از این، هر بار که تغییری را به گیت‌هاب push کنید، سایت **خودکار به‌روز می‌شود**.

**اتصال دامنه اختصاصی:**
Settings → Domains → دامنه خود را وارد کنید → رکوردهای DNS را در پنل دامنه ثبت کنید.

> ⚠️ توجه: برای دامنه‌های `.ir` برخی پنل‌ها محدودیت دارند. در این صورت روش الف (هاست ایرانی) مناسب‌تر است.

### روش ج — GitHub Pages (رایگان)

۱. در `vite.config.js` مقدار `base` را اضافه کنید:

```js
export default defineConfig({
  base: '/phoenix-archery-club/',  // نام ریپازیتوری
  // ... بقیه تنطیمات
});
```

۲. دستورات زیر را اجرا کنید:

```bash
npm install --save-dev gh-pages
```

۳. در `package.json` به بخش scripts اضافه کنید:

```json
"deploy": "npm run build && gh-pages -d dist"
```

۴. اجرا کنید: `npm run deploy`

---

## ۴. خرید دامنه

### دامنه `.ir` (پیشنهادی برای مخاطب ایرانی)
- مرجع رسمی: [ical.ir](https://www.ical.ir) (ایرنیک)
- هزینه: بسیار کم (سالانه)
- نیاز به احراز هویت دارد

### دامنه `.com`
- از نمایندگی‌های ایرانی یا سرویس‌های بین‌المللی
- مزیت: محدودیت کمتر در سرویس‌های خارجی

### پیشنهاد نام دامنه
```
phoenixarchery.ir
ghoghnoos-archery.ir
phoenix-archery.com
```

---

## ۵. پس از انتشار — سئو و معرفی به گوگل

### ۱. ثبت در Google Search Console
1. وارد [search.google.com/search-console](https://search.google.com/search-console) شوید
2. دامنه خود را اضافه کنید
3. مالکیت را تأیید کنید (روش DNS ساده‌ترین است)

### ۲. ساخت فایل `robots.txt`

در پوشه `public/` فایل `robots.txt` بسازید:

```
User-agent: *
Allow: /

Sitemap: https://phoenixarchery.ir/sitemap.xml
```

### ۳. ساخت فایل `sitemap.xml`

در پوشه `public/` فایل `sitemap.xml` بسازید:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://phoenixarchery.ir/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### ۴. ثبت در نقشه‌ها
- **Google Business Profile** — برای نمایش باشگاه در جستجوی محلی
- **نقشه نشان** — برای کاربران ایرانی
- پس از ثبت، مقدار `map_url` در `site-settings.md` را به لینک واقعی تغییر دهید

---

## ۶. فعال کردن واقعی فرم ثبت‌نام

فرم در حالت پیش‌فرض برنامه ایمیل کاربر را باز می‌کند. برای تجربه بهتر:

### گزینه ۱ — Formspree (ساده، بدون کدنویسی)

1. در [formspree.io](https://formspree.io) حساب رایگان بسازید
2. یک فرم جدید بسازید و آدرس endpoint را کپی کنید
3. در فایل `src/submitService.js` خط زیر را عوض کنید:

```js
const SUBMIT_ENDPOINT = 'https://formspree.io/f/کد_شما';
```

### گزینه ۲ — اسکریپت PHP روی هاست خودتان

فایل `public_html/api/register.php` بسازید:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// دریافت اطلاعات فرم
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['full_name']) || empty($data['phone'])) {
    http_response_code(400);
    echo json_encode(['error' => 'اطلاعات ناقص است']);
    exit;
}

// ارسال ایمیل به باشگاه
$to = 'info@phoenixarchery.ir';
$subject = 'درخواست ثبت‌نام جدید';
$body = "نام: {$data['full_name']}\n"
      . "تلفن: {$data['phone']}\n"
      . "دوره: {$data['program']}\n"
      . "سابقه: {$data['experience']}\n"
      . "توضیحات: {$data['note']}";

mail($to, $subject, $body, "Content-Type: text/plain; charset=UTF-8");

// ذخیره در فایل (بک‌اپ)
file_put_contents(
    __DIR__ . '/registrations.jsonl',
    json_encode($data, JSON_UNESCAPED_UNICODE) . "\n",
    FILE_APPEND
);

echo json_encode(['success' => true]);
```

سپس در `src/submitService.js`:

```js
const SUBMIT_ENDPOINT = '/api/register.php';
```

---

## ۷. رفع مشکلات رایج

| مشکل | علت و راه‌حل |
|---|---|
| صفحه سفید است | مقدار `base` در `vite.config.js` اشتباه است یا فایل‌ها در زیرپوشه قرار گرفته‌اند |
| فونت فارسی لود نمی‌شود | دسترسی به Google Fonts محدود است — فونت وزیرمتن را دانلود و لوکال قرار دهید |
| تصاویر نمایش داده نمی‌شوند | آدرس‌های `IMAGES` در `helpers.jsx` را بررسی کنید |
| لینک `tel:` کار نمی‌کند | مقدار `phone` باید فقط عدد لاتین باشد (بدون خط تیره و فاصله) |
| فرم کار نمی‌کند | طبیعی است — بخش ۶ همین سند را دنبال کنید |
| متن چپ‌چین شده | ویژگی `dir="rtl"` در `index.html` حذف شده است |

---

## ۸. بهینه‌سازی نهایی (اختیاری اما توصیه‌شده)

### فونت لوکال (سرعت بیشتر در ایران)

1. فونت وزیرمتن را از [github.com/rastikerdar/vazirmatn](https://github.com/rastikerdar/vazirmatn) دانلود کنید
2. فایل‌های `.woff2` را در `public/fonts/` قرار دهید
3. در `src/main.css` اضافه کنید:

```css
@font-face {
  font-family: 'Vazirmatn';
  src: url('/fonts/Vazirmatn-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Vazirmatn';
  src: url('/fonts/Vazirmatn-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
```

4. در `index.html` خط مربوط به Google Fonts را حذف کنید

### بررسی سرعت سایت
پس از انتشار، سایت را در [PageSpeed Insights](https://pagespeed.web.dev) تست کنید.
