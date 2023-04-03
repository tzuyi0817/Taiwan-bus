import { useState, useEffect } from 'react';
import BusTab from '@/components/common/BusTab';
import SearchSelect from '@/components/common/SearchSelect';
import FavoriteStopBus from '@/components/favoriteStop/FavoriteStopBus';
import FavoriteStopStation from '@/components/favoriteStop/FavoriteStopStation';
import { CITY_SELECT_OPTIONS } from '@/configs/city';
import { FavoriteTypeEnum } from '@/configs/favorite';
import type { SelectOption } from '@/types/common';

const TAB_OPTIONS = [
  { title: '收藏站牌', value: FavoriteTypeEnum.STOP },
  { title: '收藏站點', value: FavoriteTypeEnum.STATION },
];

function FavoriteStopBlock() {
  const [type, setType] = useState(FavoriteTypeEnum.STOP);
  const [selectedOption, setSelectedOption] = useState<SelectOption>();

  useEffect(() => {
    const siteUrl = window.location.search;
    const pageType = new URLSearchParams(siteUrl).get('type');

    if (!pageType) return;
    setType(+pageType);
  }, []);

  return (
    <div className="h-full bg-white">
      <div className="shadow h-full flex flex-col gap-5 items-center">
        <BusTab options={TAB_OPTIONS} value={type} toggleTab={setType} />
        <SearchSelect
          defaultValue={selectedOption}
          onChange={(select: SelectOption) => setSelectedOption(select)}
          options={CITY_SELECT_OPTIONS}
        />
        <ul className="w-full px-5 pb-5 overflow-y-auto h-[calc(100%-148px)]">
          {type === FavoriteTypeEnum.STOP 
            ? <FavoriteStopBus city={selectedOption?.value} /> 
            : <FavoriteStopStation city={selectedOption?.value} />
          }
        </ul>
      </div>
    </div>
  )
}

export default FavoriteStopBlock;
