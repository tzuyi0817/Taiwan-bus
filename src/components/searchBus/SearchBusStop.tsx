import { BUS_STOP_STATUS, BUS_STOP_STATUS_BACKGROUND, BUS_EVENT_TYPE } from '@/configs/bus';
import { getBusStopStatus } from '@/utils/busStop';
import type { BusStop, BusEventType, BusStopStatus } from '@/types/bus';

interface Props {
  stop: BusStop;
}

interface ShowBusStatusArgs {
  isPitStop: boolean;
  isPittingStop: boolean
  A2EventType: BusEventType; 
  EstimateTime?: number;
  estimateTime: number;
  StopStatus: BusStopStatus;
}

function SearchBusStop({ stop }: Props) {
  const { StopName, EstimateTime, PlateNumb, StopStatus, A2EventType, isLastStop } = stop;
  const { estimateTime, isPitStop, isPittingStop } = getBusStopStatus(stop);
  const background = isPitStop || isPittingStop ? 'bg-secondary' : BUS_STOP_STATUS_BACKGROUND[StopStatus];
  const marker = isPitStop || isPittingStop ? 'marker_pit -right-2' : 'marker_base -right-[7px]';

  return (
    <li className="flex mx-6 py-4 pr-4 border-b-[1px] border-b-[#E7E7E7] relative items-center gap-4 text-sm justify-between">
      <div className={`min-w-[77px] px-2 py-1 rounded-[10px] ${background} text-white text-center`}>
        {showBusStatus({ isPitStop, isPittingStop, A2EventType, EstimateTime, estimateTime, StopStatus })}
      </div>
      <p className={`flex-1 ellipsis ${isPitStop ? 'font-bold' : ''}`}>{StopName.Zh_tw}</p>
      <p className="text-secondary font-bold">{PlateNumb}</p>
      {!isLastStop && <div className="marker_absolute"></div>}
      <div className={`${marker} absolute`}></div>
    </li>
  )
}

function showBusStatus({ 
  isPitStop,
  isPittingStop,
  A2EventType,
  EstimateTime,
  estimateTime,
  StopStatus,
}: ShowBusStatusArgs) {
  if (isPitStop) return BUS_EVENT_TYPE[A2EventType];
  if (isPittingStop) return '即將進站';
  return EstimateTime ? `${estimateTime} 分` : BUS_STOP_STATUS[StopStatus];
}

export default SearchBusStop;
