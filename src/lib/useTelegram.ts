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
  themeParams: {
    bg_color: string;
    text_color: string;
    button_color: string;
    button_text_color: string;
  };
}
export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<InitData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe) {
      const tg = window.Telegram.WebApp;
      setUser(tg.initDataUnsafe.user);
      setInitData(tg.initDataUnsafe);
      tg.expand();
      tg.ready();
    }
  }, []);

  return { user, initData };
};
