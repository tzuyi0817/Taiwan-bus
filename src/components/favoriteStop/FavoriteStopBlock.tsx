import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import BusTab from '@/components/common/BusTab';
import SearchSelect from '@/components/common/SearchSelect';
import FavoriteStopBus from '@/components/favoriteStop/FavoriteStopBus';
import FavoriteStopStation from '@/components/favoriteStop/FavoriteStopStation';
import { CITY_SELECT_OPTIONS } from '@/configs/city';
import { FavoriteTypeEnum } from '@/configs/favorite';
import type { SelectOption } from '@/types/common';

function FavoriteStopBlock() {
  const [type, setType] = useState(FavoriteTypeEnum.STOP);
  const [selectedOption, setSelectedOption] = useState<SelectOption>();
  const { t, i18n: { language } } = useTranslation();
  const cityOptions = useMemo(() => {
    return CITY_SELECT_OPTIONS.map(({ value, label }) => ({ value, label: t(label) }));
  }, [language]);
  const TAB_OPTIONS = [
    { title: t('favorite_stop'), value: FavoriteTypeEnum.STOP },
    { title: t('favorite_site'), value: FavoriteTypeEnum.STATION },
  ];

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
          options={cityOptions}
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
