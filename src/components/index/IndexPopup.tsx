import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import Popup from '@/components/common/Popup';
import { CITY_KEYS } from '@/configs/city';
import type { City } from '@/types/city';

interface Props {
  isShowPopup: boolean;
  togglePopup: Dispatch<SetStateAction<boolean>>;
  selectCity: (city: City) => void;
}

const mainCities = ['Taipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung'];
const otherCities = CITY_KEYS.filter(city => !mainCities.includes(city));

function IndexPopup({ isShowPopup, togglePopup, selectCity }: Props) {
  const { t } = useTranslation();

  function selectItem(city: City) {
    selectCity(city);
    togglePopup(false);
  }

  return (
    <Popup isShowPopup={isShowPopup} togglePopup={togglePopup} title={t('other_city')}>
      <ul className="flex flex-wrap gap-2 justify-center">
        {otherCities.map((city, index) => {
          return (
            <li
              key={index} 
              className="btn_frame"
              onClick={() => selectItem(city)}
            >
              {t(`city.${city}`)}
            </li>
          )
        })}
      </ul>
    </Popup>
  )
}

export default IndexPopup;
