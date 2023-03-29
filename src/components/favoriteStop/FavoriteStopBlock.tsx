import { useState } from 'react';
import BusTab from '@/components/common/BusTab';
import { FavoriteTypeEnum } from '@/configs/favorite';

const TAB_OPTIONS = [
  { title: '收藏站牌', value: FavoriteTypeEnum.STOP },
  { title: '收藏站點', value: FavoriteTypeEnum.STATION },
];

function FavoriteStopBlock() {
  const [type, setType] = useState(FavoriteTypeEnum.STOP);


  return (
    <div className="bus_block">
      <div className="shadow-lg h-full">
        <BusTab options={TAB_OPTIONS} value={type} toggleTab={setType} />
      </div>
    </div>
  )
}

export default FavoriteStopBlock;
