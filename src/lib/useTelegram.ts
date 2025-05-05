import { useEffect, useState } from 'react';

export const useTelegram = () => {
  const [user, setUser] = useState<any>(null);
  const [initData, setInitData] = useState<any>(null);

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
