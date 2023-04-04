import type { Dispatch, SetStateAction } from 'react';
import { useBus } from '@/provider/BusProvider';
import { createImageSrc } from '@/utils/images';

interface Props {
  animationTime: number;
  setAnimationTime: Dispatch<SetStateAction<number>>;
}

function SearchBusTimer({ animationTime, setAnimationTime }: Props) {
  const { updateTime, setUpdateTime } = useBus();

  function update() {
    setUpdateTime(0);
    setAnimationTime(0);
  }

  return (
    <div className="absolute px-6 py-3 bottom-0 bg-white w-full border-t-[1px] text-sm flex justify-between items-center z-[3]">
      <p>{updateTime} 秒後更新</p>
      <div className="flex items-center gap-2" onClick={update}>
        <img src={createImageSrc('icons/immediate.png')} alt="" />
        <p>立即更新</p>
      </div>
      {animationTime && <div className="absolute top-0 left-0 border-t-2 border-primary animate-[timer_31s_linear]"></div>}
    </div>
  )
}

export default SearchBusTimer;
