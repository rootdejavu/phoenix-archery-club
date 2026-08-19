// ============================================================
// بخش تماس با ما و فرم درخواست ثبت‌نام
// شماره تلفن و موبایل به صورت لینک tel: قرار داده شده‌اند.
// ------------------------------------------------------------
// ⚠️ مقصد ارسال فرم در فایل src/submitService.js تنطیم می‌شود.
//    پیش از راه‌اندازی واقعی، واجب است آن فایل را بخوانید و تنطیم کنید.
// ============================================================

import React, { useState } from 'react';
import { Phone, Smartphone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2, Instagram, Video, MessageCircle } from 'lucide-react';
import { safe, C } from './helpers';
import { submitRegistration } from './submitService';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

export default function Contact({ s, programs }) {
  // ---- وضعیت فرم ----
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    program: '',
    experience: 'حرفه‌ای / ملی‌پوش',
    note: '',
  });
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  const phone = safe(s.phone);
  const mobile = safe(s.mobile);
  const phoneDisplay = safe(s.phone_display) || phone;
  const mobileDisplay = safe(s.mobile_display) || mobile;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // ---- ارسال فرم ----
  async function submit(e) {
    e.preventDefault();
    setError('');

    // اعتبارسنجی ساده
    if (!form.full_name.trim() || !form.phone.trim()) {
      setError('نام و شماره تماس الزامی است.');
      return;
    }
    if (!/^0\d{9,10}$/.test(form.phone.trim())) {
      setError('شماره تماس را با اعداد لاتین و به شکل ۱۱ رقمی وارد کنید. نمونه: 09121234567');
      return;
    }

    setState('sending');

    // ارسال از طریق لایه ارسال (src/submitService.js)
    const res = await submitRegistration(
      {
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        program: form.program,
        experience: form.experience,
        note: form.note.trim(),
      },
      safe(s.email),
    );

    if (res.success) {
      setState('done');
      setForm({ full_name: '', phone: '', program: '', experience: 'حرفه‌ای / ملی‌پوش', note: '' });
    } else {
      setState('error');
      setError(res.error || 'ثبت درخواست انجام نشد. لطفاً تلفنی تماس بگیرید.');
    }
  }

  // اطلاعات تماس — هر مورد یک کارت
  const contactItems = [
    { icon: Phone, label: 'تلفن ثابت باشگاه', value: phoneDisplay, href: `tel:${phone}` },
    { icon: Smartphone, label: 'تلفن همراه / واتساپ', value: mobileDisplay, href: `tel:${mobile}` },
    { icon: Mail, label: 'پست الکترونیک', value: safe(s.email), href: `mailto:${safe(s.email)}` },
    { icon: MapPin, label: 'نشانی باشگاه', value: safe(s.address), href: safe(s.map_url) },
    { icon: Clock, label: 'ساعات کاری', value: safe(s.working_hours), href: '' },
  ];

  return (
    <section id="contact" className="py-20 md:py-24" style={{ backgroundColor: C.navy }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTitle
          light
          kicker="تماس و ثبت‌نام"
          title="برای شروع همکاری تماس بگیرید"
          desc="برای مشاوره فنی، بازدید از مجموعه یا هماهنگی اردوی تیمی، تلفنی تماس بگیرید یا فرم درخواست را تکمیل کنید."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {/* ---- ستون اطلاعات تماس ---- */}
          <Reveal>
            <div className="space-y-3">
              {contactItems.map((it, i) => {
                const Icon = it.icon;
                const inner = (
                  <div className="flex items-start gap-4">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(201,209,220,0.12)' }}
                    >
                      <Icon size={16} style={{ color: C.silver }} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px]" style={{ color: C.silverDim }}>{it.label}</p>
                      <p className="mt-0.5 text-[13.5px] font-bold text-white leading-relaxed">{it.value || '—'}</p>
                    </div>
                  </div>
                );
                return it.href ? (
                  <a
                    key={i}
                    href={it.href}
                    className="block rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: C.navySoft, borderColor: C.navyLine }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={i}
                    className="rounded-2xl border p-5"
                    style={{ backgroundColor: C.navySoft, borderColor: C.navyLine }}
                  >
                    {inner}
                  </div>
                );
              })}

              {/* ---- شبکه‌های اجتماعی ---- */}
              <div className="rounded-2xl border p-5" style={{ backgroundColor: C.navySoft, borderColor: C.navyLine }}>
                <p className="text-[11px] mb-3" style={{ color: C.silverDim }}>ما را دنبال کنید</p>
                <div className="flex flex-wrap gap-2">
                  <Social href={safe(s.instagram)} icon={Instagram} label="اینستاگرام" />
                  <Social href={safe(s.telegram)} icon={Send} label="تلگرام" />
                  <Social href={safe(s.whatsapp)} icon={MessageCircle} label="واتساپ" />
                  <Social href={safe(s.aparat)} icon={Video} label="آپارات" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---- ستون فرم درخواست ثبت‌نام ---- */}
          <Reveal delay={120}>
            <div className="rounded-2xl border p-6 md:p-7" style={{ backgroundColor: C.white, borderColor: C.silverLine }}>
              {state === 'done' ? (
                // پیام موفقیت
                <div className="text-center py-10">
                  <span
                    className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
                    style={{ backgroundColor: '#5E9EA020' }}
                  >
                    <CheckCircle2 size={26} style={{ color: '#5E9EA0' }} />
                  </span>
                  <h3 className="mt-4 text-[17px] font-black" style={{ color: C.navy }}>درخواست شما ثبت شد</h3>
                  <p className="mt-2 text-[13px] leading-relaxed" style={{ color: '#5A6880' }}>
                    کارشناس باشگاه در اولین فرصت کاری با شما تماس می‌گیرد. برای پیگیری فوری می‌توانید تلفنی تماس بگیرید.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold text-white"
                      style={{ backgroundColor: C.navy }}
                    >
                      <Phone size={14} /> {phoneDisplay}
                    </a>
                    <button
                      onClick={() => setState('idle')}
                      className="px-5 py-2.5 rounded-full text-[13px] font-bold border"
                      style={{ borderColor: C.silverLine, color: C.navy }}
                    >
                      ثبت درخواست دیگر
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h3 className="text-[17px] font-black" style={{ color: C.navy }}>فرم درخواست ثبت‌نام</h3>
                  <p className="text-[12px]" style={{ color: '#5A6880' }}>
                    اطلاعات زیر را تکمیل کنید؛ کادر فنی پس از بررسی سابقه ورزشی با شما تماس می‌گیرد.
                  </p>

                  {/* نام و نام خانوادگی */}
                  <Field label="نام و نام خانوادگی">
                    <input
                      value={form.full_name}
                      onChange={(e) => set('full_name', e.target.value)}
                      placeholder="مثال: امیرحسین طاهری"
                      className="pac-input"
                    />
                  </Field>

                  {/* شماره تماس */}
                  <Field label="شماره تماس (با اعداد لاتین)">
                    <input
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="09121234567"
                      dir="ltr"
                      className="pac-input text-left"
                    />
                  </Field>

                  {/* انتخاب دوره */}
                  <Field label="دوره مورد نظر">
                    <select value={form.program} onChange={(e) => set('program', e.target.value)} className="pac-input">
                      <option value="">انتخاب کنید…</option>
                      {programs.map((p) => (
                        <option key={p.id} value={safe(p.title)}>{safe(p.title)}</option>
                      ))}
                    </select>
                  </Field>

                  {/* سطح سابقه */}
                  <Field label="سطح سابقه ورزشی">
                    <select value={form.experience} onChange={(e) => set('experience', e.target.value)} className="pac-input">
                      <option value="حرفه‌ای / ملی‌پوش">حرفه‌ای / ملی‌پوش</option>
                      <option value="مسابقاتی باشگاهی">مسابقاتی باشگاهی</option>
                      <option value="پیشرفته">پیشرفته</option>
                      <option value="در حال ارزیابی">در حال ارزیابی</option>
                    </select>
                  </Field>

                  {/* توضیحات */}
                  <Field label="توضیحات (اختیاری)">
                    <textarea
                      value={form.note}
                      onChange={(e) => set('note', e.target.value)}
                      rows={3}
                      placeholder="سابقه مسابقات، رکورد فعلی یا هدف شما از دوره…"
                      className="pac-input resize-none"
                    />
                  </Field>

                  {/* خطا */}
                  {error && (
                    <p className="text-[12px] font-semibold" style={{ color: '#C0392B' }}>{error}</p>
                  )}

                  {/* دکمه ارسال + تماس تلفنی */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={state === 'sending'}
                      className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                      style={{ backgroundColor: C.navy }}
                    >
                      {state === 'sending' ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                      {state === 'sending' ? 'در حال ثبت…' : 'ارسال درخواست'}
                    </button>
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[13.5px] font-bold border transition-colors duration-200 hover:bg-[#F7F9FC]"
                      style={{ borderColor: C.silverLine, color: C.navy }}
                    >
                      <Phone size={15} /> تماس فوری
                    </a>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---- برچسب + فیلد فرم ----
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[12px] font-semibold mb-1.5" style={{ color: C.navy }}>{label}</span>
      {children}
    </label>
  );
}

// ---- دکمه شبکه اجتماعی ----
function Social({ href, icon: Icon, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200 hover:-translate-y-0.5"
      style={{ color: C.silver, borderColor: C.navyLine, backgroundColor: 'rgba(255,255,255,0.04)' }}
    >
      <Icon size={13} />
      {label}
    </a>
  );
}
