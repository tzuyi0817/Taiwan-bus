import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useRedux';
import { cityActions } from '@/store/city';
import BusIcon from '@/components/common/BusIcon';
import IndexPopup from '@/components/index/IndexPopup';
import { CITY_OPTIONS } from '@/configs/city';
import type { City } from '@/types/city';

function IndexCities() {
  const [isShowPopup, togglePopup] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function selectCity(city: City | '') {
    if (!city) {
      return togglePopup(true);
    }
    dispatch(cityActions.updateCity(city));
    navigate('/searchbus');
  }

  return (
    <>
      <ul className="flex p-5 justify-center flex-wrap gap-5">
        {CITY_OPTIONS.map(({ id, value, name, en, color, fill }) => {
          return (
            <li
              key={id}
              className={`${color} p-5 bg-white flex flex-col justify-center items-center rounded-[10px] shadow-md min-w-[157px]`}
              onClick={() => selectCity(value)}
            >
              <BusIcon fill={fill} height="41" width="41" />
              <h4 className="mt-1">{name}</h4>
              <p>{en}</p>
            </li>
          )
        })}
      </ul>
      <IndexPopup isShowPopup={isShowPopup} togglePopup={togglePopup} selectCity={selectCity} />
    </>
  )
}

export default IndexCities;
