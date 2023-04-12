import { useTranslation } from 'react-i18next';
import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import type { Bus } from '@/types/bus';

interface Props {
  bus: Bus;
  redirectDetailCallback?: () => void;
}

function BusItem({ bus, redirectDetailCallback }: Props) {
  const { setBus, setPage, setUpdateTime, setMapZoom } = useBus();
  const { t, i18n: { language } } = useTranslation();
  const isEnglish = language === 'en';
  const {
    RouteName,
    DepartureStopNameZh,
    DepartureStopNameEn,
    DestinationStopNameZh,
    DestinationStopNameEn,
    City,
  } = bus;
  const routeName = isEnglish ? RouteName.En : RouteName.Zh_tw;
  const terminalStop = isEnglish
    ? `${DepartureStopNameEn} - ${DestinationStopNameEn}`
    : `${DepartureStopNameZh} - ${DestinationStopNameZh}`;

  function redirectDetail() {
    redirectDetailCallback?.();
    setBus(bus);
    setPage('detail');
    setUpdateTime(0);
    setMapZoom(12);
  }

  return (
    <li className="bus_item" onClick={redirectDetail}>
      <div className="bus_item_content">
        <div>
          <h1>{routeName}</h1>
          <p className="text-sm text-gray-600">{terminalStop}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <BusFavorite bus={bus} type="bus" />
          <p className="text-sm text-gray-600">{t(`city.${City}`)}</p>
        </div>
      </div>
    </li>
  )
}

export default BusItem;
