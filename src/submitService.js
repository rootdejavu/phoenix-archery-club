// ============================================================
// لایه ارسال فرم ثبت‌نام
// ------------------------------------------------------------
// ⚠️ مهم — این را پیش از راه‌اندازی واقعی بخوانید:
//
// این پروژه یک وب‌سایت ایستا (static) است و بک‌اند ندارد.
// بنابراین فرم ثبت‌نام به تنهایی نمی‌تواند داده را جایی ذخیره کند.
// برای فعال کردن واقعی فرم، یکی از روش‌های زیر را انتخاب کنید:
//
//   روش ۱ — سرویس فرم آماده (ساده‌ترین راه):
//     در Formspree یا سرویس مشابه حساب بسازید و آدرس endpoint را
//     در متغیر SUBMIT_ENDPOINT زیر قرار دهید.
//
//   روش ۲ — بک‌اند اختصاصی:
//     یک API بنویسید (PHP / Node / هر چیزی که هاست شما پشتیبانی می‌کند)
//     که درخواست POST با بدنه JSON را دریافت و در دیتابیس ذخیره کند،
//     سپس آدرس آن را در SUBMIT_ENDPOINT قرار دهید.
//
//   روش ۳ — حالت پیش‌فرض فعلی (بدون تنطیم):
//     اگر SUBMIT_ENDPOINT خالی باشد، فرم اطلاعات را در قالب یک ایمیل
//     آماده می‌کند و برنامه ایمیل کاربر را باز می‌کند (mailto).
//     این روش کار می‌کند اما تجربه کاربری ضعیف‌تری دارد.
// ============================================================

// آدرس مقصد ارسال فرم — اگر خالی باشد، حالت mailto فعال می‌شود
// نمونه: 'https://formspree.io/f/xxxxxxx'
const SUBMIT_ENDPOINT = '';

/**
 * ارسال درخواست ثبت‌نام
 * @param {Object} form — اطلاعات فرم (نام، تلفن، دوره، سابقه، توضیحات)
 * @param {string} clubEmail — ایمیل باشگاه (برای حالت mailto)
 * @returns {Promise<{success: boolean, mode: string, error?: string}>}
 */
export async function submitRegistration(form, clubEmail) {
  // ───── حالت ۱: ارسال به سرور ─────
  if (SUBMIT_ENDPOINT) {
    try {
      const res = await fetch(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...form,
          // زمان ثبت درخواست
          submitted_at: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        return { success: true, mode: 'api' };
      }
      return {
        success: false,
        mode: 'api',
        error: 'ارسال به سرور انجام نشد. لطفاً تلفنی تماس بگیرید.',
      };
    } catch (err) {
      return {
        success: false,
        mode: 'api',
        error: 'اتصال برقرار نشد. اینترنت خود را بررسی کنید یا تلفنی تماس بگیرید.',
      };
    }
  }

  // ───── حالت ۲: باز کردن برنامه ایمیل (پیش‌فرض) ─────
  if (!clubEmail) {
    return {
      success: false,
      mode: 'none',
      error: 'امکان ارسال فرم فعال نیست. لطفاً تلفنی تماس بگیرید.',
    };
  }

  // ساخت متن ایمیل
  const subject = `درخواست ثبت‌نام — ${form.full_name}`;
  const body = [
    `نام و نام خانوادگی: ${form.full_name}`,
    `شماره تماس: ${form.phone}`,
    `دوره مورد نظر: ${form.program || 'مشخص نشده'}`,
    `سطح سابقه: ${form.experience}`,
    `توضیحات: ${form.note || '—'}`,
  ].join('\n');

  // باز کردن برنامه ایمیل کاربر
  window.location.href =
    `mailto:${clubEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { success: true, mode: 'mailto' };
}
