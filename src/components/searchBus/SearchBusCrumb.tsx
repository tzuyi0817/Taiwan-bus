import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';
import { useBus } from '@/provider/BusProvider';
import { createImageSrc } from '@/utils/images';
import { CITY_MAP } from '@/configs/city';
import type { Page } from '@/types/page';

interface Props {
  page: Page;
}

const MenuItem = tw.li`flex gap-[6px] items-center cursor-pointer`;

function SearchBusCrumb({ page }: Props) {
  const navigate = useNavigate();
  const city = useAppSelector(({ city }) => city.currentCity);
  const { isOpenMap, toggleMap, setPage } = useBus();

  function goIndex() {
    navigate('/');
    setPage('route');
  }

  return (
    <div className="px-6 py-3 bg-[#F8F8F8] flex justify-between items-center">
      <div className="flex gap-1 items-center" onClick={goIndex}>
        <img src={createImageSrc('icons/location.png')} alt="" />
        <p>{city ? CITY_MAP[city] : ''}</p>
      </div>
      <ul className="flex gap-3">
        {page === 'detail' && !isOpenMap && (
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
      </ul>
    </div>
  )
}

export default SearchBusCrumb;
