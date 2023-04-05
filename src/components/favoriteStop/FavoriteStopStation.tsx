import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';
import { useAppDispatch } from '@/hooks/useRedux';
import { cityActions } from '@/store/city';
import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import BusPrompt from '@/components/common/BusPrompt';
import { CITY_ABRIDGE_MAP } from '@/configs/city';
import type { BusSite } from '@/types/bus';

interface Props {
  city?: string;
}

function FavoriteStopStation({ city }: Props) {
  const [favorites, setFavorites] = useState<BusSite[]>([]);
  const navigate = useNavigate();
  const { isDesignateStop, setBus, setPage, setUpdateTime, setMapCenterPos, setMapZoom } = useBus();
  const favoriteSite = useAppSelector(({ favorite }) => favorite.favoriteSite);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const list = city 
      ? favoriteSite.filter(({ City }) => City === city)
      : favoriteSite;

    setFavorites(list);
  }, [city, favoriteSite]);

  function redirectDetail(stop: BusSite) {
    const { StationPosition: { PositionLat, PositionLon }} = stop;

    isDesignateStop.current = true;
    dispatch(cityActions.updateCity(stop.City));
    navigate('/searchBus');
    setBus(stop);
    setPage('detail');
    setUpdateTime(0);
    setMapCenterPos([PositionLat, PositionLon]);
    setMapZoom(17);
  }

  return (
    <>
      {favorites.map(stop => {
        return (
          <li className="bus_info" key={stop.StopUID} onClick={() => redirectDetail(stop)}>
            <div className="bus_info_content py-[10px] pr-0 w-auto mx-5 md:mx-8">
              <div>
                <div className="flex gap-2 ellipsis items-center">
                  <h3 className="ellipsis">{stop.RouteName.Zh_tw}</h3>
                  <span className="text-sm text-gray-600 text">
                    往 {stop.Direction === 0 ? stop.DestinationStopNameZh : stop.DepartureStopNameZh}
                  </span>
                </div>
                <h2>{stop.StationName.Zh_tw}</h2>
              </div>
              <div className="flex flex-col items-end gap-1">
                <BusFavorite site={stop} type="site" />
                <p className="text-sm text-gray-600">{CITY_ABRIDGE_MAP[stop.City]}</p>
              </div>
            </div>
          </li>
        )
      })}
      {!favorites.length && <BusPrompt content="目前暫無任何收藏站點" />}
    </>
  )
}

export default FavoriteStopStation;
