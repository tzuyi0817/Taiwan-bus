import { useState, useRef, useCallback, useEffect } from 'react';
import { useBus } from '@/provider/BusProvider';
import useGeolocation from '@/hooks/useGeolocation';
import SearchBar from '@/components/common/SearchBar';
import NearbyStopStation from '@/components/nearbyStop/NearbyStopStation';
import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import { debounce, calculateDistance } from '@/utils/common';
import { createImageSrc } from '@/utils/images';
import type { BusStation } from '@/types/bus';
import type { Coordinate } from '@/types/common';

interface Props {
  fade: string;
}

function SearchStopBlock({ fade }: Props) {
  const [keyword, setKeyword] = useState('');
  const [isShowPrompt, togglePrompt] = useState(false);
  const { stations, setStations, setMapZoom } = useBus();
  const searchInput = useRef<HTMLInputElement>(null);
  const { position } = useGeolocation();

  const handlerSearch = useCallback(debounce((async (keyword: string) => {
    // const params = generateParams({
    //   $spatialFilter : `nearby(${position.lat}, ${position.lng}, 1000)`,
    // });
    // const stations = await ajax.get(`/advanced/v2/Bus/Station/NearBy?${params}`);

    // setBusList(stations);
    // togglePrompt(stations.length === 0);
  })), []);

  async function fetchStations({ lat, lng }: Coordinate) {
    const params = generateParams({
      $spatialFilter : `nearby(${lat}, ${lng}, 1000)`,
    });
    const result = await ajax.get(`/advanced/v2/Bus/Station/NearBy?${params}`);
    const stations = result.map((station: BusStation) => {
      const { StationPosition: { PositionLat, PositionLon } } = station;
      const stationPosition = { lat: PositionLat, lng: PositionLon };
  
      return {
        ...station,
        distance: calculateDistance({ lat, lng }, stationPosition),
      };
    });

    setStations(stations);
  }

  useEffect(() => {
    fetchStations(position);
  }, [position]);

  useEffect(() => {
    handlerSearch(keyword);
  }, [keyword, handlerSearch]);


  return (
    <div className={`h-[calc(100%-40px)] ${fade}`}>
      <div className="bus_block">
        <SearchBar
          placeholder="想去哪裡？"
          keyword={keyword} setKeyword={setKeyword}
          ref={searchInput}
        />
        <ul className="overflow-y-auto h-[calc(100%-25px)]">
          {stations.map(station => <NearbyStopStation station={station} key={station.StationUID} />)}
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