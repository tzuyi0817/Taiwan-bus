import { useState, useRef, useCallback, useEffect } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { useAppDispatch } from '@/hooks/useRedux';
import { useBus } from '@/provider/BusProvider';
import { cityActions } from '@/store/city';
import SearchBar from '@/components/common/SearchBar';
import SearchBusKeyboard from '@/components/searchBus/SearchBusKeyboard';
import BusItem from '@/components/common/BusItem';
import BusPrompt from '@/components/common/BusPrompt';
import Loading from '@/components/common/Loading';
import { fetchBusRoute } from '@/apis/bus';
import { debounce } from '@/utils/common';
import type { Bus } from '@/types/bus';
import type { City } from '@/types/city';

interface Props {
  fade: string;
}

function SearchBusBlock({ fade }: Props) {
  const [keyword, setKeyword] = useState('');
  const [busList, setBusList] = useState<Bus[]>([]);
  const [isShowPrompt, togglePrompt] = useState(false);
  const [isLoading, toggleLoading] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const { setBus, setPage } = useBus();
  const city = useAppSelector(({ city }) => city.currentCity);
  const dispatch = useAppDispatch();
  const handlerSearch = useCallback(debounce((async (keyword: string, isFromLink = false) => {
    if (!city) return;
    toggleLoading(true);
    const result = await fetchBusRoute(keyword, city);

    setBusList(result);
    togglePrompt(result.length === 0);
    toggleLoading(false);
    if (!isFromLink) return;
    setBus(result[0]);
    setPage('detail');
    setKeyword(keyword);
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get('city') as City;
    const routeName = params.get('routeName');

    if (!city || !routeName) return;
    dispatch(cityActions.updateCity(city));
    handlerSearch(routeName, true);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  return (
    <div className={`h-full ${fade}`}>
      <div className="bus_block">
        <SearchBar
          placeholder="請輸入公車路線 / 關鍵字"
          keyword={keyword} setKeyword={setKeyword}
          ref={searchInput}
        />
        <ul className="bus_block_scrollbar h-[calc(100vh-500px)]">
          {busList.map(bus => <BusItem bus={bus} key={bus.RouteID} />)}
          {isShowPrompt && <BusPrompt content="很抱歉，查詢不到此公車路線" />}
          {isLoading && <Loading />}
        </ul>
        <SearchBusKeyboard setKeyword={setKeyword} />
      </div>
    </div>
  )
}

export default SearchBusBlock;
