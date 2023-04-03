import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';
import { useAppDispatch } from '@/hooks/useRedux';
import { cityActions } from '@/store/city';
import BusItem from '@/components/common/BusItem';
import BusPrompt from '@/components/common/BusPrompt';
import type { Bus } from '@/types/bus';

interface Props {
  city?: string;
}

function FavoriteStopBus({ city }: Props) {
  const [favorites, setFavorites] = useState<Bus[]>([]);
  const navigate = useNavigate();
  const favoriteBus = useAppSelector(({ favorite }) => favorite.favoriteBus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const list = city 
      ? favoriteBus.filter(({ City }) => City === city)
      : favoriteBus;

    setFavorites(list);
  }, [city]);

  function redirectSearchBus({ City }: Bus) {
    dispatch(cityActions.updateCity(City));
    navigate('/searchBus');
  }

  return (
    <>
      {favorites.map(bus => {
        return <BusItem bus={bus} key={bus.RouteID} redirectDetailCallback={() => redirectSearchBus(bus)} />
      })}
      {!favorites.length && <BusPrompt content="目前暫無任何收藏收藏站牌" />}
    </>
  )
}

export default FavoriteStopBus;
