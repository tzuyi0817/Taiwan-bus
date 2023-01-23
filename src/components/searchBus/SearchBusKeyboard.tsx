import {
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { TAIPEI_KEYBOARD, TAICHUNG_KEYBOARD } from '@/configs/keyboard';

interface Props {
  setKeyword: Dispatch<SetStateAction<string>>;
}

interface KeyboardProps {
  search: (value: string | number) => void;
}

function SearchBusKeyboard({ setKeyword }: Props) {
  const city = useAppSelector(({ city }) => city.currentCity);
  const isShowKeyboard = ['臺北市', '臺中市'].includes(city);

  function search(value: string | number) {
    if (value === '清除') return setKeyword('');
    setKeyword((keyword) => `${keyword}${value}`);
  }

  return (
    <>
      {isShowKeyboard && <div className="py-8 bg-gray-100">
        {city === '臺北市' && <TaipeiKeyboard search={search} />}
        {city === '臺中市' && <TaichungKeyboard search={search} />}
      </div>}
    </>
  )
}

function TaipeiKeyboard({ search }: KeyboardProps) {
  return (
    <ul className="grid grid-cols-[repeat(5,56px)] gap-3 place-content-center">
      {TAIPEI_KEYBOARD.map(({ value, color, bg }) => 
        <li
          className={`${color} ${bg} w-14 h-10 rounded-[10px] text-center leading-10 text-sm`}
          onClick={() => search(value)}
        >{value}</li>
      )}
    </ul>
  )
}

function TaichungKeyboard({ search }: KeyboardProps) {
  return (
    <ul className="grid grid-cols-[repeat(3,87px)] gap-x-4 gap-y-3 place-content-center">
      {TAICHUNG_KEYBOARD.map(({ value, color, bg }) => 
        <li
          className={`${color} ${bg} w-[87px] h-10 rounded-[10px] text-center leading-10 text-sm`}
          onClick={() => search(value)}
        >{value}</li>
      )}
    </ul>
  )
}

export default SearchBusKeyboard;
