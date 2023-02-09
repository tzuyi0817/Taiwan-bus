import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
  position: { lat: number; lng: number; };
  centerPos?: [number, number];
}

function MapAutoReCenter({ position, centerPos }: Props) {
  const map = useMap();

  useEffect(() => {
    const { lat, lng } = position;

    map.flyTo([lat, lng]);
  }, [position]);

  useEffect(() => {
    centerPos && map.flyTo(centerPos);
  }, [centerPos]);

  return null;
}

export default MapAutoReCenter;
