import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import { useAppSelector } from '@/hooks/useRedux';
import { useState } from 'react';
import { useBus } from '@/provider/BusProvider';
import useGeolocation from '@/hooks/useGeolocation';
import MapAutoReCenter from '@/components/common/MapAutoReCenter';
import BusIcon from '@/components/common/BusIcon';
import { SELF_MARKER, STOP_MARKER, PIT_MARKER } from '@/configs/marker';
import { getGeometryMap, getZoomInGeometryMap } from '@/utils/busStop';
import generateParams from '@/utils/generateParams';
import ajax from '@/utils/ajax';
import type { StopLine, BusStopMap } from '@/types/bus';

interface Props {
  fade: string;
}

const { VITE_MAP_STYLE, VITE_MAP_TOKEN } = import.meta.env;

function SearchBusMap({ fade }: Props) {
  const [stopsGeometry, setStopsGeometry] = useState<Array<BusStopMap>>([]);
  const [stopsPitGeometry, setStopsPitGeometry] = useState<Array<BusStopMap>>([]);
  const [stopsLine, setStopsLine] = useState<Array<StopLine>>([]);
  const { position } = useGeolocation();
  const {
    bus,
    direction,
    busStops,
    mapZoom,
    mapCenterPos,
    isDesignateStop,
    setMapCenterPos,
  } = useBus();
  const isZoomIn = mapZoom > 12;
  // const city = useAppSelector(({ city }) => city.currentCity);

  useEffect(() => {
    if (!bus) return;
    const stops = busStops[direction];
    const geometryMap = isZoomIn ? getZoomInGeometryMap(stops) : getGeometryMap(stops);
    const centerPos = stops[stops.length / 2 | 0]?.StopPosition;

    setStopsGeometry(geometryMap.stop);
    setStopsPitGeometry(geometryMap.stopPit);
    setStopsLine(geometryMap.line);
    if (isDesignateStop.current || !centerPos) return;
    setMapCenterPos([centerPos.PositionLat, centerPos.PositionLon]);
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
  }, [bus, direction, busStops, mapZoom]);

  return (
    <>
      <div className={`absolute top-10 left-0 overflow-hidden w-full h-full bg-white ${fade}`}>
        <MapContainer
          center={position}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className={`h-[calc(100%-40px)] w-full`}
        >
          <TileLayer
            attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url={`https://api.mapbox.com/styles/v1/tzuyi/${VITE_MAP_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_MAP_TOKEN}`}
          />
          <Marker position={position} icon={SELF_MARKER}></Marker>
          <MapAutoReCenter position={position} centerPos={mapCenterPos} zoom={mapZoom} />
          {stopsLine.map(({ color, geometry }, index) => {
            return <Polyline pathOptions={{ color }} positions={geometry} key={index} />
          })}
          {stopsGeometry.map(({ geometry, stopName, status }, index) => {
            return <Marker position={geometry} icon={STOP_MARKER} key={index}>
              {isZoomIn && (
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent className="tooltip_base">
                  <p>{stopName}</p>
                  <h5>{status}</h5>
                </Tooltip>
              )}
            </Marker>
          })}
          {stopsPitGeometry.map(({ geometry, stopName, status, isPit }, index) => {
            return <Marker position={geometry} icon={PIT_MARKER} key={index}>
              <Tooltip
                direction="top" 
                offset={[0, isZoomIn ? -10 : 20]}
                opacity={1}
                permanent
                className={isZoomIn ? 'tooltip_pit' : 'tooltip_bus_pit'}
              >
                {isZoomIn
                  ? <>
                      {isPit && <BusIcon fill="#FFF" width="30" height="30" />}
                      <p>{stopName}</p>
                      <h5>{status}</h5>
                    </>
                  : <BusIcon fill="#FFF" width="20" height="20" />
                }
              </Tooltip>
            </Marker>
          })}
        </MapContainer>
      </div>
    </>
  )
}

export default SearchBusMap;
