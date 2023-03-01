import type { ReactNode, ChangeEvent, Dispatch, SetStateAction } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
  defaultValue: boolean;
  toggleSwitch: Dispatch<SetStateAction<boolean>>;
}

function SwitchBlock({ className, children, defaultValue, toggleSwitch }: Props) {
  function toggle(event: ChangeEvent<HTMLInputElement>) {
    toggleSwitch(event.target.checked);
  }

  return (
    <div className={`${className} flex justify-center items-center bg-white shadow rounded px-[14px] py-3 gap-[10px]`}>
      <p className="text-[#333333]">{children}</p>
      <label className="switch">
        <input type="checkbox" onChange={toggle} checked={defaultValue} />
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default SwitchBlock;
