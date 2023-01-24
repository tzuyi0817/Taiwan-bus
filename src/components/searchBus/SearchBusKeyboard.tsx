import {
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import {
  TAIPEI_KEYBOARD,
  TAOYUAN_KEYBOARD,
  TAICHUNG_KEYBOARD,
  TAINAN_KEYBOARD,
  KAOHSIUNG_KEYBOARD,
  COMMON_KEYBOARD,
} from '@/configs/keyboard';

interface Props {
  setKeyword: Dispatch<SetStateAction<string>>;
}

interface KeyboardProps {
  search: (value: string | number) => void;
  cols: string;
  keyboard: typeof TAIPEI_KEYBOARD | 
    typeof TAOYUAN_KEYBOARD | 
    typeof TAICHUNG_KEYBOARD | 
    typeof TAINAN_KEYBOARD | 
    typeof KAOHSIUNG_KEYBOARD | 
    typeof COMMON_KEYBOARD;
}

const keyboardMap = {
  Taipei: { keyboard: TAIPEI_KEYBOARD, cols: 'grid-cols-[repeat(5,56px)]' },
  Taoyuan: { keyboard: TAOYUAN_KEYBOARD, cols: 'grid-cols-[repeat(3,87px)]' },
  Taichung: { keyboard: TAICHUNG_KEYBOARD, cols: 'grid-cols-[repeat(3,87px)]' },
  Tainan: { keyboard: TAINAN_KEYBOARD, cols: 'grid-cols-[repeat(5,56px)]' },
  Kaohsiung: { keyboard: KAOHSIUNG_KEYBOARD, cols: 'grid-cols-[repeat(4,70px)]' },
  common: { keyboard: COMMON_KEYBOARD, cols: 'grid-cols-[repeat(3,87px)]' },
} as const;

function SearchBusKeyboard({ setKeyword }: Props) {
  const city = useAppSelector(({ city }) => city.currentCity);
  const { keyboard, cols } = keyboardMap[city as keyof typeof keyboardMap] ?? keyboardMap.common;

  function search(value: string | number) {
    if (value === '清除') return setKeyword('');
    setKeyword((keyword) => `${keyword}${value}`);
  }

  return (
    <div className="py-8 bg-gray-100">
      <Keyboard search={search} cols={cols} keyboard={keyboard} />
    </div>
  )
}

function Keyboard({ search, cols, keyboard }: KeyboardProps) {
  return (
    <ul className={`grid ${cols} gap-x-4 gap-y-3 place-content-center`}>
      {keyboard.map(({ value, color, bg }) => 
        <li
          className={`${color} ${bg} h-10 rounded-[10px] text-center leading-10 text-sm`}
          key={value}
          onClick={() => search(value)}
        >{value}</li>
      )}
    </ul>
  )
}

export default SearchBusKeyboard;
