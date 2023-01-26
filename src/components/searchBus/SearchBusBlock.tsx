import { useState, useRef, useCallback, useEffect } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import SearchBar from "@/components/common/SearchBar";
import SearchBusKeyboard from '@/components/searchBus/SearchBusKeyboard';
import BusItem from '@/components/common/BusItem';
import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import { debounce } from '@/utils/common';
import type { Bus } from '@/types/bus';

interface Props {
  fade: string;
}

function SearchBusBlock({ fade }: Props) {
  const [keyword, setKeyword] = useState('');
  const [busList, setBusList] = useState<Bus[]>([]);
  const searchInput = useRef<HTMLInputElement>(null);
  const city = useAppSelector(({ city }) => city.currentCity);
  const handlerSearch = useCallback(debounce((async (keyword: string) => {
    const params = generateParams({
      $filter: `contains(RouteName/En,'${keyword}') or contains(RouteName/Zh_tw,'${keyword}')`,
    });
    const result = await ajax.get(`/v2/Bus/Route/City/${city}?${params}`);

    setBusList(result);
  })), []);

  useEffect(() => {
    if (keyword === '') return;
    searchInput.current?.focus();
    handlerSearch(keyword);
  }, [keyword, handlerSearch])

  return (
    <div className={`h-full ${fade}`}>
      <div className="bg-white p-5 shadow-sm h-full">
        <SearchBar
          placeholder="輸入公車路線 / 起迄方向名或關鍵字"
          keyword={keyword} setKeyword={setKeyword}
          ref={searchInput}
        />
        <ul className="overflow-y-auto h-[calc(100%-315px)]">
          {busList.map(bus => <BusItem bus={bus} key={bus.RouteID} />)}
        </ul>
      </div>
      <SearchBusKeyboard setKeyword={setKeyword} />
    </div>
  )
}

export default SearchBusBlock;