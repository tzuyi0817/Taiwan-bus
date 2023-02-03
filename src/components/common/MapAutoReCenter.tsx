import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
  position: { lat: number; lng: number; };
}

function MapAutoReCenter({ position }: Props, ref) {
  const map = useMap();

  useImperativeHandle(ref, () => ({
    setＭapCenter,
  }));

  useEffect(() => {
    const { lat, lng } = position;

    setＭapCenter([lat, lng]);
  }, [position]);

  function setＭapCenter(geometry: [number, number]) {
    map.setView(geometry);
  }

  return null;
}

export default forwardRef(MapAutoReCenter);
