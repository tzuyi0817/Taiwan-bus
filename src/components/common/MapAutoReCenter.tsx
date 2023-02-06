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

    setCenter([lat, lng]);
  }, [position]);

  useEffect(() => {
    routePos && setCenter(routePos);
  }, [routePos])

  function setCenter(geometry: [number, number]) {
    map.setView(geometry);
  }

  return null;
}

export default MapAutoReCenter;
