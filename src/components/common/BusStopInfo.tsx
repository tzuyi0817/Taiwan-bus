import { useBus } from '@/provider/BusProvider';
import { BUS_STOP_STATUS_BACKGROUND } from '@/configs/bus';
import { getBusStopStatus, showBusStatus } from '@/utils/busStop';
import type { BusStop } from '@/types/bus';

interface Props {
  stop: BusStop;
}

function SearchBusStop({ stop }: Props) {
  const { StopName, PlateNumb, StopStatus, isLastStop, StopPosition } = stop;
  const { setMapZoom, setMapCenterPos, isDesignateStop } = useBus();
  const { estimateTime, isPitStop, isPittingStop } = getBusStopStatus(stop);
  const background = isPitStop || isPittingStop ? 'bg-secondary' : BUS_STOP_STATUS_BACKGROUND[StopStatus];
  const marker = isPitStop || isPittingStop ? 'marker_pit -right-2' : 'marker_base -right-[7px]';

  function designateStop() {
    isDesignateStop.current = true;
    setMapZoom(17);
    setMapCenterPos([StopPosition.PositionLat, StopPosition.PositionLon]);
  }

  return (
    <li className="bus_info" onClick={designateStop}>
      <div className={`bus_info_status ${background}`}>
        {showBusStatus({ ...stop, estimateTime, isPitStop, isPittingStop })}
      </div>
      <p className={`flex-1 ellipsis ${isPitStop ? 'font-bold' : ''}`}>{StopName.Zh_tw}</p>
      <p className="text-secondary font-bold">{PlateNumb}</p>
      {!isLastStop && <div className="marker_absolute"></div>}
      <div className={`${marker} absolute`}></div>
    </li>
  )
}

export default SearchBusStop;
