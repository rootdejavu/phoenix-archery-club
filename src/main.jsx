// ============================================================
// نقطه ورود اپلیکیشن React
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// نصب اپلیکیشن روی عنصر #root در فایل index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
