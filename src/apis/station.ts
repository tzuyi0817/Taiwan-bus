import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import { calculateDistance } from '@/utils/common';
import type { BusStation } from '@/types/bus'; 
import type { City } from '@/types/city';
import type { Coordinate } from '@/types/common';

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

export async function fetchStationNearBy({ lat, lng }: Coordinate) {
  const params = generateParams({
    $spatialFilter : `nearby(${lat}, ${lng}, 1000)`,
  });
  const result = await ajax.get(`/advanced/v2/Bus/Station/NearBy?${params}`);

  return result.map((station: BusStation) => {
    const { StationPosition: { PositionLat, PositionLon } } = station;
    const stationPosition = { lat: PositionLat, lng: PositionLon };

    return {
      ...station,
      distance: calculateDistance({ lat, lng }, stationPosition),
    };
  });
}
