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

declare global {
  interface Window {
    Telegram: {
      WebApp?: {
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

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
  
    const debug = (msg: string) => {
      console.log(msg);
      setDebugLog((prev) => [...prev, msg]);
    };
  
    const checkTelegram = () => {
      const tg = window.Telegram;
      const webApp = tg?.WebApp;
  
      debug(`window.Telegram: ${tg ? '✅ present' : '❌ missing'}`);
      debug(`window.Telegram.WebApp: ${webApp ? '✅ present' : '❌ missing'}`);
      debug(
        `window.Telegram.WebApp.initDataUnsafe: ${
          webApp?.initDataUnsafe ? '✅ present' : '❌ missing'
        }`
      );
  
      // ✅ Log the full object for visibility
      if (tg) {
        try {
          debug(`🧠 Telegram Object: ${JSON.stringify(tg)}`);
        } catch {
          debug('🧠 Telegram Object: [Could not stringify]');
        }
      }
  
      if (webApp?.initDataUnsafe?.user && !isDev) {
        debug('✅ Telegram user data found');
        setUser(webApp.initDataUnsafe.user);
        setInitData(webApp.initDataUnsafe);
        webApp.expand?.();
        webApp.ready?.();
      } else if (isDev) {
        const mockUser: TelegramUser = {
          id: 1,
          username: 'dev_user',
          first_name: 'Developer',
        };
        debug('⚠️ Using mock user in development');
        setUser(mockUser);
        setInitData({ user: mockUser });
      } else {
        debug('❌ Telegram user data not found. Open via Telegram.');
      }
    };
  
    if (typeof window !== 'undefined') {
      checkTelegram();
      setTimeout(checkTelegram, 1000); // Retry after delay
    }
  }, []);
  
  

  return { user, initData, debugLog };
};
