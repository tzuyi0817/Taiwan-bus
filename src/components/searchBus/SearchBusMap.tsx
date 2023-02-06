import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useAppSelector } from '@/hooks/useRedux';
import { useState } from 'react';
import { useBus } from '@/provider/BusProvider';
import useGeolocation from '@/hooks/useGeolocation';
import MapAutoReCenter from '@/components/common/MapAutoReCenter';
import { SELF_MARKER } from '@/configs/marker';
import generateParams from '@/utils/generateParams';
import ajax from '@/utils/ajax';
import type { BusShape, BusDirection } from '@/types/bus';

const { VITE_MAP_STYLE, VITE_MAP_TOKEN } = import.meta.env;

function SearchBusMap() {
  const [routeGeometry, setRouteGeometry] = useState<Array<[number, number]>>([]);
  const { position } = useGeolocation();
  const { isOpenMap, bus, direction, busStops } = useBus();
  // const city = useAppSelector(({ city }) => city.currentCity);

  useEffect(() => {
    if (!bus) return;

    const stops = busStops[direction];
    const route: Array<[number, number]> = stops.map(({ StopPosition }) => {
      const { PositionLat, PositionLon } = StopPosition;
      return [PositionLat, PositionLon];
    });

    setRouteGeometry(route);
    // async function getBusShape() {
    //   const params = generateParams({});
    //   const result = await ajax.get(`/v2/Bus/Shape/City/${city}/${bus?.RouteName.Zh_tw}?${params}`);
    //   const geometry = result[0].Geometry
    //     .replace(/(LINESTRING )|[()]/g, '')
    //     .split(', ')
    //     .map((str: string) => str.split(' ').reverse());
    //   const { length: size } = geometry;

    // }
    // getBusShape();
  }, [bus, direction, busStops]);

  return (
    <>
      {isOpenMap &&
        <div className="absolute top-10 left-0 overflow-hidden w-full h-full bg-white">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            className="h-[calc(100%-40px)] w-full"
          >
            <TileLayer
              attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
              url={`https://api.mapbox.com/styles/v1/tzuyi/${VITE_MAP_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_MAP_TOKEN}`}
            />
            <Marker position={position} icon={SELF_MARKER}></Marker>
            <MapAutoReCenter position={position} routePos={routeGeometry[0]} />
            <Polyline pathOptions={{ color: '#355F8B' }} positions={routeGeometry}/>
          </MapContainer>
        </div>
      }
    </>
  )
}

export default SearchBusMap;
