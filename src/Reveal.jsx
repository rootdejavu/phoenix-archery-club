// ============================================================
// کامپوننت انیمیشن ورود با اسکرول (جایگزین سبک AOS)
// هر بخشی که داخل این کامپوننت قرار بگیرد، هنگام رسیدن
// کاربر به آن، با انیمیشن نرم ظاهر می‌شود.
// ============================================================

import React, { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // در صورت نبود پشتیبانی مرورگر، محتوا بدون انیمیشن نمایش داده می‌شود
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pac-reveal ${shown ? 'pac-reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
