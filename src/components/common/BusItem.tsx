import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { favoriteActions } from '@/store/favorite';
import { favorite, favorite_active } from '@/configs/svg';
import type { Bus } from '@/types/bus';

interface Props {
  bus: Bus;
}

function BusItem({ bus }: Props) {
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(({ favorite }) => favorite.favoriteList) ?? [];
  const { RouteName, DepartureStopNameZh, DestinationStopNameZh, City } = bus;
  const isFavorite = !!(favoriteList.find(({ RouteID }) => RouteID === bus.RouteID));

  function toggleFavorite() {
    isFavorite
      ? dispatch(favoriteActions.removeFavorite(bus.RouteID))
      : dispatch(favoriteActions.addFavorite(bus));
  }

  return (
    <li className="flex justify-between items-end py-3 border-b-[1px] border-[#E7E7E7]">
      <div>
        <h1>{RouteName.Zh_tw}</h1>
        <p className="text-sm text-gray-600">{`${DepartureStopNameZh} - ${DestinationStopNameZh}`}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="svg favorite"
          onClick={toggleFavorite}
        >
          <path fill="#355F8B" d={isFavorite ? favorite_active : favorite} />
        </svg>
        <p className="text-sm text-gray-600">{City}</p>
      </div>
    </li>
  )
}

export default BusItem;
