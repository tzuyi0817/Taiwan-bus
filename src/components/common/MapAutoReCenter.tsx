import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
  position: { lat: number; lng: number; };
  routePos: [number, number];
}

function MapAutoReCenter({ position, routePos }: Props) {
  const map = useMap();

  useEffect(() => {
    const { lat, lng } = position;

    map.flyTo([lat, lng]);
  }, [position]);

  useEffect(() => {
    routePos && map.flyTo(routePos);
  }, [routePos]);

  return null;
}

export default MapAutoReCenter;
