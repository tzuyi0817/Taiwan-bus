import { 
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
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
const MenuItem = 'block px-3 py-4 border-b-[1px] border-[#E7E7E7]';

interface HeaderMenuProps {
  isOpenMenu: boolean; 
  toggleMenu: Dispatch<SetStateAction<boolean>>;
}

function BusHeader() {
  const [isOpenMenu, toggleMenu] = useState(false);


  return (
    <Header>
      <Link to="/"><HeaderLogo /></Link>
      <div className="flex gap-5 items-center">
        <p>附近站牌</p>
        <img src={createImageSrc('icons/menu.png')} alt="" onClick={() => toggleMenu(true)} />
      </div>
      <HeaderMenu isOpenMenu={isOpenMenu} toggleMenu={toggleMenu} />
    </Header>
  )
}

function HeaderLogo() {
  return (
    <div className="flex gap-3 items-center">
      <img src={createImageSrc('images/logo-bus.svg')} alt="" className="w-10" />
      <div>
        <h4>台灣公車 e 點通</h4>
        <p>Taiwan Bus+</p>
      </div>
    </div>
  )
}

function HeaderMenu({ isOpenMenu, toggleMenu }: HeaderMenuProps) {
  function closeMenu() {
    toggleMenu(false);
  }

  return (
    <>
      <div className={`mask ${isOpenMenu ? 'fadeIn' : 'fadeOut'}`} onClick={closeMenu}></div>
      <div className={`bg-white fixed top-0 right-0 w-64 h-screen z-[9999] ${isOpenMenu ? 'block fadeIn' : 'fadeOut md:relative'}`}>
        <div className="flex p-5 items-center justify-between border-b-[1px] border-[#E7E7E7]">
          <HeaderLogo />
          <img src={createImageSrc('icons/close.png')} alt="" onClick={closeMenu} />
        </div>
        <ul onClick={closeMenu}>
          <li><Link to="/" className={MenuItem}>路線規劃</Link></li>
          <li><Link to="/" className={MenuItem}>站點查詢</Link></li>
          <li><Link to="/favoritestop" className={MenuItem}>我的收藏</Link></li>
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
