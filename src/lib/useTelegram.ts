// src/lib/useTelegram.ts
import { useEffect, useState } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

interface TelegramUser {
  id: number;
  username: string;
  first_name: string;
  last_name?: string;
  photo_url?: string;
}

interface InitData {
  user?: TelegramUser;
  [key: string]: unknown;
}

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<InitData | null>(null);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const debug = (msg: string) => {
    console.log(msg);
    setDebugLog((prev) => [...prev, msg]);
  };

  useEffect(() => {
    try {
      
      const { initData, initDataRaw } = retrieveLaunchParams();

      debug(`📦 initDataRaw: ${initDataRaw}`);
      debug(`📦 initData: ${JSON.stringify(initData)}`);
// @ts-expect-error aaa
      if (initData?.user) {
        debug('✅ Telegram user data retrieved via SDK');
        // @ts-expect-error aaaa
        setUser(initData.user);
        // @ts-expect-error aaaaa
        setInitData(initData);
      } else {
        debug('❌ Telegram user data not found from SDK. Make sure you opened via Telegram');
      }
    } catch (e) {
      debug(`❌ Failed to retrieve launch params: ${(e as Error).message}`);
    }

    // Debug presence of Telegram WebApp SDK
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tg = (window as any).Telegram;
      const webApp = tg?.WebApp;
      debug(`🧠 window.Telegram: ${tg ? '✅ present' : '❌ missing'}`);
      debug(`🧩 Telegram.WebApp: ${webApp ? '✅ present' : '❌ missing'}`);
      debug(`📦 initDataUnsafe: ${webApp?.initDataUnsafe ? '✅ present' : '❌ missing'}`);
    }
  }, []);

  return { user, initData, debugLog };
};
