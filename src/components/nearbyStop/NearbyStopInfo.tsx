import BusFavorite from '@/components/common/BusFavorite';
import { getBusStopStatus, showBusStatus } from '@/utils/busStop';
import { BUS_STOP_STATUS_BACKGROUND, BusEvent } from '@/configs/bus';
import type { BusStationStop } from '@/types/bus';

interface Props {
  stop: BusStationStop;
}

function NearbyStopInfo({ stop }: Props) {
  const { EstimateTime, StopStatus, RouteName, City } = stop;
  const A2EventType = EstimateTime === 0 ? BusEvent.PIT : BusEvent.LEFT;
  const { estimateTime, isPitStop, isPittingStop } = getBusStopStatus({ EstimateTime, A2EventType });
  const background = isPitStop || isPittingStop ? 'bg-secondary' : BUS_STOP_STATUS_BACKGROUND[StopStatus];

  return (
    <li className="bus_info py-3 px-0">
      <div className={`bus_info_status ${background}`}>
        {showBusStatus({ A2EventType, estimateTime, isPitStop, isPittingStop, EstimateTime, StopStatus })}
      </div>
      <div className="flex flex-1 flex-col gap-1 justify-center ellipsis">
        <h1 className="ellipsis">{RouteName.Zh_tw}</h1>
        <p className="text-sm text-gray-600">123</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <BusFavorite />
        <p className="text-sm text-gray-600">{City}</p>
      </div>
    </li>
  )
}

export default NearbyStopInfo;
