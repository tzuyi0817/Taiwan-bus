import type { BusStop, GeometryMap } from '@/types/bus';

export function getBusStopStatus({ EstimateTime, A2EventType }: BusStop) {
  const estimateTime = (EstimateTime ?? 0) / 60 | 0;
  const isPitStop = A2EventType === 1;
  const isPittingStop = EstimateTime !== undefined && estimateTime === 0;

  return { estimateTime, isPitStop, isPittingStop };
}

export function getZoomInGeometryMap(stops: BusStop[]) {
  return stops.reduce((map, stop, index) => {
    const nextStop = stops[index + 1];
    const { isPitStop, isPittingStop } = getBusStopStatus(stop);
    const isPit = isPitStop || isPittingStop;
    const { PositionLat, PositionLon } = stop.StopPosition;
    const geometry: [number, number] = [PositionLat, PositionLon];

    isPit ? map.stopPit.push(geometry) : map.stop.push(geometry);
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
  const geometryMap: GeometryMap = {
    stop: [],
    stopPit: [],
    line: [],
  };
  const firstStop = stops[0];
  const lastStop = stops.at(-1);
  if (!firstStop || !lastStop) return geometryMap;

  geometryMap.stop = [
    [firstStop.StopPosition.PositionLat, firstStop.StopPosition.PositionLon],
    [lastStop.StopPosition.PositionLat, lastStop.StopPosition.PositionLon],
  ];
  
  for (let index = 0; index < stops.length - 1; index++) {
    const stop = stops[index];
    const nextStop = stops[index + 1];
    const { PositionLat, PositionLon } = stop.StopPosition;
    const geometry: [number, number] = [PositionLat, PositionLon];
    const { PositionLat: nextPositionLat, PositionLon: nextPositionLon } = nextStop.StopPosition;
    const nextGeometry: [number, number] = [nextPositionLat, nextPositionLon];

    geometryMap.line.push({ color: '#355F8B', geometry: [geometry, nextGeometry] });
  }
  return geometryMap;
}
