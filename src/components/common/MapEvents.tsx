import { useMapEvents } from 'react-leaflet';
import { useBus } from '@/provider/BusProvider';

function MapEvents() {
  const { setMapZoom, isDesignateStop } = useBus();
  const map = useMapEvents({
    zoomend: () => {
      const zoom = map.getZoom();
      setMapZoom(zoom);
    },
    dragend: () => {
      isDesignateStop.current = true;
    },
  });

  return null;
}

export default MapEvents;
