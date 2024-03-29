import i18next from '@/i18n';
import { BUS_STOP_STATUS, BUS_EVENT_TYPE, BusEvent, BusStopStatusEnum } from '@/configs/bus';
import type { BusStop, GeometryMap, BusEventType, BusStopStatus } from '@/types/bus';

interface ShowBusStatusArgs {
  isPitStop: boolean;
  isPittingStop: boolean
  A2EventType: BusEventType; 
  EstimateTime?: number;
  estimateTime: number;
  StopStatus: BusStopStatus;
}

export function showBusStatus({ 
  isPitStop,
  isPittingStop,
  A2EventType,
  EstimateTime,
  estimateTime,
  StopStatus,
}: ShowBusStatusArgs) {
  const { t } = i18next;

  if (isPitStop) return t(BUS_EVENT_TYPE[A2EventType]);
  if (isPittingStop) return t('coming_soon');
  return EstimateTime
    ? StopStatus === BusStopStatusEnum.NORMAL 
      ? `${estimateTime} ${t('minute')}`
      : new Date(Date.now() + EstimateTime * 1000)
        .toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    : t(BUS_STOP_STATUS[StopStatus]);
}

export function getBusStopStatus({ EstimateTime, A2EventType }: Partial<BusStop>) {
  const estimateTime = (EstimateTime ?? 0) / 60 | 0;
  const isPitStop = A2EventType === BusEvent.PIT;
  const isPittingStop = EstimateTime !== undefined && estimateTime === 0;

  return { estimateTime, isPitStop, isPittingStop };
}

export function getZoomInGeometryMap(stops: BusStop[]) {
  const { language } = i18next;
  const isEnglish = language === 'en';

  return stops.reduce((map, stop, index) => {
    const nextStop = stops[index + 1];
    const { isPitStop, isPittingStop, estimateTime } = getBusStopStatus(stop);
    const isPit = isPitStop || isPittingStop;
    const { PositionLat, PositionLon } = stop.StopPosition;
    const geometry: [number, number] = [PositionLat, PositionLon];
    const status = showBusStatus({ ...stop, estimateTime, isPitStop, isPittingStop });
    const busStopMap = { 
      geometry,
      status,
      isPit: isPitStop,
      stopName: isEnglish ? stop.StopName.En : stop.StopName.Zh_tw,
      stopStatus: stop.StopStatus,
    };

    isPit ? map.stopPit.push(busStopMap) : map.stop.push(busStopMap);
    if (!nextStop) return map;
    
    const { isPitStop: isPitNextStop, isPittingStop: isPittingNextStop } = getBusStopStatus(nextStop);
    const { PositionLat: nextPositionLat, PositionLon: nextPositionLon } = nextStop.StopPosition;
    const nextGeometry: [number, number] = [nextPositionLat, nextPositionLon];
    const isNextPit = isPitNextStop || isPittingNextStop;

    map.line.push(
      isPit && isNextPit 
        ? { color: '#D08181', geometry: [geometry, nextGeometry] }
        : { color: '#355F8B', geometry: [geometry, nextGeometry] }
    );
    return map;
  }, { stop: [], stopPit: [], line: [] } as GeometryMap);
}

export function getGeometryMap(stops: BusStop[]) {
  const { language } = i18next;
  const isEnglish = language === 'en';
  const geometryMap: GeometryMap = {
    stop: [],
    stopPit: [],
    line: [],
  };
  const firstStop = stops[0];
  const lastStop = stops.at(-1);
  if (!firstStop || !lastStop) return geometryMap;

  geometryMap.stop = [firstStop, lastStop].map(({ StopPosition, StopName, StopStatus }) => {
    return {
      geometry: [StopPosition.PositionLat, StopPosition.PositionLon],
      status: '',
      isPit: false,
      stopName: isEnglish ? StopName.En : StopName.Zh_tw,
      stopStatus: StopStatus,
    };
  });
  
  for (let index = 0; index < stops.length - 1; index++) {
    const stop = stops[index];
    const nextStop = stops[index + 1];
    const { isPitStop } = getBusStopStatus(stop);
    const { PositionLat, PositionLon } = stop.StopPosition;
    const geometry: [number, number] = [PositionLat, PositionLon];
    const { PositionLat: nextPositionLat, PositionLon: nextPositionLon } = nextStop.StopPosition;
    const nextGeometry: [number, number] = [nextPositionLat, nextPositionLon];

    isPitStop && geometryMap.stopPit.push({
      geometry,
      status: '',
      isPit: true,
      stopName: isEnglish ? stop.StopName.En : stop.StopName.Zh_tw,
      stopStatus: stop.StopStatus,
    });
    geometryMap.line.push({ color: '#355F8B', geometry: [geometry, nextGeometry] });
  }
  return geometryMap;
}
