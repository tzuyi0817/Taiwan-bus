import { createImageSrc } from '@/utils/images';
import type { BusStation } from '@/types/bus';

interface Props {
  station: BusStation;
}

function NearbyStopStation({ station }: Props) {
  const { StationName, Stops, distance } = station;

  return (
    <li className="bus_item items-center">
      <div>
        <h1>{StationName.Zh_tw}</h1>
        <p className="text-sm text-gray-600">{`${Stops.length} 個站牌`}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img src={createImageSrc('icons/location.png')} width="16" alt="" />
        <p className="text-sm text-gray-600">{distance} m</p>
      </div>
    </li>
  )
}

export default NearbyStopStation;
