import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

const ThemeProvider = ({ children }) => {
  const getInitial = () => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('theme');
    if (saved) return saved;
    // fallback to system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try { localStorage.setItem('theme', theme); } catch (e) {}
    // debug log
    console.log('[ThemeProvider] theme set to', theme, 'html classes=', document.documentElement.className);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // debug: expose toggle action logging
  const toggleWithLog = () => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      console.log('[ThemeProvider] toggling theme', t, '->', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle: toggleWithLog }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
