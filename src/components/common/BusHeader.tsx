import { 
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useAppDispatch } from '@/hooks/useRedux';
import { cityActions } from '@/store/city';
import { useBus } from '@/provider/BusProvider';
import { createImageSrc } from '@/utils/images';

const Header = tw.header`
  fixed
  top-0
  right-0
  w-full
  flex
  px-6
  py-4
  h-[72px]
  shadow-md
  items-center
  justify-between
  bg-white
  z-[9999]
  transition-all
`;
const MenuItem =  tw.li`block px-3 py-4 border-b-[1px] border-[#E7E7E7]`;

interface HeaderLogoProps {
  goPage: (path: string) => void;
}

interface HeaderMenuProps extends HeaderLogoProps {
  isOpenMenu: boolean; 
  toggleMenu: Dispatch<SetStateAction<boolean>>;
}

function BusHeader() {
  const [isOpenMenu, toggleMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resetMap } = useBus();

  function goPage(path: string) {
    navigate(path);
    resetMap(true);
    dispatch(cityActions.updateCity(''));
  }

  return (
    <Header>
      <HeaderLogo goPage={goPage} />
      <div className="flex gap-5 items-center">
        <p onClick={() => goPage('/nearbyStop')}>附近站牌</p>
        <img src={createImageSrc('icons/menu.png')} alt="" onClick={() => toggleMenu(true)} />
      </div>
      <HeaderMenu isOpenMenu={isOpenMenu} toggleMenu={toggleMenu} goPage={goPage} />
    </Header>
  )
}

function HeaderLogo({ goPage }: HeaderLogoProps) {
  return (
    <div className="flex gap-3 items-center" onClick={() => goPage('/')}>
      <img src={createImageSrc('images/logo-bus.svg')} alt="" className="w-10" />
      <div>
        <h4>台灣公車 e 點通</h4>
        <p>Taiwan Bus+</p>
      </div>
    </div>
  )
}

function HeaderMenu({ isOpenMenu, toggleMenu, goPage }: HeaderMenuProps) {
  function closeMenu() {
    toggleMenu(false);
  }

  return (
    <>
      <div className={`mask ${isOpenMenu ? 'fadeIn' : 'fadeOut'}`} onClick={closeMenu}></div>
      <div className={`bg-white fixed top-0 right-0 w-64 h-screen z-[9999] ${isOpenMenu ? 'block fadeIn' : 'fadeOut md:relative'}`}>
        <div className="flex p-5 items-center justify-between border-b-[1px] border-[#E7E7E7]" onClick={closeMenu}>
          <HeaderLogo goPage={goPage} />
          <img src={createImageSrc('icons/close.png')} alt="" />
        </div>
        <ul onClick={closeMenu}>
          <MenuItem onClick={() => goPage('/')}>路線規劃</MenuItem>
          <MenuItem onClick={() => goPage('/searchStop')}>站點查詢</MenuItem>
          <MenuItem onClick={() => goPage('/favoriteStop')}>我的收藏</MenuItem>
        </ul>
        <div className="flex justify-center py-5">
          <img src={createImageSrc('icons/language.png')} alt="" />
          <button className="font-bold ml-2 mr-1">中文</button>｜
          <button className="mx-1">英文</button>
        </div>
      </div>
    </>
  )
}

export default BusHeader;
