import { useTranslation } from 'react-i18next';
import { useBus } from '@/provider/BusProvider';
import { createImageSrc } from '@/utils/images';
import type { BusStation } from '@/types/bus';

interface Props {
  station: BusStation;
}

function NearbyStopStation({ station }: Props) {
  const { t, i18n: { language } } = useTranslation();
  const { setPage, setStation, setMapCenterPos, setMapZoom } = useBus(); 
  const { Stops, distance, StationPosition: { PositionLat, PositionLon } } = station;
  const isEnglish = language === 'en';
  const stationName = Stops[0].StopName;

  function goStopsPage() {
    setStation(station);
    setMapCenterPos([PositionLat, PositionLon]);
    setMapZoom(17);
    setPage('buses');
  }

  return (
    <li className="bus_item" onClick={goStopsPage}>
      <div className="bus_item_content items-center">
        <div className="max-w-[calc(100%-100px)]">
          <h1>{isEnglish ? stationName.En : stationName.Zh_tw}</h1>
          <p className="text-sm text-gray-600">{`${Stops.length} ${t('stop_sign')}`}</p>
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
