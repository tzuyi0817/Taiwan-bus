import { CITY_KEYS, CITY_CODE_MAP } from '@/configs/city';

export type City = typeof CITY_KEYS[number];
export type CityCode = keyof typeof CITY_CODE_MAP;
