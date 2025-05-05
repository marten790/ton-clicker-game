// global.d.ts - Place this file in your project root
interface Window {
  Telegram: {
    WebApp: {
      initDataUnsafe: {
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
      };
      ready: () => void;
      expand: () => void;
      isExpanded: boolean;
    };
  } | undefined;
}
export interface Player {
  coins: number;
  damage: number;
  armor: number;
  health: number;
  maxHealth: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
}

export interface Enemy {
  id: number;
  name: string;
  health: number;
  maxHealth: number;
  damage: number;
  coins: number;
  experience: number;
}

export interface Item {
  id: number;
  name: string;
  type: 'armor' | 'damage';
  value: number;
  cost: number;
  description: string;
}