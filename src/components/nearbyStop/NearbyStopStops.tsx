import { useState, useEffect } from 'react';
import { useBus } from '@/provider/BusProvider';
import NearbyStopInfo from '@/components/nearbyStop/NearbyStopInfo';
import { fetchStationEstimatedTime, fetchStationBusRoute } from '@/apis/station';
import { createImageSrc } from '@/utils/images';
import { CITY_CODE_MAP } from '@/configs/city';
import type { BusStationStop, Bus } from '@/types/bus';

interface Props {
  fade: string;
}

function NearbyStopStops({ fade }: Props) {
  const [stops, setStops] = useState<Array<BusStationStop & Partial<Bus>>>([]);
  const { station, setPage, setStation } = useBus();

  useEffect(() => {
    if (!station) return setStops([]);

    async function getStationBuses() {
      if (!station) return;
      const city = CITY_CODE_MAP[station.LocationCityCode];
      const fetchInfo: [Promise<BusStationStop[]>, Promise<Bus[]>] = [
        fetchStationEstimatedTime(station, city),
        fetchStationBusRoute(station, city),
      ];
      const [busStops, busRoutes] = await Promise.all(fetchInfo);
      const stops = busStops.map(stop => {
        const route = busRoutes.find(({ RouteName }) => RouteName.Zh_tw === stop.RouteName.Zh_tw);
        return route ? { ...stop, ...route } : stop;
      });

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
      <ul className="overflow-y-auto h-[calc(100%-84px)]">
        {stops.map((stop) => <NearbyStopInfo key={stop.StopUID} stop={stop} />)}
      </ul>
    </div>
  )
}

export default NearbyStopStops;
