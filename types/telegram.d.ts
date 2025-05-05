// types/telegram.d.ts
export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: any;
        expand: () => void;
        ready: () => void;
        close: () => void;
        sendData: (data: string) => void;
        themeParams: {
          bg_color: string;
          text_color: string;
          button_color: string;
          button_text_color: string;
        };
        version: string;
        platform: string;
        colorScheme: 'light' | 'dark';
      };
    };
  }
}
