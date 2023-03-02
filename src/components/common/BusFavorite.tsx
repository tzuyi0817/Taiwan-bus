import { useState, useRef, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isShowPopup, togglePopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(({ favorite }) => favorite.favoriteList) ?? [];
  const popupType = useRef<'add' | 'remove'>('add');
  const isFavorite = favoriteList.some(({ RouteID }) => RouteID === bus?.RouteID);

  function toggleFavorite(event: MouseEvent) {
    if (!bus) return;
    event.stopPropagation();
    togglePopup(true);

    if (isFavorite) {
      popupType.current = 'remove';
      dispatch(favoriteActions.removeFavorite(bus.RouteID));
      return;
    }
    popupType.current = 'add';
    dispatch(favoriteActions.addFavorite(bus));
  }

  function togglePrompt(event: MouseEvent) {
    event.stopPropagation();
    togglePopup(isShow => !isShow);
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
        {popupType.current === 'add' 
          ? <Logo className="bg-green">✔</Logo>
          : <Logo className="bg-secondary">✖</Logo>
        }
        <h2 className="mt-6 mb-8 text-center">
          {popupType.current === 'add' ? '已' : '取消'}收藏站牌
        </h2>
        <div className="flex justify-center gap-2">
          <button className="btn_line" onClick={togglePrompt}>關閉</button>
          <button className="btn_base" onClick={() => navigate('/favoritestop')}>查看收藏</button>
        </div>
      </Popup>
    </>
  )
}

export default BusFavorite;
