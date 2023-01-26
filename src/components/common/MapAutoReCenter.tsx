import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
  position: { lat: number; lng: number; };
}

function MapAutoReCenter({ position }: Props) {
  const map = useMap();

  useEffect(() => {
    const { lat, lng } = position;

    map.setView([lat, lng]);
  }, [position]);

  return null;
}

export default MapAutoReCenter;
