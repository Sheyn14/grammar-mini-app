'use client';

import { useEffect, useState } from 'react';
import { initTelegramApp } from '@/utils/telegram';

export const useTelegram = () => {
  const [tg, setTg] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const initApp = async () => {
      // Wait for Telegram script to load
      if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          const telegramApp = initTelegramApp();
          if (telegramApp) {
            setTg(telegramApp);
            setUser(telegramApp.initDataUnsafe?.user);
          }
        };
      }
    };

    initApp();
  }, []);

  return { tg, user };
};
