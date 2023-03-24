import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import { getBusStopStatus, showBusStatus } from '@/utils/busStop';
import { BUS_STOP_STATUS_BACKGROUND, BusEvent } from '@/configs/bus';
import type { BusEstimatedTime, Bus } from '@/types/bus';

interface Props {
  stop: Bus & BusEstimatedTime;
}

function NearbyStopInfo({ stop }: Props) {
  const { setBus, setPage, setUpdateTime, resetStation } = useBus();
  const {
    EstimateTime,
    StopStatus,
    RouteName,
    City,
    DepartureStopNameZh,
    DestinationStopNameZh,
    Direction,
  } = stop;
  const A2EventType = EstimateTime === 0 ? BusEvent.PIT : BusEvent.LEFT;
  const { estimateTime, isPitStop, isPittingStop } = getBusStopStatus({ EstimateTime, A2EventType });
  const background = isPitStop || isPittingStop ? 'bg-secondary' : BUS_STOP_STATUS_BACKGROUND[StopStatus];

  function goDetailPage() {
    setBus(stop);
    setPage('detail');
    setUpdateTime(0);
  }

  return (
    <li className="bus_info py-3 px-0" onClick={goDetailPage}>
      <div className={`bus_info_status ${background}`}>
        {showBusStatus({ A2EventType, estimateTime, isPitStop, isPittingStop, EstimateTime, StopStatus })}
      </div>
      <div className="flex flex-1 flex-col gap-1 justify-center ellipsis">
        <h1 className="ellipsis">{RouteName.Zh_tw}</h1>
        <p className="text-sm text-gray-600">
          往 {Direction === 0 ? DestinationStopNameZh : DepartureStopNameZh}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <BusFavorite />
        <p className="text-sm text-gray-600">{City}</p>
      </div>
    </li>
  )
}

export default NearbyStopInfo;
