import { useState, useRef, useCallback, useEffect } from 'react';
import SearchBar from '@/components/common/SearchBar';
import BusItem from '@/components/common/BusItem';
import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import { debounce } from '@/utils/common';
import { createImageSrc } from '@/utils/images';
import type { Bus } from '@/types/bus';

interface Props {
  fade: string;
}

function SearchStopBlock({ fade }: Props) {
  const [keyword, setKeyword] = useState('');
  const [busList, setBusList] = useState<Bus[]>([]);
  const [isShowPrompt, togglePrompt] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  const handlerSearch = useCallback(debounce((async (keyword: string) => {
    // const params = generateParams({
    //   $filter: `contains(RouteName/En,'${keyword}') or contains(RouteName/Zh_tw,'${keyword}')`,
    // });
    // const result = await ajax.get(`/v2/Bus/Stop/City`);

    // setBusList(result);
    // togglePrompt(result.length === 0);
  })), []);

  useEffect(() => {
    if (!keyword) {
      setBusList([]);
      togglePrompt(false);
      return;
    }
    searchInput.current?.focus();
    handlerSearch(keyword);
  }, [keyword, handlerSearch]);

  return (
    <div className={`h-full ${fade}`}>
      <div className="bg-white p-5 shadow-sm h-full">
        <SearchBar
          placeholder="請輸入站名"
          keyword={keyword} setKeyword={setKeyword}
          ref={searchInput}
        />
        <ul className="overflow-y-auto h-[calc(100%-315px)]">
          {busList.map(bus => <BusItem bus={bus} key={bus.RouteID} />)}
          {isShowPrompt && <div className="mt-8 flex flex-col items-center">
            <img src={createImageSrc('images/logo-wait.svg')} width="120" alt="" />
            <p>很抱歉，查詢不到此站點</p>
          </div>}
        </ul>
      </div>
    </div>
  )
}

export default SearchStopBlock;
