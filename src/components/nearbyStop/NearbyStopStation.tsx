import { useBus } from '@/provider/BusProvider';
import { createImageSrc } from '@/utils/images';
import type { BusStation } from '@/types/bus';

interface Props {
  station: BusStation;
}

function NearbyStopStation({ station }: Props) {
  const { setPage, setStation, setMapCenterPos, setMapZoom } = useBus(); 
  const { StationName, Stops, distance, StationPosition: { PositionLat, PositionLon } } = station;

  function goStopsPage() {
    setStation(station);
    setMapCenterPos([PositionLat, PositionLon]);
    setMapZoom(17);
    setPage('buses');
  }

  return (
    <li className="bus_item" onClick={goStopsPage}>
      <div className="bus_item_content items-center">
        <div>
          <h1>{StationName.Zh_tw}</h1>
          <p className="text-sm text-gray-600">{`${Stops.length} 個站牌`}</p>
        </div>
        <div className="flex gap-2 items-center">
          <img src={createImageSrc('icons/location.png')} width="16" alt="" />
          <p className="text-sm text-gray-600">{distance} m</p>
        </div>
      </div>
    </li>
  )
}

export default NearbyStopStation;
