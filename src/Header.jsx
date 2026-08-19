// ============================================================
// هدر چسبان سایت — لوگو، منوی ناوبری و شماره تماس
// شماره تلفن به صورت لینک tel: کلیک‌شونده است.
// ============================================================

import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Target } from 'lucide-react';
import { safe, C, SECTIONS, scrollToSection } from './helpers';

export default function Header({ s }) {
  const [open, setOpen] = useState(false);      // وضعیت منوی موبایل
  const [scrolled, setScrolled] = useState(false); // آیا صفحه اسکرول شده است

  // با اسکرول صفحه، هدر حالت شیشه‌ای/تیره می‌گیرد
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const phone = safe(s.phone);
  const phoneDisplay = safe(s.phone_display) || phone;

  // کلیک روی آیتم منو: پیمایش نرم و بستن منوی موبایل
  const go = (id) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#0B1A33]/95 backdrop-blur-xl border-[#26385C]'
          : 'bg-[#0B1A33] border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* ---- لوگو و نام باشگاه ---- */}
          <button onClick={() => go('home')} className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl border border-[#26385C] bg-[#1A2A4A] flex items-center justify-center transition-colors duration-200 group-hover:border-[#C9D1DC]">
              <Target size={18} style={{ color: C.silver }} />
            </span>
            <span className="text-right leading-tight">
              <span className="block text-[15px] font-bold text-white">{safe(s.club_name) || 'باشگاه ققنوس'}</span>
              <span className="block text-[10px] tracking-widest" style={{ color: C.silverDim }}>
                PHOENIX ARCHERY CLUB
              </span>
            </span>
          </button>

          {/* ---- منوی دسکتاپ ---- */}
          <nav className="hidden lg:flex items-center gap-1">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => go(sec.id)}
                className="px-3 py-2 text-[13px] rounded-full transition-colors duration-200 text-[#C9D1DC] hover:text-white hover:bg-[#1A2A4A]"
              >
                {sec.label}
              </button>
            ))}
          </nav>

          {/* ---- شماره تماس (لینک tel:) + دکمه منوی موبایل ---- */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${phone}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 bg-white text-[#0B1A33] hover:bg-[#C9D1DC]"
              dir="ltr"
            >
              <Phone size={14} />
              <span dir="rtl">{phoneDisplay}</span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-xl border border-[#26385C] flex items-center justify-center text-[#C9D1DC] transition-colors duration-200 hover:bg-[#1A2A4A]"
              aria-label="منو"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ---- منوی موبایل ---- */}
      {open && (
        <div className="lg:hidden border-t border-[#26385C] bg-[#0B1A33] animate-[pacFade_240ms_ease-out]">
          <div className="max-w-7xl mx-auto px-5 py-4 grid grid-cols-2 gap-2">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => go(sec.id)}
                className="text-right px-4 py-3 rounded-xl text-[13px] text-[#C9D1DC] bg-[#1A2A4A] border border-[#26385C] transition-colors duration-200 hover:text-white"
              >
                {sec.label}
              </button>
            ))}
            <a
              href={`tel:${phone}`}
              className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[13px] font-semibold bg-white text-[#0B1A33]"
            >
              <Phone size={14} />
              <span>تماس تلفنی: {phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
