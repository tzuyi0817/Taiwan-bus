import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
  position: { lat: number; lng: number; };
  centerPos?: [number, number];
  zoom: number;
}

function MapAutoReCenter({ position, centerPos, zoom }: Props) {
  const map = useMap();

  useEffect(() => {
    const { lat, lng } = position;

    map.flyTo([lat, lng], zoom);
  }, [position]);

  useEffect(() => {
    centerPos && map.flyTo(centerPos, zoom);
  }, [centerPos]);

  return null;
}

export default MapAutoReCenter;
