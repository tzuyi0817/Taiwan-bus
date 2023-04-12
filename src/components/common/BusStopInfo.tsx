import { useTranslation } from 'react-i18next';
import { useBus } from '@/provider/BusProvider';
import BusRipples from '@/components/common/BusRipples';
import { BUS_STOP_STATUS_BACKGROUND, BUS_STOP_TEXT_COLOR } from '@/configs/bus';
import { getBusStopStatus, showBusStatus } from '@/utils/busStop';
import type { BusStop } from '@/types/bus';

interface Props {
  stop: BusStop;
}

function BusStopInfo({ stop }: Props) {
  const { i18n: { language } } = useTranslation();
  const isEnglish = language === 'en';
  const { StopName, PlateNumb, StopStatus, isLastStop, StopPosition, StopID } = stop;
  const { isDesignateStop, selectedStopId, setSelectedStopId, setMapZoom, setMapCenterPos } = useBus();
  const { estimateTime, isPitStop, isPittingStop } = getBusStopStatus(stop);
  const background = isPitStop || isPittingStop ? 'bg-secondary' : BUS_STOP_STATUS_BACKGROUND[StopStatus];
  const marker = isPitStop || isPittingStop ? 'marker_pit -right-2' : 'marker_base -right-[7px]';
  const textColor = isPitStop ? 'font-bold text-black' : BUS_STOP_TEXT_COLOR[StopStatus];

  function designateStop() {
    isDesignateStop.current = true;
    setMapZoom(17);
    setMapCenterPos([StopPosition.PositionLat, StopPosition.PositionLon]);
    setSelectedStopId(StopID);
  }

  return (
    <li className={`bus_info ${selectedStopId === StopID ? 'bg-gray-300' : ''}`}>
      <BusRipples>
        <div className="bus_info_content" onClick={designateStop}>
          <div className={`bus_info_status ${background}`}>
            {showBusStatus({ ...stop, estimateTime, isPitStop, isPittingStop })}
          </div>
          <p className={`flex-1 ellipsis ${textColor}`}>
            {isEnglish ? StopName.En : StopName.Zh_tw}
          </p>
          <p className="text-secondary font-bold">{PlateNumb}</p>
          <div className={`${marker} absolute`}></div>
        </div>
      </BusRipples>
      {!isLastStop && <div className="marker_absolute"></div>}
    </li>
  )
}

export default BusStopInfo;
