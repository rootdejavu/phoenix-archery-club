// ============================================================
// توابع کمکی — تجزیه محتوای فایل‌ها و ابزارهای مشترک
// ============================================================

// تبدیل هر مقدار به رشته‌ی امن (جلوگیری از خطای زمان اجرا)
export function safe(v) {
  return String(v ?? '').trim();
}

// تبدیل اعداد لاتین به اعداد فارسی برای نمایش زیباتر
export function toFa(input) {
  const fa = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return safe(input).replace(/[0-9]/g, (d) => fa[Number(d)]);
}

// ---- تجزیه فایل تنطیمات: خطوط «کلید: مقدار» ----
export function parseSettings(raw) {
  const out = {};
  safe(raw)
    .split('\n')
    .forEach((line) => {
      // خطوط توضیحی و تیترها نادیده گرفته می‌شوند
      const t = line.trim();
      if (!t || t.startsWith('#') || t.startsWith('<!--') || t.startsWith('-')) return;
      const m = t.match(/^([a-z_]+)\s*:\s*(.+)$/i);
      if (m) out[m[1].trim()] = m[2].trim();
    });
  return out;
}

// ---- استخراج پاراگراف‌های بخش «درباره باشگاه» ----
export function parseAbout(raw) {
  const block = safe(raw).match(/##\s*درباره باشگاه\s*([\s\S]*?)(?=\n##\s|$)/);
  if (!block) return [];
  return block[1]
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith('#'));
}

// ---- استخراج آیتم‌های بخش «چرا ققنوس» (خطوط با خط تیره) ----
export function parseWhyUs(raw) {
  const block = safe(raw).match(/##\s*چرا ققنوس\s*([\s\S]*?)(?=\n##\s|$)/);
  if (!block) return [];
  return block[1]
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('-'))
    .map((l) => l.replace(/^-\s*/, '').trim())
    .filter(Boolean);
}

// ---- تجزیه فایل سوالات متداول: هر سوال با ### شروع می‌شود ----
export function parseFaq(raw) {
  const items = [];
  const parts = safe(raw).split(/\n###\s+/);
  parts.slice(1).forEach((part) => {
    const lines = part.split('\n');
    const q = lines[0].trim();
    const a = lines.slice(1).join('\n').trim();
    if (q) items.push({ q, a });
  });
  return items;
}

// ---- تجزیه ویژگی‌های دوره که با کاراکتر | جدا شده‌اند ----
export function parseFeatures(v) {
  return safe(v)
    .split('|')
    .map((x) => x.trim())
    .filter(Boolean);
}

// ============================================================
// پالت رنگی برند — سرمه‌ای تیره، سفید و نقره‌ای
// برای تغییر هویت رنگی سایت، همین مقادیر را ویرایش کنید.
// ============================================================
export const C = {
  navy: '#0B1A33',       // سرمه‌ای تیره اصلی (پس‌زمینه بخش‌های تیره)
  navySoft: '#1A2A4A',   // سرمه‌ای روشن‌تر (کارت‌ها روی زمینه تیره)
  navyLine: '#26385C',   // خط حاشیه روی زمینه تیره
  silver: '#C9D1DC',     // نقره‌ای اصلی (متن‌های فرعی روی تیره)
  silverDim: '#8A97AA',  // نقره‌ای کم‌رنگ (متن متا)
  silverLine: '#E4E8EE', // خط حاشیه روی زمینه روشن
  offWhite: '#F7F9FC',   // سفید مایل به آبی (پس‌زمینه بخش‌های روشن)
  white: '#FFFFFF',
  gold: '#D4AF37',       // طلایی — مدال طلا و تأکیدها
  bronze: '#B08D57',     // برنز
  accent: '#7C93B8',     // آبی نقره‌ای برای آیکون‌ها
};

// ============================================================
// تصاویر سایت — با بارگذاری تنبل (lazy loading)
// ------------------------------------------------------------
// ۱) در حالت فعلی تصاویر از آدرس بیرونی لود می‌شوند.
// ۲) پیشنهاد برای نسخه نهایی: تصاویر را با فرمت WebP در پوشه
//    public/images/ قرار دهید و مقادیر زیر را به شکل زیر عوض کنید:
//      hero: '/images/hero.webp',
//      equipment: '/images/equipment.webp',
//      field: '/images/field.webp',
//      target: '/images/target.webp',
// ============================================================
export const IMAGES = {
  hero: 'https://app.zaro.ai/api/console/workspaces/oss/read?workspace_id=d7a2c140-f42a-47a5-949c-2d2bdc657754&object_id=public-img-f042af43-1a2a-4859-b3b2-ae6af7380897',
  equipment: 'https://app.zaro.ai/api/console/workspaces/oss/read?workspace_id=d7a2c140-f42a-47a5-949c-2d2bdc657754&object_id=public-img-b068bcf2-038e-4f8d-a462-c27b8b11c5d4',
  field: 'https://app.zaro.ai/api/console/workspaces/oss/read?workspace_id=d7a2c140-f42a-47a5-949c-2d2bdc657754&object_id=public-img-c3a2593e-8168-4335-8a22-e8ac36719afb',
  target: 'https://app.zaro.ai/api/console/workspaces/oss/read?workspace_id=d7a2c140-f42a-47a5-949c-2d2bdc657754&object_id=public-img-0e9c4f1b-b2df-40d7-bba6-02a3d84b00c2',
};

// ---- پیمایش نرم به یک بخش از صفحه ----
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---- فهرست بخش‌های سایت برای منوی ناوبری ----
export const SECTIONS = [
  { id: 'home', label: 'خانه' },
  { id: 'about', label: 'درباره باشگاه' },
  { id: 'programs', label: 'دوره‌ها' },
  { id: 'coaches', label: 'کادر فنی' },
  { id: 'facilities', label: 'امکانات' },
  { id: 'achievements', label: 'افتخارات' },
  { id: 'faq', label: 'سوالات متداول' },
  { id: 'contact', label: 'تماس و ثبت‌نام' },
];
