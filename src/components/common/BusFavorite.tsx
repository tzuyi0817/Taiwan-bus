import { useState } from 'react';
import tw from 'tailwind-styled-components';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import Popup from '@/components/common/Popup';
import { favoriteActions } from '@/store/favorite';
import { favorite, favorite_active } from '@/configs/svg';
import type { Bus } from '@/types/bus';

interface Props {
  bus?: Bus;
}

const Logo = tw.div`rounded-full w-16 h-16 text-white text-4xl flex justify-center items-center m-auto`;

function BusFavorite({ bus }: Props) {
  const [isShowPopup, togglePopup] = useState(true);
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(({ favorite }) => favorite.favoriteList) ?? [];
  const isFavorite = !!(favoriteList.find(({ RouteID }) => RouteID === bus?.RouteID));

  function toggleFavorite() {
    if (!bus) return;
    
    isFavorite
      ? dispatch(favoriteActions.removeFavorite(bus.RouteID))
      : dispatch(favoriteActions.addFavorite(bus));
  }

  function togglePrompt() {
    togglePopup(false);
  }

  return (
    <>
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
      <Popup isShowPopup={isShowPopup} togglePopup={togglePopup}>
        <Logo className={`bg-green`}>✔</Logo>
        {/* <div>✖</div> */}
        <h2 className="mt-6 mb-8 text-center">已收藏站牌</h2>
        <div className="flex justify-center gap-2">
          <button className="btn_line" onClick={togglePrompt}>關閉</button>
          <button className="btn_base">查看收藏</button>
        </div>
      </Popup>
    </>
  )
}

export default BusFavorite;
