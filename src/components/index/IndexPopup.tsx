import type { Dispatch, SetStateAction } from 'react';
import Popup from '@/components/common/Popup';
import { CITY_KEYS, CITY_MAP } from '@/configs/city';
import type { City } from '@/types/city';

interface Props {
  isShowPopup: boolean;
  togglePopup: Dispatch<SetStateAction<boolean>>;
  selectCity: (city: City) => void;
}

const mainCities = ['Taipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung'];
const otherCities = CITY_KEYS.filter(city => !mainCities.includes(city));

function IndexPopup({ isShowPopup, togglePopup, selectCity }: Props) {
  function selectItem(city: City) {
    selectCity(city);
    togglePopup(false);
  }

  return (
    <Popup isShowPopup={isShowPopup} togglePopup={togglePopup} title="其他地區 Other City">
      <ul className=" flex flex-wrap gap-2 justify-center">
        {otherCities.map((city, index) => {
          return (
            <li
              key={index} 
              className="rounded-[10px] border-[1px] border-primary p-3 text-primary transition-colors cursor-pointer hover:text-white hover:bg-primary"
              onClick={() => selectItem(city)}
            >{CITY_MAP[city]}</li>
          )
        })}
      </ul>
    </Popup>
  )
}

export default IndexPopup;
