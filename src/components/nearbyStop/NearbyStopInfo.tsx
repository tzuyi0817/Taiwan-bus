import { getBusStopStatus, showBusStatus } from '@/utils/busStop';
import { BUS_STOP_STATUS_BACKGROUND, BusEvent } from '@/configs/bus';
import type { BusStationStop } from '@/types/bus';

interface Props {
  stop: BusStationStop;
}

function NearbyStopInfo({ stop }: Props) {
  const { EstimateTime, StopStatus } = stop;
  const A2EventType = EstimateTime === 0 ? BusEvent.PIT : BusEvent.LEFT;
  const { estimateTime, isPitStop, isPittingStop } = getBusStopStatus({ EstimateTime, A2EventType });
  const background = isPitStop || isPittingStop ? 'bg-secondary' : BUS_STOP_STATUS_BACKGROUND[StopStatus];

  return (
    <li className="bus_info">
      <div className={`bus_info_status ${background}`}>
        {showBusStatus({ A2EventType, estimateTime, isPitStop, isPittingStop, EstimateTime, StopStatus })}
      </div>
    </li>
  )
}

export default NearbyStopInfo;
