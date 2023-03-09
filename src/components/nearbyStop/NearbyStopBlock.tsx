import { useState, useRef, useCallback, useEffect } from 'react';
import useGeolocation from '@/hooks/useGeolocation';
import SearchBar from '@/components/common/SearchBar';
import BusItem from '@/components/common/BusItem';
import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import { debounce, calculateDistance } from '@/utils/common';
import { createImageSrc } from '@/utils/images';
import type { Bus } from '@/types/bus';

interface Props {
  fade: string;
}

function SearchStopBlock({ fade }: Props) {
  const [keyword, setKeyword] = useState('');
  const [stationList, setStationList] = useState<Bus[]>([]);
  const [isShowPrompt, togglePrompt] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const { position } = useGeolocation();

  const handlerSearch = useCallback(debounce((async (keyword: string) => {
    const params = generateParams({
      $spatialFilter : `nearby(${position.lat}, ${position.lng}, 1000)`,
    });
    const result = await ajax.get(`/advanced/v2/Bus/Station/NearBy?${params}`);
    console.log(result);
    // setBusList(result);
    // togglePrompt(result.length === 0);
    console.log(calculateDistance(position, { lat: 25.081142, lng: 121.558531 }));
  })), []);

  useEffect(() => {
    handlerSearch(keyword);
  }, [keyword, position, handlerSearch]);

  return (
    <div className={`h-full ${fade}`}>
      <div className="bg-white p-5 shadow-sm h-full">
        <SearchBar
          placeholder="想去哪裡？"
          keyword={keyword} setKeyword={setKeyword}
          ref={searchInput}
        />
        <ul className="overflow-y-auto h-[calc(100%-315px)]">
          {/* {busList.map(bus => <BusItem bus={bus} key={bus.RouteID} />)} */}
          {isShowPrompt && <div className="mt-8 flex flex-col items-center">
            <img src={createImageSrc('images/logo-wait.svg')} width="120" alt="" />
            <p>很抱歉，查詢不到此站牌</p>
          </div>}
        </ul>
      </div>
    </div>
  )
}

export default SearchStopBlock;