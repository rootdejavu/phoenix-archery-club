// ============================================================
// بخش افتخارات و مدال‌ها (خط زمانی)
// داده از فایل src/data/achievements.json خوانده می‌شود.
// ============================================================

import React, { useMemo, useState } from 'react';
import { Trophy, Medal, TrendingUp, Users2, Filter } from 'lucide-react';
import { safe, toFa, C } from './helpers';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

// رنگ و آیکون هر نوع افتخار
const MEDAL_STYLE = {
  'طلا': { color: '#D4AF37', icon: Trophy },
  'نقره': { color: '#C0C6CF', icon: Medal },
  'برنز': { color: '#B08D57', icon: Medal },
  'عنوان تیمی': { color: '#7C93B8', icon: Users2 },
  'رکورد': { color: '#5E9EA0', icon: TrendingUp },
};

export default function Achievements({ achievements }) {
  const [filter, setFilter] = useState('همه');

  // انواع افتخار موجود
  const kinds = useMemo(() => {
    const set = [...new Set(achievements.map((a) => safe(a.medal)).filter(Boolean))];
    return ['همه', ...set];
  }, [achievements]);

  const list = useMemo(
    () => (filter === 'همه' ? achievements : achievements.filter((a) => safe(a.medal) === filter)),
    [achievements, filter],
  );

  // شمارش هر نوع مدال برای نمایش خلاصه
  const counts = useMemo(() => {
    const c = {};
    achievements.forEach((a) => {
      const k = safe(a.medal);
      c[k] = (c[k] || 0) + 1;
    });
    return c;
  }, [achievements]);

  return (
    <section id="achievements" className="py-20 md:py-24" style={{ backgroundColor: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          kicker="افتخارات"
          title="کارنامه‌ی ورزشکاران ققنوس"
          desc="نتایج ثبت‌شده ورزشکاران و تیم‌های باشگاه در مسابقات رسمی کشوری و بین‌المللی."
        />

        {/* ---- خلاصه شمارش مدال‌ها ---- */}
        <Reveal>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.keys(MEDAL_STYLE).map((k) => {
              const st = MEDAL_STYLE[k];
              const Icon = st.icon;
              return (
                <div
                  key={k}
                  className="rounded-2xl border p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: C.silverLine, backgroundColor: C.white }}
                >
                  <span
                    className="w-9 h-9 rounded-xl mx-auto flex items-center justify-center"
                    style={{ backgroundColor: st.color + '1F' }}
                  >
                    <Icon size={15} style={{ color: st.color }} />
                  </span>
                  <p className="mt-2 text-xl font-black" style={{ color: C.navy }}>{toFa(counts[k] || 0)}</p>
                  <p className="text-[10.5px]" style={{ color: C.silverDim }}>{k}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ---- فیلتر نوع افتخار ---- */}
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Filter size={13} style={{ color: C.silverDim }} />
            {kinds.map((k) => {
              const active = filter === k;
              return (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className="px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all duration-200"
                  style={{
                    backgroundColor: active ? C.navy : C.white,
                    color: active ? C.white : '#5A6880',
                    borderColor: active ? C.navy : C.silverLine,
                  }}
                >
                  {k}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---- خط زمانی افتخارات ---- */}
        <div className="mt-8 rounded-2xl border overflow-hidden" style={{ borderColor: C.silverLine, backgroundColor: C.white }}>
          <div className="divide-y" style={{ borderColor: C.silverLine }}>
            {list.map((a) => {
              const st = MEDAL_STYLE[safe(a.medal)] || { color: C.accent, icon: Medal };
              const Icon = st.icon;
              return (
                <div
                  key={a.id}
                  className="flex items-start gap-4 px-5 py-4 transition-colors duration-150 hover:bg-[#F7F9FC]"
                  style={{ borderColor: C.silverLine }}
                >
                  {/* سال */}
                  <span
                    className="shrink-0 px-2.5 py-1 rounded-lg text-[11.5px] font-black border"
                    style={{ color: C.navy, borderColor: C.silverLine, backgroundColor: C.offWhite }}
                  >
                    {safe(a.year)}
                  </span>
                  {/* آیکون نوع افتخار */}
                  <span
                    className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: st.color + '1F' }}
                  >
                    <Icon size={14} style={{ color: st.color }} />
                  </span>
                  {/* عنوان و جزئیات */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-bold leading-snug" style={{ color: C.navy }}>{safe(a.title)}</p>
                    <p className="mt-1 text-[12px]" style={{ color: '#5A6880' }}>
                      {safe(a.athlete)} — {safe(a.competition)}
                    </p>
                  </div>
                  {/* رشته و نوع مدال */}
                  <div className="shrink-0 text-left hidden sm:block">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10.5px] font-bold border"
                      style={{ color: st.color, borderColor: st.color + '55', backgroundColor: st.color + '14' }}
                    >
                      {safe(a.medal)}
                    </span>
                    <p className="mt-1.5 text-[10.5px]" style={{ color: C.silverDim }}>{safe(a.discipline)}</p>
                  </div>
                </div>
              );
            })}

            {/* حالت خالی */}
            {list.length === 0 && (
              <div className="text-center py-14">
                <Trophy size={26} className="mx-auto mb-3" style={{ color: C.silverLine }} />
                <p className="text-[13px]" style={{ color: C.silverDim }}>موردی برای نمایش وجود ندارد.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
