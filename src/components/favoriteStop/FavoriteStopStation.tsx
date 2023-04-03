import { useState, useEffect } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import BusFavorite from '@/components/common/BusFavorite';
import BusPrompt from '@/components/common/BusPrompt';
import { CITY_ABRIDGE_MAP } from '@/configs/city';
import type { BusSite } from '@/types/bus';

interface Props {
  city?: string;
}

function FavoriteStopStation({ city }: Props) {
  const [favorites, setFavorites] = useState<BusSite[]>([]);
  const favoriteSite = useAppSelector(({ favorite }) => favorite.favoriteSite);

  useEffect(() => {
    const list = city 
      ? favoriteSite.filter(({ City }) => City === city)
      : favoriteSite;

    setFavorites(list);
  }, [city]);

  function redirectDetail(stop: BusSite) {
    console.log({ stop });
  }

  return (
    <>
      {favorites.map(stop => {
        return (
          <li className="bus_info py-3 px-0 mx-0" key={stop.StopUID} onClick={() => redirectDetail(stop)}>
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
          </li>
        )
      })}
      {!favorites.length && <BusPrompt content="目前暫無任何收藏收藏站點" />}
    </>
  )
}

export default FavoriteStopStation;
