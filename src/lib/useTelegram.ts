import { useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  username: string;
  first_name: string;
  last_name?: string;
  photo_url?: string;
}

interface InitData {
  user: TelegramUser;
  themeParams?: {
    bg_color?: string;
    text_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
}

export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe?: InitData;
        expand?: () => void;
        ready?: () => void;
      };
    };
  }
}

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<InitData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tg = window.Telegram?.WebApp;

      if (tg?.initDataUnsafe?.user) {
        console.log('✅ Found Telegram user:', tg.initDataUnsafe.user);
        setUser(tg.initDataUnsafe.user);
        setInitData(tg.initDataUnsafe);
        tg.expand?.();
        tg.ready?.();
      } else {
        console.error('❌ Telegram user data not found. Make sure app is opened via Telegram.');
      }
    }
  }, []);

  return { user, initData };
};
