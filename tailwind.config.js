// ============================================================
// تنظیمات Tailwind CSS — پالت رنگی و فونت باشگاه ققنوس
// ============================================================

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {
    extend: {
      // ---- پالت رنگی برند ----
      colors: {
        navy: {
          DEFAULT: '#0B1A33', // سرمه‌ای تیره اصلی
          soft: '#1A2A4A',    // سرمه‌ای روشن‌تر (کارت‌ها)
          line: '#26385C',    // خط حاشیه روی زمینه تیره
        },
        silver: {
          DEFAULT: '#C9D1DC', // نقره‌ای اصلی
          dim: '#8A97AA',     // نقره‌ای کم‌رنگ
          line: '#E4E8EE',    // خط حاشیه روی زمینه روشن
        },
        offwhite: '#F7F9FC',  // سفید مایل به آبی
        gold: '#D4AF37',      // طلایی (مدال و تأکید)
        bronze: '#B08D57',    // برنز
        accent: '#7C93B8',    // آبی نقره‌ای (آیکون‌ها)
      },

      // ---- فونت فارسی ----
      fontFamily: {
        sans: ['Vazirmatn', 'IRANSansX', 'IRANSans', 'Segoe UI', 'Tahoma', 'sans-serif'],
      },

      // ---- انیمیشن‌ها ----
      keyframes: {
        pacFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pacUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pacFade: 'pacFade 240ms ease-out',
        pacUp: 'pacUp 600ms ease-out',
      },
    },
  },

  plugins: [],
};
