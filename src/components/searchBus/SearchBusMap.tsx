import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import useGeolocation from '@/hooks/useGeolocation';
import MapAutoReCenter from '@/components/common/MapAutoReCenter';
import { SELF_MARKER } from '@/configs/marker';

const { VITE_MAP_STYLE, VITE_MAP_TOKEN } = import.meta.env;

function SearchBusMap() {
  const { position } = useGeolocation();

  return (
    <div className="absolute top-10 left-0 overflow-hidden w-full h-full bg-white">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[calc(100%-40px)] w-full"
      >
        <TileLayer
          attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/tzuyi/${VITE_MAP_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_MAP_TOKEN}`}
        />
        <Marker position={position} icon={SELF_MARKER}></Marker>
        <MapAutoReCenter position={position} />
      </MapContainer>
    </div>
  )
}

export default SearchBusMap;
