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
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const log = (msg: string) => {
    setDebugLog(prev => [...prev, msg]);
  };

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';

    if (typeof window !== 'undefined') {
      if (!window.Telegram || !window.Telegram.WebApp) {
        log('❌ window.Telegram or window.Telegram.WebApp not available');
        return;
      }

      const tg = window.Telegram.WebApp;

      if (tg.initDataUnsafe?.user && !isDev) {
        log('✅ Telegram user data found');
        setUser(tg.initDataUnsafe.user);
        setInitData(tg.initDataUnsafe);
        tg.expand?.();
        tg.ready?.();
      } else if (isDev) {
        const mockUser: TelegramUser = {
          id: 1,
          username: 'dev_user',
          first_name: 'Developer',
        };
        log('⚠️ Using mock user in development');
        setUser(mockUser);
        setInitData({ user: mockUser });
      } else {
        log('❌ Telegram user data not found. Open the app via Telegram.');
      }
    }
  }, []);

  return { user, initData, debugLog };
};
