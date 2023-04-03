import { useAppSelector } from '@/hooks/useRedux';
import BusItem from '@/components/common/BusItem';
import BusPrompt from '@/components/common/BusPrompt';


function FavoriteStopBus() {
  const favoriteBus = useAppSelector(({ favorite }) => favorite.favoriteBus);

  return (
    <>
      {favoriteBus.map(bus => <BusItem bus={bus} key={bus.RouteID} />)}
      {!favoriteBus.length && <BusPrompt content="目前暫無任何收藏收藏站牌" />}
    </>
  )
}

export default FavoriteStopBus;
