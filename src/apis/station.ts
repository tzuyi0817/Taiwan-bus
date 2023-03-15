import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import { CITY_CODE_MAP } from '@/configs/city';
import type { BusStation } from '@/types/bus'; 

export async function fetchStationBuses({ LocationCityCode, StationID }: BusStation) {
  const city = CITY_CODE_MAP[LocationCityCode];
  const params = generateParams({});
  const baseUrl = `/advanced/v2/Bus/EstimatedTimeOfArrival/City/${city}/PassThrough/Station/${StationID}`;
  
  return await ajax.get(`${baseUrl}?${params}`);
}
