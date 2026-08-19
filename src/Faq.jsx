// ============================================================
// بخش سوالات متداول (آکاردئون)
// متن‌ها از فایل src/data/faq.md خوانده می‌شود.
// ============================================================

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { safe, C } from './helpers';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0); // شماره سوال باز (پیش‌فرض: اولی)

  return (
    <section id="faq" className="py-20 md:py-24" style={{ backgroundColor: C.white }}>
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <SectionTitle
          kicker="راهنما"
          title="سوالات متداول"
          desc="پاسخ پرتکرارترین پرسش‌های ورزشکاران و تیم‌ها درباره شرایط پذیرش و امکانات باشگاه."
        />

        <div className="mt-10 space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 45}>
                <div
                  className="rounded-2xl border overflow-hidden transition-all duration-200"
                  style={{ borderColor: isOpen ? C.accent : C.silverLine, backgroundColor: isOpen ? C.offWhite : C.white }}
                >
                  {/* سر آکاردئون */}
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-right transition-colors duration-150"
                  >
                    <HelpCircle size={16} className="shrink-0" style={{ color: isOpen ? C.accent : C.silverDim }} />
                    <span className="flex-1 text-[14px] font-bold leading-snug" style={{ color: C.navy }}>
                      {safe(it.q)}
                    </span>
                    <ChevronDown
                      size={16}
                      className="shrink-0 transition-transform duration-200"
                      style={{ color: C.silverDim, transform: isOpen ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  {/* پاسخ */}
                  {isOpen && (
                    <div className="px-5 pb-5 pr-12 animate-[pacFade_240ms_ease-out]">
                      <p className="text-[13.5px] leading-[2] text-[#3C4A63]">{safe(it.a)}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}

          {items.length === 0 && (
            <p className="text-center text-[13px] py-10" style={{ color: C.silverDim }}>
              سوالی ثبت نشده است.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
