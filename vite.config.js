// ============================================================
// تنظیمات Vite — ابزار ساخت و اجرای پروژه
// ============================================================

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // تنظیمات سرور توسعه
  server: {
    port: 5173,
    open: true, // مرورگر به‌صورت خودکار باز می‌شود
  },

  // تنظیمات خروجی نهایی
  build: {
    outDir: 'dist',
    sourcemap: false,
    // جدا کردن کتابخانه‌ها از کد اصلی برای بارگذاری سریع‌تر
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },

  // اجازه import فایل‌های markdown به‌صورت متن خام
  assetsInclude: ['**/*.md'],
});
