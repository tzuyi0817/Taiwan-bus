import { useTranslation } from 'react-i18next';
import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import { getBusStopStatus, showBusStatus } from '@/utils/busStop';
import { BUS_STOP_STATUS_BACKGROUND, BusEvent } from '@/configs/bus';
import type { BusSite } from '@/types/bus';

interface Props {
  stop: BusSite;
}

function NearbyStopInfo({ stop }: Props) {
  const { t, i18n: { language } } = useTranslation();
  const { setBus, setPage, setUpdateTime, setMapZoom, setStation } = useBus();
  const {
    EstimateTime,
    StopStatus,
    RouteName,
    City,
    DepartureStopNameZh,
    DepartureStopNameEn,
    DestinationStopNameZh,
    DestinationStopNameEn,
    Direction,
  } = stop;
  const A2EventType = EstimateTime === 0 ? BusEvent.PIT : BusEvent.LEFT;
  const { estimateTime, isPitStop, isPittingStop } = getBusStopStatus({ EstimateTime, A2EventType });
  const background = isPitStop || isPittingStop ? 'bg-secondary' : BUS_STOP_STATUS_BACKGROUND[StopStatus];
  const isEnglish = language === 'en';
  const departureStopName = isEnglish ? DepartureStopNameEn : DepartureStopNameZh;
  const destinationStopName = isEnglish ? DestinationStopNameEn : DestinationStopNameZh;

  function goDetailPage() {
    setBus(stop);
    setPage('detail');
    setUpdateTime(0);
    setMapZoom(12);
    setStation(undefined);
  }

  return (
    <li className="bus_info" onClick={goDetailPage}>
      <div className="bus_info_content py-3 px-0 w-auto">
        <div className={`bus_info_status ${background}`}>
          {showBusStatus({ A2EventType, estimateTime, isPitStop, isPittingStop, EstimateTime, StopStatus })}
        </div>
        <div className="flex flex-1 flex-col gap-1 justify-center ellipsis">
          <h1 className="ellipsis">{isEnglish ? RouteName.En : RouteName.Zh_tw}</h1>
          <p className="text-sm text-gray-600 ellipsis">
            {t('to')} {Direction === 0 ? destinationStopName : departureStopName}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <BusFavorite site={stop} type="site" />
          <p className="text-sm text-gray-600">{t(`city.${City}`)}</p>
        </div>
      </div>
    </li>
  )
}

export default NearbyStopInfo;
