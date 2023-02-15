import { useMapEvents } from 'react-leaflet';
import { useBus } from '@/provider/BusProvider';

function MapEvents() {
  const { setMapZoom } = useBus();
  const map = useMapEvents({
    zoomend: () => {
      const zoom = map.getZoom();
      setMapZoom(zoom);
    }
  });

  return null;
}

export default MapEvents;
