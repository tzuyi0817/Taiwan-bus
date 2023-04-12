import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import BusStopInfo from '@/components/common/BusStopInfo';
import BusTab from '@/components/common/BusTab';
import BusTimer from '@/components/common/BusTimer';
import { createImageSrc } from '@/utils/images';
import { fetchBusStopRoute, fetchBusEstimatedTime, fetchBusRealTimeNearStop } from '@/apis/bus';
import { BUS_ROUTE_TYPE } from '@/configs/bus';
import type { BusDirection } from '@/types/bus';

interface Props {
  fade: string;
}

function SearchBusDetail({ fade }: Props) {
  const [animationTime, setAnimationTime] = useState(0);
  const BusStopsRef = useRef<HTMLUListElement>(null);
  const isUpdateRoute = useRef(false);
  const { t, i18n: { language } } = useTranslation();
  const isEnglish = language === 'en';
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
  const destinationStop = isEnglish ? bus?.DestinationStopNameEn : bus?.DestinationStopNameZh;
  const departureStop = isEnglish ? bus?.DepartureStopNameEn : bus?.DepartureStopNameZh;
  const routeName = isEnglish ? bus?.RouteName.En : bus?.RouteName.Zh_tw;
  const options = [
    {
      title: <>{t('to')}<span>{destinationStop}</span></>,
      value: 0,
    },
    { 
      title: <>{t('to')}<span>{departureStop}</span></>,
      value: 1,
    },
  ];

  useEffect(() => {
    if (!bus || updateTime > 0) return;
    const city = bus.City;
    const routeName = bus.RouteName.Zh_tw;

    Promise
      .all([
        isUpdateRoute.current ? null : fetchBusStopRoute(routeName, city),
        fetchBusEstimatedTime(routeName, city), 
        fetchBusRealTimeNearStop(routeName, city),
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
      bus?.Direction && toggleTab(bus?.Direction);
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
    resetMap(false);
    toggleTab(0);
    setAnimationTime(0);
    isUpdateRoute.current = false;
  }

  return (
    <div className={`bus_detail ${fade}`}>
      <div className="bus_detail_header">
        <div className="bus_detail_back" onClick={backSearchPage}>
          <img src={createImageSrc('icons/back.png')} alt="" />{t('back_search')}
        </div>
        <BusFavorite bus={bus} type="bus" />
      </div>
      <p className="text-3xl font-bold text-center">{routeName}</p>
      <p className="text-center mt-2 mb-5">{bus ? t(BUS_ROUTE_TYPE[bus.BusRouteType]) : ''}</p>
      <BusTab options={options} value={direction} toggleTab={toggleTab} />
      <ul className="flex-1 overflow-y-auto pt-3 pb-16" ref={BusStopsRef}>
        {busStops[direction].map(stop => <BusStopInfo key={stop.StopID} stop={stop} />)}
      </ul>
      <BusTimer animationTime={animationTime} setAnimationTime={setAnimationTime} />
    </div>
  )
}

export default SearchBusDetail;
