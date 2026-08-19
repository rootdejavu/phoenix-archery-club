// ============================================================
// دکمه شناور تماس تلفنی — همیشه روی صفحه در دسترس است
// در موبایل با یک لمس، تماس برقرار می‌شود (لینک tel:).
// ============================================================

import React from 'react';
import { Phone } from 'lucide-react';
import { safe, C } from './helpers';

export default function CallFab({ s }) {
  const phone = safe(s.phone);
  if (!phone) return null;

  return (
    <a
      href={`tel:${phone}`}
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full text-[13px] font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5"
      style={{ backgroundColor: C.white, color: C.navy, border: `1px solid ${C.silverLine}` }}
      aria-label="تماس با باشگاه"
    >
      <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: C.navy }}>
        <Phone size={13} className="text-white" />
      </span>
      <span className="hidden sm:inline">تماس با باشگاه</span>
    </a>
  );
}
