import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { favoriteActions } from '@/store/favorite';
import { favorite, favorite_active } from '@/configs/svg';
import type { Bus } from '@/types/bus';

interface Props {
  bus?: Bus;
}

function BusFavorite({ bus }: Props) {
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(({ favorite }) => favorite.favoriteList) ?? [];
  const isFavorite = !!(favoriteList.find(({ RouteID }) => RouteID === bus?.RouteID));

  function toggleFavorite() {
    if (!bus) return;
    isFavorite
      ? dispatch(favoriteActions.removeFavorite(bus.RouteID))
      : dispatch(favoriteActions.addFavorite(bus));
  }

  return (
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
  )
}

export default BusFavorite;
