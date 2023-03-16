import { useState, useEffect } from 'react';
import { useBus } from '@/provider/BusProvider';
import NearbyStopInfo from '@/components/nearbyStop/NearbyStopInfo';
import { fetchStationEstimatedTime } from '@/apis/station';
import { createImageSrc } from '@/utils/images';
import type { BusStationStop } from '@/types/bus';

interface Props {
  fade: string;
}

function NearbyStopStops({ fade }: Props) {
  const [stops, setStops] = useState<Array<BusStationStop>>([]);
  const { station, setPage, setStation } = useBus();

  useEffect(() => {
    if (!station) return setStops([]);

    async function getStationBuses() {
      if (!station) return;
      const stops = await fetchStationEstimatedTime(station);

      setStops(stops);
    }
    getStationBuses();
  }, [station])

  function backSearchPage() {
    setPage('route');
    setStation(undefined);
  }

  return (
    <div className={`bus_detail ${fade}`}>
      <div className="bus_detail_header">
        <div className="bus_detail_back" onClick={backSearchPage}>
          <img src={createImageSrc('icons/back.png')} alt="" />返回搜尋
        </div>
      </div>
      <div className="flex items-center justify-between px-6 pt-4 pb-10">
        <p className="text-lg font-bold">{station?.StationName?.Zh_tw}</p>
        <div className="flex items-center gap-2">
          <img src={createImageSrc('icons/sort.png')} width="16" alt="" />
          <p>依到站時間排序</p>
        </div>
      </div>
      <ul>
        {stops.map((stop) => <NearbyStopInfo key={stop.StopUID} stop={stop} />)}
      </ul>
    </div>
  )
}

export default NearbyStopStops;
