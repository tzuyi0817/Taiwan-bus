import { useState, useRef, useCallback, useEffect } from 'react';
import { useBus } from '@/provider/BusProvider';
import useGeolocation from '@/hooks/useGeolocation';
import SearchBar from '@/components/common/SearchBar';
import NearbyStopStation from '@/components/nearbyStop/NearbyStopStation';
import BusPrompt from '@/components/common/BusPrompt';
import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import { debounce, calculateDistance } from '@/utils/common';
import type { BusStation } from '@/types/bus';
import type { Coordinate } from '@/types/common';

interface Props {
  fade: string;
}

function SearchStopBlock({ fade }: Props) {
  const [keyword, setKeyword] = useState('');
  const [isShowPrompt, togglePrompt] = useState(false);
  const [filterStations, setFilterStation] = useState<BusStation[]>([]);
  const { stations, setStations, setMapZoom } = useBus();
  const searchInput = useRef<HTMLInputElement>(null);
  const { position } = useGeolocation();

  const handlerSearch = useCallback(debounce(((keyword: string) => {
    const list = keyword 
      ? stations.filter(({ StationName }) => StationName.Zh_tw.includes(keyword) )
      : stations;

    setFilterStation(list);
    togglePrompt(list.length === 0);
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
          {filterStations.map(station => <NearbyStopStation station={station} key={station.StationUID} />)}
          {isShowPrompt && <BusPrompt content="很抱歉，附近 1000 m 內查詢不到此站點" />}
        </ul>
      </div>
    </div>
  )
}

export default SearchStopBlock;