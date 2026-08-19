// ============================================================
// بخش هیرو (بالای صفحه) — تصویر پس‌زمینه، شعار اصلی و آمار
// تصویر با loading=lazy و decoding=async بارگذاری می‌شود.
// ============================================================

import React from 'react';
import { Phone, ChevronLeft, Award, Users, Calendar, Target } from 'lucide-react';
import { safe, toFa, C, IMAGES, scrollToSection } from './helpers';

export default function Hero({ s, achievements, coaches }) {
  const phone = safe(s.phone);
  const phoneDisplay = safe(s.phone_display) || phone;

  // آمار خلاصه — از داده‌های واقعی فایل‌ها محاسبه می‌شود
  const stats = [
    { icon: Calendar, label: 'سال فعالیت مستمر', value: safe(s.established) ? 'از ' + safe(s.established) : '—' },
    { icon: Award, label: 'افتخار ثبت‌شده', value: toFa(achievements.length) },
    { icon: Users, label: 'عضو کادر فنی', value: toFa(coaches.length) },
    { icon: Target, label: 'خط پرتاب استاندارد', value: toFa(8) },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-[#0B1A33]">
      {/* ---- تصویر پس‌زمینه ---- */}
      <img
        src={IMAGES.hero}
        alt="سالن تیراندازی با کمان باشگاه ققنوس"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />
      {/* لایه تیره روی تصویر برای خوانایی متن */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#0B1A33] via-[#0B1A33]/85 to-[#0B1A33]/55" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          {/* نشان عضویت رسمی */}
          {safe(s.hero_badge) && (
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold border animate-[pacFade_500ms_ease-out]"
              style={{ borderColor: C.navyLine, backgroundColor: '#1A2A4A', color: C.silver }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.gold }} />
              {safe(s.hero_badge)}
            </span>
          )}

          {/* تیتر اصلی */}
          <h1 className="mt-6 text-[34px] leading-[1.25] md:text-[56px] md:leading-[1.15] font-black text-white animate-[pacUp_600ms_ease-out]">
            {safe(s.hero_title) || 'دقت، تمرکز، قهرمانی'}
          </h1>

          {/* خط تزئینی نقره‌ای */}
          <div className="mt-6 h-px w-28" style={{ background: `linear-gradient(to left, ${C.gold}, transparent)` }} />

          {/* توضیح زیر تیتر */}
          <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed max-w-2xl" style={{ color: C.silver }}>
            {safe(s.hero_subtitle)}
          </p>

          {/* ---- دکمه‌های اصلی — شماره تلفن به شکل لینک tel: ---- */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-bold bg-white text-[#0B1A33] transition-all duration-200 hover:bg-[#C9D1DC] hover:shadow-md"
            >
              <Phone size={16} />
              تماس مستقیم: {phoneDisplay}
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-bold border transition-all duration-200 text-white hover:bg-[#1A2A4A]"
              style={{ borderColor: C.navyLine }}
            >
              درخواست ثبت‌نام
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>

        {/* ---- کارت‌های آمار ---- */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: C.navyLine, backgroundColor: 'rgba(26,42,74,0.72)' }}
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: 'rgba(201,209,220,0.12)' }}
                >
                  <Icon size={15} style={{ color: C.silver }} />
                </span>
                <p className="text-2xl font-black text-white">{st.value}</p>
                <p className="mt-1 text-[11px]" style={{ color: C.silverDim }}>{st.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
