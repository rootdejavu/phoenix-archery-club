// ============================================================
// بخش «درباره باشگاه» و «چرا ققنوس»
// متن این بخش از فایل site-settings.md خوانده می‌شود.
// ============================================================

import React from 'react';
import { CheckCircle2, Quote } from 'lucide-react';
import { safe, C, IMAGES } from './helpers';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

export default function About({ s, paragraphs, whyUs }) {
  return (
    <section id="about" className="py-20 md:py-24" style={{ backgroundColor: C.white }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          kicker="درباره ما"
          title={safe(s.tagline) || 'خانه‌ی قهرمانان'}
          desc="مسیر ما از سال تأسیس تا امروز: ساختن محیطی در سطح استانداردهای جهانی برای ورزشکاران حرفه‌ای."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ---- ستون متن ---- */}
          <Reveal>
            <div className="space-y-5">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[1.95] text-[#3C4A63]">
                    {p}
                  </p>
                ))
              ) : (
                <p className="text-[15px] text-[#8A97AA]">متن معرفی در فایل تنطیمات ثبت نشده است.</p>
              )}

              {/* نقل‌قول تأکیدی */}
              <div
                className="mt-8 rounded-2xl border p-6"
                style={{ borderColor: C.silverLine, backgroundColor: C.offWhite }}
              >
                <Quote size={18} style={{ color: C.accent }} />
                <p className="mt-3 text-[15px] font-semibold leading-relaxed text-[#0B1A33]">
                  «اینجا جای تفریح یک‌بار در ماه نیست؛ اینجا محل تمرین کسانی است که برای سکوی قهرمانی آماده می‌شوند.»
                </p>
              </div>
            </div>
          </Reveal>

          {/* ---- ستون تصویر و مزیت‌ها ---- */}
          <Reveal delay={120}>
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: C.silverLine }}>
                <img
                  src={IMAGES.field}
                  alt="میدان روباز تیراندازی با کمان باشگاه ققنوس"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[260px] md:h-[300px] object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              </div>

              {/* فهرست مزیت‌های باشگاه */}
              <div className="rounded-2xl border p-6" style={{ borderColor: C.silverLine }}>
                <h3 className="text-[14px] font-bold text-[#0B1A33] mb-4">چرا ققنوس</h3>
                <ul className="space-y-3">
                  {whyUs.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: C.accent }} />
                      <span className="text-[13.5px] leading-relaxed text-[#3C4A63]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
