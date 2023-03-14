import { useState, useEffect, type ReactNode } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import { useBus } from '@/provider/BusProvider';
import useGeolocation from '@/hooks/useGeolocation';
import MapAutoReCenter from '@/components/common/MapAutoReCenter';
import MapEvents from '@/components/common/MapEvents';
import BusIcon from '@/components/common/BusIcon';
import SwitchBlock from '@/components/common/SwitchBlock';
import { SELF_MARKER, STOP_MARKER, PIT_MARKER } from '@/configs/marker';
import { getGeometryMap, getZoomInGeometryMap } from '@/utils/busStop';
import type { StopLine, BusStopMap } from '@/types/bus';

interface Props {
  fade: string;
}

interface StopMarkerProps {
  position: [number, number];
  children: ReactNode;
  isShowTooltip: boolean;
}

const { VITE_MAP_STYLE, VITE_MAP_TOKEN } = import.meta.env;

function SearchBusMap({ fade }: Props) {
  const [stopsGeometry, setStopsGeometry] = useState<Array<BusStopMap>>([]);
  const [stopsPitGeometry, setStopsPitGeometry] = useState<Array<BusStopMap>>([]);
  const [stopsLine, setStopsLine] = useState<Array<StopLine>>([]);
  const [isShowStopInfo, toggleStopInfo] = useState(true);
  const { position } = useGeolocation();
  const {
    bus,
    direction,
    busStops,
    stations,
    mapZoom,
    mapCenterPos,
    isDesignateStop,
    setMapZoom,
    setMapCenterPos,
  } = useBus();
  const isZoomIn = mapZoom > 14;

  useEffect(() => {
    if (!bus) return clearMap();
    const stops = busStops[direction];
    const geometryMap = isZoomIn ? getZoomInGeometryMap(stops) : getGeometryMap(stops);
    const centerPos = stops[stops.length / 2 | 0]?.StopPosition;

    setStopsGeometry(geometryMap.stop);
    setStopsPitGeometry(geometryMap.stopPit);
    setStopsLine(geometryMap.line);
    if (isDesignateStop.current || !centerPos) return;
    setMapCenterPos([centerPos.PositionLat, centerPos.PositionLon]);
    // `/v2/Bus/Shape/City/${city}/${bus?.RouteName.Zh_tw}?${params}
  }, [bus, direction, busStops, mapZoom]);

  useEffect(() => {
    if (!stations.length) return;
    setMapZoom(17);
    setMapCenterPos([position.lat, position.lng]);
  }, [stations]);

  function clearMap() {
    setStopsGeometry([]);
    setStopsPitGeometry([]);
    setStopsLine([]);
  }

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
          <MapEvents />
          {stopsLine.map(({ color, geometry }, index) => {
            return <Polyline pathOptions={{ color }} positions={geometry} key={index} />
          })}
          {stopsGeometry.map(({ geometry, stopName, status }, index) => {
            return <StopMarker position={geometry} key={index} isShowTooltip={isZoomIn && isShowStopInfo}>
              <p>{stopName}</p>
              <h5>{status}</h5>
            </StopMarker>;
          })}
          {stopsPitGeometry.map(({ geometry, stopName, status, isPit }, index) => {
            return <Marker position={geometry} icon={PIT_MARKER} key={isZoomIn ? `zoom${index}` : index}>
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
          {stations.map(({ StationPosition: { PositionLat, PositionLon }, StationName, StationUID }) => {
            return <StopMarker
              position={[PositionLat, PositionLon]}
              key={StationUID}
              isShowTooltip={isZoomIn && isShowStopInfo}
            >
              <p>{StationName.Zh_tw}</p>
            </StopMarker>;
          })};
        </MapContainer>
        <SwitchBlock
          className="absolute z-[400] bottom-16 left-5 md:top-7 md:right-5" 
          defaultValue={isShowStopInfo}
          toggleSwitch={toggleStopInfo}
        >
          <span className="hidden md:contents">顯示</span>站牌資訊
        </SwitchBlock>
      </div>
    </>
  )
}

function StopMarker({ position, children, isShowTooltip }: StopMarkerProps) {
  return <Marker position={position} icon={STOP_MARKER}>
    {isShowTooltip && (
      <Tooltip
        direction="top"
        offset={[0, -10]}
        opacity={1}
        permanent
        className="tooltip_base"
      >
        {children}
      </Tooltip>
    )}
  </Marker>;
}

export default SearchBusMap;
