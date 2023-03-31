import type { City } from '@/types/city';

export const CITY_OPTIONS = [
  { id: 0, name: '臺北市 / 新北市', en: 'Taipei / NewTaipei', value: 'Taipei', color: 'text-blue-dark', fill: '#283C43' },
  { id: 1, name: '桃園市', en: 'Taoyuan', value: 'Taoyuan', color: 'text-blue', fill: '#3591C5' },
  { id: 2, name: '臺中市', en: 'Taichung', value: 'Taichung', color: 'text-secondary', fill: '#D08181' },
  { id: 3, name: '臺南市', en: 'Tainan', value: 'Tainan', color: 'text-green', fill: '#7FC0C5' },
  { id: 4, name: '高雄市', en: 'Kaohsiung', value: 'Kaohsiung', color: 'text-teal', fill: '#5E9BAE' },
  { id: 5, name: '其他地區', en: 'Other City', value: '', color: 'text-green-dark', fill: '#52797C' },
] as const;

export const CITY_SELECT_OPTIONS = [
  { value: 'Keelung', label: '基隆市' },
  { value: 'Taipei', label: '臺北市' },
  { value: 'NewTaipei', label: '新北市' },
  { value: 'YilanCountry', label: '宜蘭縣' },
  { value: 'Taoyuan', label: '桃園市' },
  { value: 'Hsinchu', label: '新竹市' },
  { value: 'HsinchuCountry', label: '新竹縣' },
  { value: 'HualienCountry', label: '花蓮縣' },
  { value: 'TaitungCountry', label: '臺東縣' },
  { value: 'MiaoliCountry', label: '苗栗縣' },
  { value: 'Taichung', label: '臺中市' },
  { value: 'ChanghuaCountry', label: '彰化縣' },
  { value: 'NantouCountry', label: '南投縣' },
  { value: 'YunlinCountry', label: '雲林縣' },
  { value: 'Chiayi', label: '嘉義市' },
  { value: 'ChiayiCountry', label: '嘉義縣' },
  { value: 'Tainan', label: '臺南市' },
  { value: 'Kaohsiung', label: '高雄市' },
  { value: 'PingtungCountry', label: '屏東縣' },
  { value: 'PenghuCountry', label: '澎湖縣' },
  { value: 'KinmenCountry', label: '金門縣' },
  { value: 'LianjiangCountry', label: '連江縣' },
];


export const CITY_MAP = {
  Keelung: '基隆市',
  Taipei: '臺北市、新北市',
  NewTaipei: '新北市',
  YilanCountry: '宜蘭縣',
  Taoyuan: '桃園市',
  Hsinchu: '新竹市',
  HsinchuCountry: '新竹縣',
  HualienCountry: '花蓮縣',
  TaitungCountry: '臺東縣',
  MiaoliCountry: '苗栗縣',
  Taichung: '臺中市',
  ChanghuaCountry: '彰化縣',
  NantouCountry: '南投縣',
  YunlinCountry: '雲林縣',
  Chiayi: '嘉義市',
  ChiayiCountry: '嘉義縣',
  Tainan: '臺南市',
  Kaohsiung: '高雄市',
  PingtungCountry:'屏東縣',
  PenghuCountry: '澎湖縣',
  KinmenCountry:'金門縣',
  LianjiangCountry:'連江縣',
} as const;

export const CITY_CODE_MAP = {
  TPE: 'Taipei',
} as const;

export const CITY_KEYS = Object.keys(CITY_MAP) as Array<City>;
