// ============================================================
// بخش امکانات و تجهیزات باشگاه
// داده از فایل src/data/facilities.json خوانده می‌شود.
// ============================================================

import React from 'react';
import { Target, Ruler, Video, Dumbbell, Wrench, Brain, ShieldCheck, Users } from 'lucide-react';
import { safe, C, IMAGES } from './helpers';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

// نقشه آیکون‌ها — مقدار ستون icon در فایل داده به آیکون تبدیل می‌شود
const ICONS = {
  target: Target,
  ruler: Ruler,
  video: Video,
  dumbbell: Dumbbell,
  wrench: Wrench,
  brain: Brain,
  shield: ShieldCheck,
  users: Users,
};

export default function Facilities({ facilities }) {
  return (
    <section id="facilities" className="py-20 md:py-24" style={{ backgroundColor: C.white }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          kicker="امکانات"
          title="زیرساخت در سطح استانداردهای جهانی"
          desc="از سالن سرپوشیده با شرایط ثابت نور و دما تا کارگاه تیونینگ تجهیزات؛ همه‌چیز برای تمرین حرفه‌ای فراهم است."
        />

        {/* ---- دو تصویر معرفی امکانات ---- */}
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <Reveal>
            <div className="rounded-2xl overflow-hidden border relative" style={{ borderColor: C.silverLine }}>
              <img
                src={IMAGES.equipment}
                alt="تجهیزات حرفه‌ای کمان ریکرو"
                loading="lazy"
                decoding="async"
                className="w-full h-[220px] object-cover transition-transform duration-300 hover:scale-[1.04]"
              />
              <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#0B1A33]/90 text-white">
                کارگاه تیونینگ تجهیزات
              </span>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className="rounded-2xl overflow-hidden border relative" style={{ borderColor: C.silverLine }}>
              <img
                src={IMAGES.target}
                alt="سیبل استاندارد مسابقات با گروه‌بندی تیرها"
                loading="lazy"
                decoding="async"
                className="w-full h-[220px] object-cover transition-transform duration-300 hover:scale-[1.04]"
              />
              <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#0B1A33]/90 text-white">
                سیبل‌های استاندارد فدراسیونی
              </span>
            </div>
          </Reveal>
        </div>

        {/* ---- شبکه کارت‌های امکانات ---- */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.map((f, i) => {
            const Icon = ICONS[safe(f.icon)] || Target;
            return (
              <Reveal key={f.id} delay={i * 55}>
                <div
                  className="h-full rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  style={{ borderColor: C.silverLine, backgroundColor: C.white }}
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: C.accent + '18' }}
                  >
                    <Icon size={17} style={{ color: C.accent }} />
                  </span>
                  <h3 className="mt-4 text-[14px] font-bold leading-snug" style={{ color: C.navy }}>
                    {safe(f.title)}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold" style={{ color: C.accent }}>{safe(f.spec)}</p>
                  <p className="mt-3 text-[12.5px] leading-[1.85] text-[#3C4A63]">{safe(f.description)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
