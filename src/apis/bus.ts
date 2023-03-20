import ajax from '@/utils/ajax';
import generateParams from '@/utils/generateParams';
import type { City } from '@/types/city';

export async function fetchBusRoute(routeName: string, city: City) {
  const params = generateParams({
    $filter: `contains(RouteName/En,'${routeName}') or contains(RouteName/Zh_tw,'${routeName}')`,
  });

  return await ajax.get(`/basic/v2/Bus/Route/City/${city}?${params}`);
}
