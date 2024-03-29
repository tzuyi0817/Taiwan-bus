export type Language = 'en' | 'zh-TW';

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface SelectOption {
  value: string;
  label: string;
}
