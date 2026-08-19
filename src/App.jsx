// ============================================================
// وب‌سایت باشگاه تیراندازی با کمان ققنوس (Phoenix Archery Club)
// فایل ورودی اصلی — چیدمان کلی صفحه و مدیریت داده‌ها
// ------------------------------------------------------------
// راهنمای ویرایش:
//  • محتوای متنی سایت (نام، تلفن، آدرس، درباره ما) در فایل
//    src/data/site-settings.md قابل تغییر است.
//  • مربیان، دوره‌ها، امکانات و افتخارات در فایل‌های JSON
//    پوشه src/data/ قرار دارند.
//  • رنگ‌ها در src/helpers.jsx (آبجکت C) و tailwind.config.js هستند.
// ============================================================

import React, { useMemo, useEffect } from 'react';
import { parseSettings, parseFaq, parseAbout, parseWhyUs } from './helpers';
import { getSiteData } from './dataProvider';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Programs from './Programs';
import Coaches from './Coaches';
import Facilities from './Facilities';
import Achievements from './Achievements';
import Faq from './Faq';
import Contact from './Contact';
import Footer from './Footer';
import CallFab from './CallFab';

export default function App() {
  // ---- دریافت داده‌های سایت از لایه تأمین داده ----
  const {
    settingsRaw,
    faqRaw,
    coaches,
    programs,
    facilities,
    achievements,
  } = useMemo(() => getSiteData(), []);

  // تجزیه‌ی تنطیمات به یک آبجکت کلید/مقدار
  const s = useMemo(() => parseSettings(settingsRaw), [settingsRaw]);
  const aboutParagraphs = useMemo(() => parseAbout(settingsRaw), [settingsRaw]);
  const whyUs = useMemo(() => parseWhyUs(settingsRaw), [settingsRaw]);
  const faqItems = useMemo(() => parseFaq(faqRaw), [faqRaw]);

  // ---- سئو: تزریق متا تگ‌های استاندارد و Open Graph ----
  // توجه: متا تگ‌های پایه در index.html هم وجود دارند؛ این بخش
  // آن‌ها را بر اساس محتوای فایل تنطیمات به‌روز می‌کند.
  useEffect(() => {
    const title = s.seo_title || s.club_name || 'باشگاه تیراندازی با کمان ققنوس';
    document.title = title;

    // تابع کمکی برای ساخت یا به‌روزرسانی یک متا تگ
    const setMeta = (attr, key, content) => {
      if (!content) return;
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', s.seo_description);
    setMeta('name', 'keywords', s.seo_keywords);
    setMeta('name', 'author', s.club_name);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', 'fa_IR');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', s.seo_description);
    setMeta('property', 'og:site_name', s.club_name);
    setMeta('property', 'og:image', s.og_image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', s.seo_description);

    // تعیین جهت و زبان سند برای راست‌چین شدن کامل
    document.documentElement.setAttribute('lang', 'fa');
    document.documentElement.setAttribute('dir', 'rtl');
  }, [s]);

  return (
    // dir=rtl : تمام صفحه راست‌چین است
    <div dir="rtl" className="pac-root min-h-screen bg-white text-[#0B1A33]">
      <Header s={s} />
      <main>
        <Hero s={s} achievements={achievements} coaches={coaches} />
        <About s={s} paragraphs={aboutParagraphs} whyUs={whyUs} />
        <Programs s={s} programs={programs} />
        <Coaches coaches={coaches} />
        <Facilities facilities={facilities} />
        <Achievements achievements={achievements} />
        <Faq items={faqItems} />
        <Contact s={s} programs={programs} />
      </main>
      <Footer s={s} />
      {/* دکمه شناور تماس — در تمام بخش‌های سایت قابل دسترس است */}
      <CallFab s={s} />
    </div>
  );
}
