import type { Dispatch, SetStateAction, ReactNode, MouseEvent } from 'react';

interface Props {
  isShowPopup: boolean;
  togglePopup: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title?: string | null;
}

function Popup({ isShowPopup, togglePopup, children, title = '' }: Props) {
  function closePopup(event: MouseEvent) {
    event.stopPropagation();
    togglePopup(false);
  }

  return (
    <>
      <div className={`mask ${isShowPopup ? 'fadeIn' : 'fadeOut'}`} onClick={closePopup}></div>
      <div className={`popup ${isShowPopup ? 'fadeIn' : 'fadeOut'}`}>
        {title && <h3 className="popup_title">{title}</h3>}
        <div className="popup_content">{children}</div>
      </div>
    </>
  )
}

export default Popup;
