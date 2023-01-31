import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import SearchBusStop from '@/components/searchBus/SearchBusStop';
import { createImageSrc } from '@/utils/images';
import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import { BUS_ROUTE_TYPE } from '@/configs/bus';
import type {
  BusStop,
  BusDirection,
  BusEstimatedTime,
  BusRealTimeNearStop,
} from '@/types/bus';

interface Props {
  fade: string;
}

type BusStops = Record<BusDirection, BusStop[]>;

interface BusStopRoue {
  Stops: BusStop[];
  Direction: BusDirection;
  EstimateTime: number;
}

function SearchBusDetail({ fade }: Props) {
  const [tab, setTab] = useState<BusDirection>(0);
  const BusStopsRef = useRef<HTMLUListElement>(null);
  const { bus, setPage } = useBus();
  const [busStops, setBusStops] = useState<BusStops>({
    0: [],
    1: [],
  });
  const city = useAppSelector(({ city }) => city.currentCity);

  useEffect(() => {
    if (!bus) return;

    async function getBusStopRoute(): Promise<BusStops> {
      const params = generateParams({});
      const result = await ajax.get(`/v2/Bus/StopOfRoute/City/${city}/${bus?.RouteName.Zh_tw}?${params}`);

      return result.reduce((map: BusStops, { Stops, Direction }: BusStopRoue) => {
        map[Direction] = Stops;
        return map;
      }, {});
    }

    async function getBusEstimatedTime() {
      const params = generateParams({});
      const result = await ajax.get(`/v2/Bus/EstimatedTimeOfArrival/City/${city}/${bus?.RouteName.Zh_tw}?${params}`);

      return result.reduce((map: Map<string, BusEstimatedTime>, estimatedTime: BusEstimatedTime) => {
        const { Direction, StopID } = estimatedTime;
        return map.set(`${Direction}-${StopID}`, estimatedTime);
      }, new Map());
    }

    async function getBusRealTimeNearStop() {
      const params = generateParams({});
      const result = await ajax.get(`/v2/Bus/RealTimeNearStop/City/${city}/${bus?.RouteName.Zh_tw}?${params}`);

      return result.reduce((map: Map<string, BusRealTimeNearStop>, realTimeNearStop: BusRealTimeNearStop) => {
        const { Direction, StopID } = realTimeNearStop;
        return map.set(`${Direction}-${StopID}`, realTimeNearStop);
      }, new Map());
    }

    Promise.all([getBusStopRoute(), getBusEstimatedTime(), getBusRealTimeNearStop()]).then(([stops, estimatedTimeMap, realTimeNearStopMap]) => {
      for (let direction = 0; direction <= 1; direction++) {
        const currentStops = stops[direction as BusDirection];
        const { length: size } = currentStops;

        currentStops.forEach((item, index) => {
          const { StopID } = item;
          const key = `${direction}-${StopID}`;
          const { EstimateTime, StopStatus } = estimatedTimeMap.get(key);
          const realTimeNearStop = realTimeNearStopMap.get(key);

          item.EstimateTime = EstimateTime;
          item.StopStatus = StopStatus;
          item.PlateNumb = realTimeNearStop?.PlateNumb;
          item.A2EventType = realTimeNearStop?.A2EventType;
          item.isLastStop = size === index + 1;
        });
      }
      setBusStops(stops);
    });
  }, [bus]);

  function toggleTab(tab: BusDirection) {
    setTab(tab);
    BusStopsRef.current?.scrollTo({ top: 0 });
  }

  function backSearchPage() {
    setPage('route');
    toggleTab(0);
  }

  return (
    <div className={`w-full h-[calc(100%-40px)] ${fade} absolute top-10 left-0 bg-white flex flex-col`}>
      <div className="flex justify-between px-6 py-3">
        <div className="flex gap-3 cursor-pointer items-center" onClick={backSearchPage}>
          <img src={createImageSrc('icons/back.png')} alt="" />返回搜尋
        </div>
        <BusFavorite bus={bus} />
      </div>
      <p className="text-3xl font-bold text-center">{bus?.RouteName?.Zh_tw}</p>
      <p className="text-center mt-2 mb-5">{bus ? BUS_ROUTE_TYPE[bus.BusRouteType] : ''}</p>
      <div className="flex">
        <div className={`searchBus_tab ${tab === 0 ? 'searchBus_tab-active' : ''}`} onClick={() => toggleTab(0)}>
          往<span>{bus?.DestinationStopNameZh}</span>
        </div>
        <div className={`searchBus_tab ${tab === 1 ? 'searchBus_tab-active' : ''}`} onClick={() => toggleTab(1)}>
          往<span>{bus?.DepartureStopNameZh}</span>
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto py-3" ref={BusStopsRef}>
        {busStops[tab].map(stop => {
          return <SearchBusStop key={stop.StopID} stop={stop} />
        })}
      </ul>
    </div>
  )
}

export default SearchBusDetail;
