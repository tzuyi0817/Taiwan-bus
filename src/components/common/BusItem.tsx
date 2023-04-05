import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import { CITY_ABRIDGE_MAP } from '@/configs/city';
import type { Bus } from '@/types/bus';

interface Props {
  bus: Bus;
  redirectDetailCallback?: () => void;
}

function BusItem({ bus, redirectDetailCallback }: Props) {
  const { setBus, setPage, setUpdateTime, setMapZoom } = useBus();
  const { RouteName, DepartureStopNameZh, DestinationStopNameZh, City } = bus;

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
          <h1>{RouteName.Zh_tw}</h1>
          <p className="text-sm text-gray-600">{`${DepartureStopNameZh} - ${DestinationStopNameZh}`}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <BusFavorite bus={bus} type="bus" />
          <p className="text-sm text-gray-600">{CITY_ABRIDGE_MAP[City]}</p>
        </div>
      </div>
    </li>
  )
}

export default BusItem;
