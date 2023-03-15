import type { City } from '@/types/city';

export const CITY_OPTIONS = [
  { id: 0, name: '臺北市 / 新北市', en: 'Taipei / New Taipei', value: 'Taipei', color: 'text-blue-dark', fill: '#283C43' },
  { id: 1, name: '桃園市', en: 'Taoyuan', value: 'Taoyuan', color: 'text-blue', fill: '#3591C5' },
  { id: 2, name: '臺中市', en: 'Taichung', value: 'Taichung', color: 'text-secondary', fill: '#D08181' },
  { id: 3, name: '臺南市', en: 'Tainan', value: 'Tainan', color: 'text-green', fill: '#7FC0C5' },
  { id: 4, name: '高雄市', en: 'Kaohsiung', value: 'Kaohsiung', color: 'text-teal', fill: '#5E9BAE' },
  { id: 5, name: '其他地區', en: 'Other City', value: '', color: 'text-green-dark', fill: '#52797C' },
] as const;


export const CITY_MAP = {
  Keelung: '基隆市',
  Taipei: '臺北市、新北市',
  Yilan: '宜蘭縣',
  Taoyuan: '桃園市',
  Hsinchu: '新竹市、新竹縣',
  Hualien: '花蓮縣',
  Taitung: '臺東縣',
  Miaoli: '苗栗縣',
  Taichung: '臺中市',
  Changhua: '彰化縣',
  Nantou: '南投縣',
  Yunlin: '雲林縣',
  Chiayi: '嘉義市、嘉義縣',
  Tainan: '臺南市',
  Kaohsiung: '高雄市',
  Pingtung:'屏東縣',
  Penghu: '澎湖縣',
  Kinmen:'金門縣',
  Lianjiang:'連江縣',
} as const;

export const CITY_CODE_MAP = {
  TPE: 'Taipei',
} as const;

export const CITY_KEYS = Object.keys(CITY_MAP) as Array<City>;
