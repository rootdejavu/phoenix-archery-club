// ============================================================
// بخش کادر فنی و مربیان
// داده از فایل src/data/coaches.json خوانده می‌شود.
// ============================================================

import React from 'react';
import { BadgeCheck, Clock3, User } from 'lucide-react';
import { safe, toFa, C } from './helpers';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

// رنگ نشان هر رشته — برای تفکیک بصری تخصص‌ها
const DISC_COLOR = {
  'ریکرو': '#7C93B8',
  'کامپوند': '#D4AF37',
  'بدنسازی': '#5E9EA0',
  'روان‌شناسی ورزشی': '#9B8AB8',
};

export default function Coaches({ coaches }) {
  return (
    <section id="coaches" className="py-20 md:py-24" style={{ backgroundColor: C.navy }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          light
          kicker="کادر فنی"
          title="مربیان و متخصصان باشگاه"
          desc="ترکیبی از مربیان دارای مدرک بین‌المللی، ورزشکاران سابق تیم ملی و متخصصان علوم ورزشی."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coaches.map((c, i) => {
            const disc = safe(c.discipline);
            const color = DISC_COLOR[disc] || C.silver;
            return (
              <Reveal key={c.id} delay={i * 70}>
                <article
                  className="h-full rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1"
                  style={{ backgroundColor: C.navySoft, borderColor: C.navyLine }}
                >
                  {/* آواتار و نام */}
                  <div className="flex items-start gap-4">
                    <span
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: C.navyLine }}
                    >
                      <User size={22} style={{ color }} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[15.5px] font-bold text-white leading-snug">{safe(c.name)}</h3>
                      <p className="mt-1 text-[12px]" style={{ color: C.silver }}>{safe(c.role)}</p>
                    </div>
                  </div>

                  {/* نشان رشته تخصصی */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10.5px] font-bold border"
                      style={{ color, borderColor: color + '55', backgroundColor: color + '18' }}
                    >
                      {disc}
                    </span>
                    <span
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] border"
                      style={{ color: C.silver, borderColor: C.navyLine }}
                    >
                      <Clock3 size={10} /> {toFa(c.years)} سال سابقه
                    </span>
                  </div>

                  {/* مدرک */}
                  <div className="mt-4 flex items-start gap-2">
                    <BadgeCheck size={14} className="mt-0.5 shrink-0" style={{ color: C.gold }} />
                    <p className="text-[12px] leading-relaxed" style={{ color: C.silver }}>{safe(c.license)}</p>
                  </div>

                  {/* بیوگرافی */}
                  <p className="mt-4 pt-4 border-t text-[12.5px] leading-[1.9]" style={{ borderColor: C.navyLine, color: '#A9B6C8' }}>
                    {safe(c.bio)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
