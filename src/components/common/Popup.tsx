import type { Dispatch, SetStateAction, ReactNode } from 'react';

interface Props {
  isShowPopup: boolean;
  togglePopup: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title?: string;
}

function Popup({ isShowPopup, togglePopup, children, title = '' }: Props) {
  return (
    <>
      <div className={`mask ${isShowPopup ? 'fadeIn' : 'fadeOut'}`} onClick={() => togglePopup(false)}></div>
      <div className={`popup ${isShowPopup ? 'fadeIn' : 'fadeOut'}`}>
        {title && <h3 className="popup_title">{title}</h3>}
        <div className="popup_content">{children}</div>
      </div>
    </>
  )
}

export default Popup;
