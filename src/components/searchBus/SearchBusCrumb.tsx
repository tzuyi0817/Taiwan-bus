import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';
import { createImageSrc } from '@/utils/images';
import { CITY_MAP } from '@/configs/city';

const MenuItem = tw.li`flex gap-[6px] items-center`;

function SearchBusCrumb() {
  const navigate = useNavigate();
  const city = useAppSelector(({ city }) => city.currentCity);

  return (
    <div className="px-6 py-3 bg-[#F8F8F8] flex justify-between items-center">
      <div className="flex gap-1 items-center" onClick={() => navigate('/')}>
        <img src={createImageSrc('icons/location.png')} alt="" />
        <p>{city ? CITY_MAP[city] : ''}</p>
      </div>
      <ul className="flex gap-3">
        <MenuItem>
          <img src={createImageSrc('icons/link.png')} alt="" width="10" />
          <p>複製連結</p>
        </MenuItem>
        <MenuItem>
          <img src={createImageSrc('icons/time.png')} alt="" width="12" />
          <p>時刻表</p>
        </MenuItem>
      </ul>
    </div>
  )
}

export default SearchBusCrumb;