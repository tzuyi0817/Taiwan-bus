import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useAppSelector } from '@/hooks/useRedux';
import { useState } from 'react';
import { useBus } from '@/provider/BusProvider';
import useGeolocation from '@/hooks/useGeolocation';
import MapAutoReCenter from '@/components/common/MapAutoReCenter';
import { SELF_MARKER, STOP_MARKER, PIT_MARKER } from '@/configs/marker';
import { getBusStopStatus } from '@/utils/busStop';
import generateParams from '@/utils/generateParams';
import ajax from '@/utils/ajax';
import type { BusShape, BusDirection } from '@/types/bus';

interface GeometryMap {
  stop: Array<[number, number]>;
  stopPit: Array<[number, number]>;
  line: Array<StopLine>;
}

interface StopLine {
  color: string;
  geometry: Array<[number, number]>;
}

const { VITE_MAP_STYLE, VITE_MAP_TOKEN } = import.meta.env;

function SearchBusMap() {
  const [stopsGeometry, setStopsGeometry] = useState<Array<[number, number]>>([]);
  const [stopsPitGeometry, setStopsPitGeometry] = useState<Array<[number, number]>>([]);
  const [stopsLine, setStopsLine] = useState<Array<StopLine>>([]);
  const { position } = useGeolocation();
  const { isOpenMap, bus, direction, busStops } = useBus();
  // const city = useAppSelector(({ city }) => city.currentCity);

  useEffect(() => {
    if (!bus) return;

    const stops = busStops[direction];
    const geometryMap: GeometryMap = stops.reduce((map, stop, index) => {
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

    setStopsGeometry(geometryMap.stop);
    setStopsPitGeometry(geometryMap.stopPit);
    setStopsLine(geometryMap.line);
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
            zoom={16}
            scrollWheelZoom={true}
            className="h-[calc(100%-40px)] w-full"
          >
            <TileLayer
              attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
              url={`https://api.mapbox.com/styles/v1/tzuyi/${VITE_MAP_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_MAP_TOKEN}`}
            />
            <Marker position={position} icon={SELF_MARKER}></Marker>
            <MapAutoReCenter position={position} routePos={stopsGeometry[0]} />
            {stopsLine.map(({ color, geometry }, index) => {
              return <Polyline pathOptions={{ color }} positions={geometry} key={index} />
            })}
            {stopsGeometry.map((geometry, index) => {
              return <Marker position={geometry} icon={STOP_MARKER} key={index}></Marker>
            })}
            {stopsPitGeometry.map((geometry, index) => {
              return <Marker position={geometry} icon={PIT_MARKER} key={index}></Marker>
            })}
          </MapContainer>
        </div>
      }
    </>
  )
}

export default SearchBusMap;
