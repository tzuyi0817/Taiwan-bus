import { 
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useTranslation } from 'react-i18next';
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
  md:px-20
  md:py-5
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
  const { t } = useTranslation();
  const { resetMap } = useBus();

  function goPage(path: string) {
    navigate(path);
    resetContext();
  }

  function resetContext() {
    resetMap(true);
    dispatch(cityActions.updateCity(''));
  }

  return (
    <Header>
      <HeaderLogo goPage={goPage} />
      <ul className="flex gap-5 items-center md:gap-14">
        <li className="text_link md:text-base">
          <NavLink
            to="/nearbyStop"
            onClick={resetContext}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {t('nearby_stop')}
          </NavLink>
        </li>
        <li className="text_link hidden md:block md:text-base">
          <NavLink to="/favoriteStop" onClick={resetContext}>
            {t('my_collection')}
          </NavLink>
        </li>
        <li className="md:hidden">
          <img src={createImageSrc('icons/menu.png')} alt="" onClick={() => toggleMenu(true)} />
        </li>
      </ul>
      <HeaderI18n propClass="hidden md:flex" />
      <HeaderMenu isOpenMenu={isOpenMenu} toggleMenu={toggleMenu} goPage={goPage} />
    </Header>
  )
}

function HeaderLogo({ goPage }: HeaderLogoProps) {
  const { t } = useTranslation();

  return (
    <div className="text_hover flex gap-3 items-center" onClick={() => goPage('/')}>
      <img src={createImageSrc('images/logo-bus.svg')} alt="" className="w-10" />
      <div>
        <h4>{t('website_name')}</h4>
        <p>Taiwan Bus+</p>
      </div>
    </div>
  )
}

function HeaderI18n({ propClass }: { propClass?: string }) {
  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = i18n;

  return (
    <div className={`justify-center items-center py-5 ${propClass} md:text-base`}>
      <img className="w-5 mr-1" src={createImageSrc('icons/language.png')} alt="" />
      <button 
        className={`text_hover mx-1 ${language === 'zh-TW' ? 'active' : ''}`}
        onClick={() => changeLanguage('zh-TW')}
      >
        {t('chinese')}
      </button>｜
      <button
        className={`text_hover mx-1 ${language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        {t('english')}
      </button>
    </div>
  )
}

function HeaderMenu({ isOpenMenu, toggleMenu, goPage }: HeaderMenuProps) {
  const { t } = useTranslation();

  function closeMenu() {
    toggleMenu(false);
  }

  return (
    <>
      <div className={`mask md:hidden ${isOpenMenu ? 'fadeIn' : 'fadeOut'}`} onClick={closeMenu}></div>
      <div className={`bg-white fixed top-0 right-0 w-64 h-screen z-[9999] md:hidden ${isOpenMenu ? 'block fadeIn' : 'fadeOut md:relative'}`}>
        <div className="flex p-5 items-center justify-between border-b-[1px] border-[#E7E7E7]" onClick={closeMenu}>
          <HeaderLogo goPage={goPage} />
          <img src={createImageSrc('icons/close.png')} alt="" />
        </div>
        <ul onClick={closeMenu}>
          {/* <MenuItem onClick={() => goPage('/')}>路線規劃</MenuItem>
          <MenuItem onClick={() => goPage('/searchStop')}>站點查詢</MenuItem> */}
          <MenuItem onClick={() => goPage('/favoriteStop')}>{t('my_collection')}</MenuItem>
        </ul>
        <HeaderI18n propClass="flex" />
      </div>
    </>
  )
}

export default BusHeader;
