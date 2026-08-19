// ============================================================
// لایه تأمین داده (Data Provider)
// ------------------------------------------------------------
// این فایل تنها نقطه‌ای است که داده‌های سایت را فراهم می‌کند.
// مزیت: اگر بعداً خواستید داده‌ها را از یک API یا بک‌اند واقعی
// بگیرید، فقط همین فایل را تغییر می‌دهید و بقیه کد دست نمی‌خورد.
//
// دو حالت پشتیبانی می‌شود:
//  ۱) حالت محلی (پیش‌فرض): داده از فایل‌های پوشه data/ خوانده می‌شود
//  ۲) حالت داینامیک: اگر داده از بیرون تزریق شده باشد، اولویت دارد
// ============================================================

// ---- وارد کردن فایل‌های محتوا ----
// نکته: پسوند ?raw باعث می‌شود Vite محتوای فایل را به‌صورت متن خام بدهد
import settingsRaw from './data/site-settings.md?raw';
import faqRaw from './data/faq.md?raw';
import coachesJson from './data/coaches.json';
import programsJson from './data/programs.json';
import facilitiesJson from './data/facilities.json';
import achievementsJson from './data/achievements.json';

/**
 * دریافت تمام داده‌های مورد نیاز سایت
 * @returns {Object} آبجکتی شامل تمام بخش‌های محتوا
 */
export function getSiteData() {
  // ───── حالت داینامیک ─────
  // اگر داده از محیط بیرونی تزریق شده باشد، از آن استفاده می‌کنیم.
  // این بخش برای سازگاری با محیط‌های مدیریت محتوای خارجی است.
  const injected = typeof window !== 'undefined' ? window.__phoenixData : null;

  if (injected) {
    return {
      settingsRaw: injected.settingsRaw ?? settingsRaw,
      faqRaw: injected.faqRaw ?? faqRaw,
      coaches: injected.coaches ?? coachesJson,
      programs: injected.programs ?? programsJson,
      facilities: injected.facilities ?? facilitiesJson,
      achievements: injected.achievements ?? achievementsJson,
    };
  }

  // ───── حالت محلی (پیش‌فرض) ─────
  return {
    settingsRaw,      // متن خام فایل تنطیمات
    faqRaw,           // متن خام سوالات متداول
    coaches: coachesJson,
    // دوره‌ها: اول دوره‌های ویژه، سپس بر اساس شناسه
    programs: [...programsJson].sort(
      (a, b) => (b.is_featured ?? 0) - (a.is_featured ?? 0) || a.id - b.id,
    ),
    // امکانات: مرتب‌سازی بر اساس ترتیب دلخواه
    facilities: [...facilitiesJson].sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
    ),
    achievements: achievementsJson,
  };
}
