import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import type { BusStation } from '@/types/bus'; 
import type { City } from '@/types/city';

export async function fetchStationEstimatedTime({ StationID }: BusStation, city: City) {
  const params = generateParams({});
  const baseUrl = `/advanced/v2/Bus/EstimatedTimeOfArrival/City/${city}/PassThrough/Station/${StationID}`;
  
  return await ajax.get(`${baseUrl}?${params}`);
}

export async function fetchStationBusRoute({ StationID }: BusStation, city: City) {
  const params = generateParams({});
  const baseUrl = `/advanced/v2/Bus/Route/City/${city}/PassThrough/Station/${StationID}`;
  
  return await ajax.get(`${baseUrl}?${params}`);
}
