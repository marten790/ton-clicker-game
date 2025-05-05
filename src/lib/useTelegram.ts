import { useEffect, useState } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

// Define a proper interface for the SDK response
interface SDKInitData {
  user?: {
    id: number;
    username: string;
    first_name: string;
    last_name?: string;
    photo_url?: string;
  };
  theme_params?: {
    bg_color: string;
    text_color: string;
    button_color: string;
    button_text_color: string;
  };
  themeParams?: {
    bg_color: string;
    text_color: string;
    button_color: string;
    button_text_color: string;
  };
}

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
      // Try to get data from SDK first
      const result = retrieveLaunchParams();
      
      // Type assertion to tell TypeScript what structure to expect
      const sdkData = result.initData as unknown as SDKInitData;
      
      if (sdkData?.user && !isDev) {
        debug('✅ Telegram user data retrieved from SDK');
        const tgUser = sdkData.user;
        setUser(tgUser);
        
        // Map SDK data to our InitData interface
        const data: InitData = {
          user: tgUser,
          themeParams: sdkData.theme_params || sdkData.themeParams
        };
        
        setInitData(data);
        
        // Since we successfully got data from the SDK, notify the WebApp it's ready
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          window.Telegram.WebApp.ready();
        }
      } else if (isDev) {
        const mockUser: TelegramUser = {
          id: 1234567890,
          username: 'dev_user',
          first_name: 'Developer',
          last_name: 'Test',
          photo_url: 'https://example.com/photo.jpg'
        };
        debug('⚠️ Using mock user in development');
        setUser(mockUser);
        // Create a proper InitData object
        setInitData({ user: mockUser });
      } else {
        debug('❌ Telegram user data not found from SDK. Make sure you\'re opening this app from inside Telegram.');
      }
    } catch (e) {
      debug(`❌ Error with SDK: ${(e as Error).message}`);
      
      // Fallback to window object if SDK fails
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        try {
          const webApp = window.Telegram.WebApp;
          if (webApp.initDataUnsafe?.user && !isDev) {
            debug('✅ Fallback: Telegram user data retrieved from window.Telegram.WebApp');
            const tgUser = webApp.initDataUnsafe.user;
            setUser(tgUser);
            
            // Create proper InitData object
            const data: InitData = {
              user: tgUser,
              themeParams: webApp.initDataUnsafe.theme_params 
                ? {
                    bg_color: webApp.initDataUnsafe.theme_params.bg_color,
                    text_color: webApp.initDataUnsafe.theme_params.text_color,
                    button_color: webApp.initDataUnsafe.theme_params.button_color,
                    button_text_color: webApp.initDataUnsafe.theme_params.button_text_color,
                  }
                : undefined
            };
            
            setInitData(data);
            webApp.ready();
          }
        } catch (fallbackError) {
          debug(`❌ Fallback also failed: ${(fallbackError as Error).message}`);
        }
      }
    }
  }, []);

  return { user, initData, debugLog };
};