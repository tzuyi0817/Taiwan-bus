import tw from 'tailwind-styled-components';
import { useAppSelector } from '@/hooks/useRedux';
import { createImageSrc } from '@/utils/images';

const MenuItem = tw.li`flex gap-[6px] items-center`;

function SearchBusCrumb() {
  const city = useAppSelector(({ city }) => city.currentCity);

  return (
    <div className="px-6 py-3 bg-[#F8F8F8] flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <img src={createImageSrc('icons/location.png')} alt="" />
        <p>{city}</p>
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