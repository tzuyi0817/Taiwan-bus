import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import type { City } from '@/types/city';
import type {
  BusStop,
  BusStops,
  BusDirection,
  BusEstimatedTime,
  BusRealTimeNearStop,
} from '@/types/bus';

interface BusStopRoue {
  Stops: BusStop[];
  Direction: BusDirection;
  EstimateTime: number;
}

export async function fetchBusRoute(routeName: string, city: City) {
  const params = generateParams({
    $filter: `contains(RouteName/En,'${routeName}') or contains(RouteName/Zh_tw,'${routeName}')`,
  });

  return await ajax.get(`/basic/v2/Bus/Route/City/${city}?${params}`);
}

export async function fetchBusStopRoute(routeName: string, city: City): Promise<BusStops> {
  const params = generateParams({});
  const result = await ajax.get(`/basic/v2/Bus/StopOfRoute/City/${city}/${routeName}?${params}`);

  return result.reduce((map: BusStops, { Stops, Direction }: BusStopRoue) => {
    map[Direction] = Stops;
    return map;
  }, {});
}

export async function fetchBusEstimatedTime(routeName: string, city: City) {
  const params = generateParams({});
  const result = await ajax.get(`/basic/v2/Bus/EstimatedTimeOfArrival/City/${city}/${routeName}?${params}`);

  return result.reduce((map: Map<string, BusEstimatedTime>, estimatedTime: BusEstimatedTime) => {
    const { Direction, StopID } = estimatedTime;
    return map.set(`${Direction}-${StopID}`, estimatedTime);
  }, new Map());
}

export async function fetchBusRealTimeNearStop(routeName: string, city: City) {
  const params = generateParams({});
  const result = await ajax.get(`/basic/v2/Bus/RealTimeNearStop/City/${city}/${routeName}?${params}`);

  return result.reduce((map: Map<string, BusRealTimeNearStop>, realTimeNearStop: BusRealTimeNearStop) => {
    const { Direction, StopID } = realTimeNearStop;
    return map.set(`${Direction}-${StopID}`, realTimeNearStop);
  }, new Map());
}
