import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import BusStopInfo from '@/components/common/BusStopInfo';
import BusTimer from '@/components/common/BusTimer';
import { createImageSrc } from '@/utils/images';
import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import { BUS_ROUTE_TYPE } from '@/configs/bus';
import type {
  BusStop,
  BusStops,
  BusDirection,
  BusEstimatedTime,
  BusRealTimeNearStop,
} from '@/types/bus';

interface Props {
  fade: string;
}

interface BusStopRoue {
  Stops: BusStop[];
  Direction: BusDirection;
  EstimateTime: number;
}

function SearchBusDetail({ fade }: Props) {
  const [animationTime, setAnimationTime] = useState(0);
  const BusStopsRef = useRef<HTMLUListElement>(null);
  const isUpdateRoute = useRef(false);
  const {
    bus,
    busStops,
    updateTime,
    direction,
    resetMap,
    setBusStops,
    setUpdateTime,
    setDirection,
  } = useBus();
  const city = useAppSelector(({ city }) => city.currentCity);

  useEffect(() => {
    if (!bus || updateTime > 0) return;

    async function getBusStopRoute(): Promise<BusStops> {
      const params = generateParams({});
      const result = await ajax.get(`/basic/v2/Bus/StopOfRoute/City/${city}/${bus?.RouteName.Zh_tw}?${params}`);

      return result.reduce((map: BusStops, { Stops, Direction }: BusStopRoue) => {
        map[Direction] = Stops;
        return map;
      }, {});
    }

    async function getBusEstimatedTime() {
      const params = generateParams({});
      const result = await ajax.get(`/basic/v2/Bus/EstimatedTimeOfArrival/City/${city}/${bus?.RouteName.Zh_tw}?${params}`);

      return result.reduce((map: Map<string, BusEstimatedTime>, estimatedTime: BusEstimatedTime) => {
        const { Direction, StopID } = estimatedTime;
        return map.set(`${Direction}-${StopID}`, estimatedTime);
      }, new Map());
    }

    async function getBusRealTimeNearStop() {
      const params = generateParams({});
      const result = await ajax.get(`/basic/v2/Bus/RealTimeNearStop/City/${city}/${bus?.RouteName.Zh_tw}?${params}`);

      return result.reduce((map: Map<string, BusRealTimeNearStop>, realTimeNearStop: BusRealTimeNearStop) => {
        const { Direction, StopID } = realTimeNearStop;
        return map.set(`${Direction}-${StopID}`, realTimeNearStop);
      }, new Map());
    }

    Promise
      .all([
        isUpdateRoute.current ? null : getBusStopRoute(),
        getBusEstimatedTime(), 
        getBusRealTimeNearStop(),
      ])
      .then(([stops, estimatedTimeMap, realTimeNearStopMap]) => {
        for (let direction = 0 as BusDirection; direction <= 1; direction++) {
          const currentStops = stops?.[direction] ?? busStops[direction];
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
        setBusStops(stops ?? { ...busStops });
        setUpdateTime(30);
        setAnimationTime(30);
        isUpdateRoute.current = true;
      });
  }, [bus, updateTime]);

  useEffect(() => {
    if (updateTime === 0) return setAnimationTime(0);
    const timer = setTimeout(() => setUpdateTime(time => time - 1), 1000);

    return () => clearTimeout(timer);
  }, [updateTime]);

  function toggleTab(tab: BusDirection) {
    setDirection(tab);
    BusStopsRef.current?.scrollTo({ top: 0 });
  }

  function backSearchPage() {
    resetMap();
    toggleTab(0);
    setAnimationTime(0);
    isUpdateRoute.current = false;
  }

  return (
    <div className={`w-full h-[calc(100%-40px)] ${fade} absolute top-10 left-0 bg-white flex flex-col`}>
      <div className="flex justify-between px-6 py-3">
        <div className="flex gap-3 cursor-pointer items-center" onClick={backSearchPage}>
          <img src={createImageSrc('icons/back.png')} alt="" />????????????
        </div>
        <BusFavorite bus={bus} />
      </div>
      <p className="text-3xl font-bold text-center">{bus?.RouteName?.Zh_tw}</p>
      <p className="text-center mt-2 mb-5">{bus ? BUS_ROUTE_TYPE[bus.BusRouteType] : ''}</p>
      <div className="flex">
        <div className={`bus_tab ${direction === 0 ? 'bus_tab-active' : ''}`} onClick={() => toggleTab(0)}>
          ???<span>{bus?.DestinationStopNameZh}</span>
        </div>
        <div className={`bus_tab ${direction === 1 ? 'bus_tab-active' : ''}`} onClick={() => toggleTab(1)}>
          ???<span>{bus?.DepartureStopNameZh}</span>
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto pt-3 pb-16" ref={BusStopsRef}>
        {busStops[direction].map(stop => {
          return <BusStopInfo key={stop.StopID} stop={stop} />
        })}
      </ul>
      <BusTimer animationTime={animationTime} setAnimationTime={setAnimationTime} />
    </div>
  )
}

export default SearchBusDetail;
