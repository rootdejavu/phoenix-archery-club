// ============================================================
// فوتر سایت — اطلاعات تماس، لینک بخش‌ها و کپی‌رایت
// شماره تلفن در فوتر هم به صورت لینک tel: است.
// ============================================================

import React from 'react';
import { Target, Phone, Smartphone, MapPin, Mail } from 'lucide-react';
import { safe, C, SECTIONS, scrollToSection } from './helpers';

export default function Footer({ s }) {
  const phone = safe(s.phone);
  const mobile = safe(s.mobile);

  return (
    <footer className="border-t" style={{ backgroundColor: '#081426', borderColor: C.navyLine }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* ---- معرفی کوتاه ---- */}
          <div>
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl border flex items-center justify-center"
                style={{ backgroundColor: C.navySoft, borderColor: C.navyLine }}
              >
                <Target size={18} style={{ color: C.silver }} />
              </span>
              <div>
                <p className="text-[14.5px] font-bold text-white">{safe(s.club_name)}</p>
                <p className="text-[10px] tracking-widest" style={{ color: C.silverDim }}>
                  PHOENIX ARCHERY CLUB
                </p>
              </div>
            </div>
            <p className="mt-4 text-[12.5px] leading-[1.9]" style={{ color: '#8A97AA' }}>
              مرکز تخصصی آماده‌سازی ورزشکاران حرفه‌ای تیراندازی با کمان؛ فعال از سال {safe(s.established)}.
            </p>
          </div>

          {/* ---- لینک بخش‌ها ---- */}
          <div>
            <p className="text-[12px] font-bold text-white mb-4">بخش‌های سایت</p>
            <div className="grid grid-cols-2 gap-y-2.5">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="text-right text-[12.5px] transition-colors duration-200"
                  style={{ color: '#8A97AA' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#8A97AA')}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          {/* ---- تماس سریع ---- */}
          <div>
            <p className="text-[12px] font-bold text-white mb-4">تماس سریع</p>
            <div className="space-y-2.5">
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-[12.5px] transition-colors duration-200 hover:text-white" style={{ color: C.silver }}>
                <Phone size={13} /> {safe(s.phone_display)}
              </a>
              <a href={`tel:${mobile}`} className="flex items-center gap-2 text-[12.5px] transition-colors duration-200 hover:text-white" style={{ color: C.silver }}>
                <Smartphone size={13} /> {safe(s.mobile_display)}
              </a>
              <a href={`mailto:${safe(s.email)}`} className="flex items-center gap-2 text-[12.5px] transition-colors duration-200 hover:text-white" style={{ color: C.silver }} dir="ltr">
                <Mail size={13} /> {safe(s.email)}
              </a>
              <p className="flex items-start gap-2 text-[12.5px] leading-relaxed" style={{ color: '#8A97AA' }}>
                <MapPin size={13} className="mt-0.5 shrink-0" /> {safe(s.address)}
              </p>
            </div>
          </div>
        </div>

        {/* ---- خط پایانی ---- */}
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: C.navyLine }}>
          <p className="text-[11.5px]" style={{ color: '#6B7A91' }}>
            © تمام حقوق برای {safe(s.club_name)} محفوظ است.
          </p>
          <p className="text-[11.5px]" style={{ color: '#6B7A91' }}>{safe(s.working_hours)}</p>
        </div>
      </div>
    </footer>
  );
}
