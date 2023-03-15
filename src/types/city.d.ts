import { CITY_MAP, CITY_CODE_MAP } from '@/configs/city';

export type City = keyof typeof CITY_MAP;
export type CityCode = keyof typeof CITY_CODE_MAP;
