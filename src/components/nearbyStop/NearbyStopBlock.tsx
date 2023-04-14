import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBus } from '@/provider/BusProvider';
import useGeolocation from '@/hooks/useGeolocation';
import SearchBar from '@/components/common/SearchBar';
import NearbyStopStation from '@/components/nearbyStop/NearbyStopStation';
import BusPrompt from '@/components/common/BusPrompt';
import Loading from '@/components/common/Loading';
import { fetchStationNearBy } from '@/apis/station';
import { debounce } from '@/utils/common';
import type { BusStation } from '@/types/bus';
import type { Coordinate } from '@/types/common';

interface Props {
  fade: string;
}

function NearbyStopBlock({ fade }: Props) {
  const [keyword, setKeyword] = useState('');
  const [isShowPrompt, togglePrompt] = useState(false);
  const [isLoading, toggleLoading] = useState(false);
  const [filterStations, setFilterStation] = useState<BusStation[]>([]);
  const { t } = useTranslation();
  const { stations, setStations } = useBus();
  const searchInput = useRef<HTMLInputElement>(null);
  const { position } = useGeolocation();

  const handlerSearch = useCallback(debounce(((keyword: string, stations: BusStation[]) => {
    const list = keyword
      ? stations.filter(({ StationName }) => StationName.Zh_tw.includes(keyword) )
      : stations;

    setFilterStation(list);
    togglePrompt(list.length === 0);
  })), []);

  async function fetchStations(position: Coordinate) {
    toggleLoading(true);
    const stations = await fetchStationNearBy(position);

    setStations(stations);
    toggleLoading(false);
  }

  useEffect(() => {
    fetchStations(position);
  }, [position]);

  useEffect(() => {
    handlerSearch(keyword, stations);
  }, [keyword, stations, handlerSearch]);


  return (
    <div className={`h-[calc(100vh-165px)] ${fade}`}>
      <div className="bus_block h-full md:h-[calc(100%-40px)]">
        <SearchBar
          placeholder={t('placeholder.nearby_stop')}
          keyword={keyword} setKeyword={setKeyword}
          ref={searchInput}
        />
        <ul className="bus_block_scrollbar h-[calc(100%-40px)]">
          {filterStations.map(station => <NearbyStopStation station={station} key={station.StationUID} />)}
          {isShowPrompt && <BusPrompt content={t('prompt.nearby_stop')} />}
          {isLoading && <Loading />}
        </ul>
      </div>
    </div>
  )
}

export default NearbyStopBlock;