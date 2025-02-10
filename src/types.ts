import { translations } from './i18n/translations';

export interface FormData {
  color: 'red' | 'blue';
  size: 'small' | 'large';
  shape: 'circle' | 'square';
  texture: 'smooth' | 'rough';
}

export interface Proof {
  isValid: boolean | null;
  publicSignals?: any[];
  proof?: any;
}

export type Translations = typeof translations;
export type Language = keyof typeof translations;