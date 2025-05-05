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
  user: TelegramUser;
  themeParams?: {
    bg_color?: string;
    text_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
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
    const isDev = process.env.NODE_ENV === 'development';

    try {
      // Get initData from the SDK
      const result = retrieveLaunchParams();  // Retrieve launch params
      
      // Type assertion to tell TypeScript what structure to expect
      const telegramData = result.initData as unknown as InitData;

      if (telegramData?.user && !isDev) {
        debug('✅ Telegram user data retrieved using SDK');
        setUser(telegramData.user);
        setInitData(telegramData);
      } else if (isDev) {
        const mockUser: TelegramUser = {
          id: 1,
          username: 'dev_user',
          first_name: 'Developer',
        };
        debug('⚠️ Using mock user in development');
        setUser(mockUser);
        // Create a proper InitData object
        setInitData({ user: mockUser });
      } else {
        debug('❌ Telegram user data not found. Maybe not opened in Telegram?');
      }
    } catch (e) {
      debug(`❌ Failed to retrieve launch params: ${(e as Error).message}`);
    }
  }, []);

  return { user, initData, debugLog };
};