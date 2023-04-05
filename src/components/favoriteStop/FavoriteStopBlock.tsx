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
    const params = new URLSearchParams(window.location.search);
    const pageType = params.get('type');

    if (!pageType) return;
    setType(+pageType);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  return (
    <div className="h-full bg-white">
      <div className="favorite_block">
        <BusTab options={TAB_OPTIONS} value={type} toggleTab={setType} />
        <SearchSelect
          defaultValue={selectedOption}
          onChange={(select: SelectOption) => setSelectedOption(select)}
          options={CITY_SELECT_OPTIONS}
        />
        <ul className="w-full pb-5 overflow-y-auto h-[calc(100vh-295px)]">
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
