import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';
import { useAppDispatch } from '@/hooks/useRedux';
import { cityActions } from '@/store/city';
import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import BusPrompt from '@/components/common/BusPrompt';
import type { BusSite } from '@/types/bus';

interface Props {
  city?: string;
}

function FavoriteStopStation({ city }: Props) {
  const [favorites, setFavorites] = useState<BusSite[]>([]);
  const navigate = useNavigate();
  const { t, i18n: { language } } = useTranslation();
  const { isDesignateStop, setBus, setPage, setUpdateTime, setMapCenterPos, setMapZoom } = useBus();
  const favoriteSite = useAppSelector(({ favorite }) => favorite.favoriteSite);
  const dispatch = useAppDispatch();
  const isEnglish = language === 'en';

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
        const routeName = isEnglish ? stop.RouteName.En : stop.RouteName.Zh_tw;
        const destinationStop = isEnglish ? stop.DestinationStopNameEn : stop.DestinationStopNameZh;
        const departureStop = isEnglish ? stop.DepartureStopNameEn : stop.DepartureStopNameZh;
        const stopName = isEnglish ? stop.StopName.En : stop.StopName.Zh_tw;

        return (
          <li className="bus_info" key={stop.StopUID} onClick={() => redirectDetail(stop)}>
            <div className="bus_info_content py-[10px] pr-0 w-auto mx-5 md:mx-8">
              <div>
                <div className="flex gap-2 ellipsis items-center">
                  <h3 className="ellipsis">{routeName}</h3>
                  <span className="text-sm text-gray-600 text">
                    {t('to')} {stop.Direction === 0 ? destinationStop : departureStop}
                  </span>
                </div>
                <h2>{stopName}</h2>
              </div>
              <div className="flex flex-col items-end gap-1">
                <BusFavorite site={stop} type="site" />
                <p className="text-sm text-gray-600">{t(`city.${stop.City}`)}</p>
              </div>
            </div>
          </li>
        )
      })}
      {!favorites.length && <BusPrompt content={t('prompt.favorite_site')} />}
    </>
  )
}

export default FavoriteStopStation;
