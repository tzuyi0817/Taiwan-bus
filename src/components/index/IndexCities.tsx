import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';
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
  const citiesRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const cities = citiesRef.current?.children;

    cities && Array.from(cities).forEach(element => {
      const cityElement = element as HTMLLIElement;

      VanillaTilt.init(cityElement, {
        max: 25,
        scale: 1,
        speed: 1000,
      });
    });
  }, []);

  function selectCity(city: City | '') {
    if (!city) {
      return togglePopup(true);
    }
    dispatch(cityActions.updateCity(city));
    navigate('/searchBus');
  }

  return (
    <>
      <ul ref={citiesRef} className="flex p-5 justify-center flex-wrap gap-5 md:grid md:grid-cols-6 md:h-[217px]">
        {CITY_OPTIONS.map(({ id, value, name, en, color, fill }) => {
          return (
            <li
              key={id}
              className={`${color} p-5 bg-white flex flex-col justify-center items-center rounded-[10px] shadow-md min-w-[157px] cursor-pointer`}
              onClick={() => selectCity(value)}
            >
              <div className="md:scale-125">
                <BusIcon fill={fill} height="41" width="41" />
              </div>
              <h4 className="mt-1 md:mt-3">{name}</h4>
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
