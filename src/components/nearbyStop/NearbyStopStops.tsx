import { useState, useEffect } from 'react';
import { useBus } from '@/provider/BusProvider';
import NearbyStopInfo from '@/components/nearbyStop/NearbyStopInfo';
import BusPrompt from '@/components/common/BusPrompt';
import Loading from '@/components/common/Loading';
import { fetchStationEstimatedTime, fetchStationBusRoute } from '@/apis/station';
import { createImageSrc } from '@/utils/images';
import { CITY_CODE_MAP } from '@/configs/city';
import type { BusEstimatedTime, Bus, BusSite } from '@/types/bus';

interface Props {
  fade: string;
}

function NearbyStopStops({ fade }: Props) {
  const [stops, setStops] = useState<Array<BusSite>>([]);
  const [isShowPrompt, togglePrompt] = useState(false);
  const [isLoading, toggleLoading] = useState(false);
  const { station, setPage, setStation } = useBus();

  useEffect(() => {
    if (!station) return setStops([]);

    async function getStationBuses() {
      if (!station) return;
      toggleLoading(true);
      const city = CITY_CODE_MAP[station.LocationCityCode];
      const fetchInfo: [Promise<BusEstimatedTime[]>, Promise<Bus[]>] = [
        fetchStationEstimatedTime(station, city),
        fetchStationBusRoute(station, city),
      ];
      const [stopsEstimatedTime, busRoutes] = await Promise.all(fetchInfo);
      const stops = busRoutes.map(bus => {
        const estimatedTime = stopsEstimatedTime.find(({ RouteName }) => {
          return RouteName.Zh_tw === bus.RouteName.Zh_tw;
        });
        return {
          ...bus,
          ...estimatedTime!,
          StationName: station.StationName,
          StationPosition: station.StationPosition,
        };
      });

      setStops(stops);
      toggleLoading(false);
      togglePrompt(stops.length === 0);
    }
    getStationBuses();
  }, [station]);

  function sortStopsByEstimatedTime() {
    const cloneStops = [...stops];

    cloneStops.sort((a, b) => {
      const estimatedTimeA = a.EstimateTime ?? 0;
      const estimatedTimeB = b.EstimateTime ?? 0;

      return a.StopStatus - b.StopStatus || estimatedTimeA - estimatedTimeB;
    });
    setStops(cloneStops);
  }

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
        <div className="flex items-center gap-2 text_hover" onClick={sortStopsByEstimatedTime}>
          <img src={createImageSrc('icons/sort.png')} width="16" alt="" />
          <p>依到站時間排序</p>
        </div>
      </div>
      <ul className="overflow-y-auto h-[calc(100%-84px)]">
        {stops.map((stop) => <NearbyStopInfo key={stop.StopUID} stop={stop} />)}
        {isShowPrompt && <BusPrompt content="很抱歉，目前此站牌無公車營運" />}
        {isLoading && <Loading />}
      </ul>
    </div>
  )
}

export default NearbyStopStops;
