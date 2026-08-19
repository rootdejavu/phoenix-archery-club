// ============================================================
// بخش دوره‌ها و برنامه‌های تمرینی
// داده از فایل src/data/programs.json خوانده می‌شود.
// امکان فیلتر بر اساس سطح دوره وجود دارد.
// ============================================================

import React, { useState, useMemo } from 'react';
import { Clock, Users, CalendarDays, Check, Phone, Star } from 'lucide-react';
import { safe, toFa, C, parseFeatures, scrollToSection } from './helpers';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

export default function Programs({ s, programs }) {
  const [level, setLevel] = useState('همه'); // فیلتر فعال
  const phone = safe(s.phone);

  // استخراج سطوح موجود از داده‌ها
  const levels = useMemo(() => {
    const set = [...new Set(programs.map((p) => safe(p.level)).filter(Boolean))];
    return ['همه', ...set];
  }, [programs]);

  // اعمال فیلتر
  const list = useMemo(
    () => (level === 'همه' ? programs : programs.filter((p) => safe(p.level) === level)),
    [programs, level],
  );

  return (
    <section id="programs" className="py-20 md:py-24" style={{ backgroundColor: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          kicker="برنامه‌های تمرینی"
          title="دوره‌های تخصصی باشگاه"
          desc="برنامه‌های ما بر پایه داده و تقویم مسابقات طراحی می‌شوند. هر دوره ظرفیت محدود دارد تا کیفیت نظارت فنی حفظ شود."
        />

        {/* ---- فیلتر سطح دوره ---- */}
        <Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {levels.map((lv) => {
              const active = level === lv;
              return (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className="px-4 py-2 rounded-full text-[12.5px] font-semibold border transition-all duration-200"
                  style={{
                    backgroundColor: active ? C.navy : C.white,
                    color: active ? C.white : '#5A6880',
                    borderColor: active ? C.navy : C.silverLine,
                  }}
                >
                  {lv}
                </button>
              );
            })}
            <span className="self-center text-[11px]" style={{ color: C.silverDim }}>
              {toFa(list.length)} دوره
            </span>
          </div>
        </Reveal>

        {/* ---- کارت‌های دوره ---- */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p, i) => {
            const featured = Number(p.is_featured) === 1;
            const features = parseFeatures(p.features);
            return (
              <Reveal key={p.id} delay={i * 70}>
                <article
                  className="h-full flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  style={{
                    backgroundColor: C.white,
                    borderColor: featured ? C.accent : C.silverLine,
                  }}
                >
                  {/* سطح دوره + نشان دوره ویژه */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10.5px] font-bold border"
                      style={{ backgroundColor: C.offWhite, color: C.navy, borderColor: C.silverLine }}
                    >
                      {safe(p.level)}
                    </span>
                    {featured && (
                      <span className="flex items-center gap-1 text-[10.5px] font-bold" style={{ color: C.gold }}>
                        <Star size={11} /> پیشنهاد باشگاه
                      </span>
                    )}
                  </div>

                  {/* نام و توضیح دوره */}
                  <h3 className="mt-4 text-[17px] font-black leading-snug" style={{ color: C.navy }}>
                    {safe(p.title)}
                  </h3>
                  <p className="mt-1 text-[11.5px]" style={{ color: C.silverDim }}>
                    رشته: {safe(p.discipline)}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#3C4A63]">{safe(p.description)}</p>

                  {/* مشخصات کلیدی دوره */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <Spec icon={CalendarDays} label="مدت" value={safe(p.duration)} />
                    <Spec icon={Clock} label="در هفته" value={toFa(p.sessions_per_week) + ' جلسه'} />
                    <Spec icon={Users} label="ظرفیت" value={toFa(p.capacity) + ' نفر'} />
                  </div>

                  {/* ویژگی‌های دوره */}
                  {features.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[12.5px] text-[#3C4A63]">
                          <Check size={13} className="mt-0.5 shrink-0" style={{ color: C.accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* قیمت و دکمه‌های اقدام — شماره تلفن لینک tel: */}
                  <div className="mt-6 pt-5 border-t" style={{ borderColor: C.silverLine }}>
                    <p className="text-[11px]" style={{ color: C.silverDim }}>شهریه دوره</p>
                    <p className="text-[16px] font-black" style={{ color: C.navy }}>{safe(p.price)}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => scrollToSection('contact')}
                        className="flex-1 px-4 py-2.5 rounded-full text-[12.5px] font-bold text-white transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: C.navy }}
                      >
                        درخواست ثبت‌نام
                      </button>
                      <a
                        href={`tel:${phone}`}
                        className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200 hover:bg-[#F7F9FC]"
                        style={{ borderColor: C.silverLine, color: C.navy }}
                        aria-label="تماس تلفنی"
                      >
                        <Phone size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* حالت خالی */}
        {list.length === 0 && (
          <div className="mt-10 text-center py-14 rounded-2xl border" style={{ borderColor: C.silverLine }}>
            <CalendarDays size={26} className="mx-auto mb-3" style={{ color: C.silverLine }} />
            <p className="text-[13px]" style={{ color: C.silverDim }}>دوره‌ای در این سطح ثبت نشده است.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// کامپوننت کوچک نمایش یک مشخصه از دوره
function Spec({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border p-2.5 text-center" style={{ borderColor: C.silverLine, backgroundColor: C.offWhite }}>
      <Icon size={13} className="mx-auto" style={{ color: C.accent }} />
      <p className="mt-1.5 text-[9.5px]" style={{ color: C.silverDim }}>{label}</p>
      <p className="text-[11px] font-bold leading-tight" style={{ color: C.navy }}>{value}</p>
    </div>
  );
}
