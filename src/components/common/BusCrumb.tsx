import type { Dispatch, SetStateAction } from 'react';
import tw from 'tailwind-styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { cityActions } from '@/store/city';
import { useBus } from '@/provider/BusProvider';
import { createImageSrc } from '@/utils/images';
import { BUS_CRUMB } from '@/configs/bus';
import { CITY_MAP } from '@/configs/city';
import type { Page } from '@/types/page';
import type { BusCrumbType } from '@/types/bus';

interface Props {
  page: Page;
}

interface CrumbMenuProps {
  page: Page;
  isOpenMap: boolean;
  pageName: BusCrumbType;
  toggleMap: Dispatch<SetStateAction<boolean>>;
}

const MenuItem = tw.li`text_hover flex gap-[6px] items-center`;

function BusCrumb({ page }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const city = useAppSelector(({ city }) => city.currentCity);
  const { isOpenMap, toggleMap, resetMap } = useBus();
  const pageName = pathname.replace('/', '') as BusCrumbType;

  function goIndex() {
    navigate('/');
    resetMap(true);
    dispatch(cityActions.updateCity(''));
  }

  return (
    <div className="px-6 py-3 bg-[#F8F8F8] flex justify-between items-center md:px-16">
      <div className="flex gap-1 items-center">
        {/* <img src={createImageSrc('icons/location.png')} alt="" /> */}
        <p>
          <span className="text_hover" onClick={goIndex}>首頁</span>
          <span> / </span>
          <span>{BUS_CRUMB[pageName] ?? ''}</span>
          {city ? CITY_MAP[city] : ''}
        </p>
      </div>
      <ul className="flex gap-3">
        <BusCrumbMenu 
          page={page} 
          pageName={pageName}
          isOpenMap={isOpenMap}
          toggleMap={toggleMap}
        />
      </ul>
    </div>
  )
}

function BusCrumbMenu({ page, pageName, isOpenMap, toggleMap }: CrumbMenuProps) {
  if (pageName === 'favoriteStop') return null;
  return <>
    {page === 'detail' && (
      <>
        <MenuItem>
          <img src={createImageSrc('icons/link.png')} alt="" width="10" />
          <p>複製連結</p>
        </MenuItem>
        <MenuItem>
          <img src={createImageSrc('icons/time.png')} alt="" width="12" />
          <p>時刻表</p>
        </MenuItem>
      </>
    )}
    {isOpenMap 
      ? <MenuItem onClick={() => toggleMap(false)}>
        <img src={createImageSrc('icons/route.png')} alt="" width="12" />
        <p>路線</p>
      </MenuItem>
      : <MenuItem onClick={() => toggleMap(true)}>
        <img src={createImageSrc('icons/map.png')} alt="" width="12" />
        <p>地圖</p>
      </MenuItem>
    }
  </>
}

export default BusCrumb;
