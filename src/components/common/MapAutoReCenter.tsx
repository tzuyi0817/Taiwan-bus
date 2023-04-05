import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useBus } from '@/provider/BusProvider';

interface Props {
  position: { lat: number; lng: number; };
  centerPos?: [number, number];
  zoom: number;
}

function MapAutoReCenter({ position, centerPos, zoom }: Props) {
  const map = useMap();
  const { isDesignateStop } = useBus();

  useEffect(() => {
    if (isDesignateStop.current) return;
    const { lat, lng } = position;

    map.flyTo([lat, lng], zoom);
  }, [position]);

  useEffect(() => {
    centerPos && map.flyTo(centerPos, zoom);
  }, [centerPos]);

  return null;
}

export default MapAutoReCenter;
