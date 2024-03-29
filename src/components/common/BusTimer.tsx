import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useBus } from '@/provider/BusProvider';
import { createImageSrc } from '@/utils/images';

interface Props {
  animationTime: number;
  setAnimationTime: Dispatch<SetStateAction<number>>;
}

function BusTimer({ animationTime, setAnimationTime }: Props) {
  const { t } = useTranslation();
  const { updateTime, setUpdateTime } = useBus();

  function update() {
    setUpdateTime(0);
    setAnimationTime(0);
  }

  return (
    <div className="absolute px-6 py-3 bottom-0 bg-white w-full border-t-[1px] text-sm flex justify-between items-center z-[3]">
      <p>{updateTime} {t('seconds_update')}</p>
      <div className="text_hover flex items-center gap-2" onClick={update}>
        <img src={createImageSrc('icons/immediate.png')} alt="" />
        <p>{t('update_immediately')}</p>
      </div>
      {animationTime && <div className="absolute top-0 left-0 border-t-2 border-primary animate-[timer_31s_linear]"></div>}
    </div>
  )
}

export default BusTimer;
