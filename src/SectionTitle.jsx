// ============================================================
// تیتر مشترک بخش‌ها — برای یکدست بودن ظاهر تمام بخش‌ها
// ============================================================

import React from 'react';
import { C } from './helpers';
import Reveal from './Reveal';

export default function SectionTitle({ kicker, title, desc, light = false }) {
  return (
    <Reveal>
      <div className="max-w-3xl">
        {/* برچسب کوچک بالای تیتر */}
        {kicker && (
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase"
            style={{ color: light ? C.silverDim : C.accent }}
          >
            <span className="w-6 h-px" style={{ backgroundColor: light ? C.silverDim : C.accent }} />
            {kicker}
          </span>
        )}
        {/* تیتر اصلی بخش */}
        <h2
          className="mt-3 text-[26px] md:text-[36px] font-black leading-tight"
          style={{ color: light ? '#FFFFFF' : C.navy }}
        >
          {title}
        </h2>
        {/* توضیح کوتاه */}
        {desc && (
          <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: light ? C.silver : '#5A6880' }}>
            {desc}
          </p>
        )}
      </div>
    </Reveal>
  );
}
