import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import type { Bus } from '@/types/bus';

interface Props {
  bus: Bus;
}

function BusItem({ bus }: Props) {
  const { setBus, setPage, setUpdateTime } = useBus();
  const { RouteName, DepartureStopNameZh, DestinationStopNameZh, City } = bus;

  function goDetail() {
    setBus(bus);
    setPage('detail');
    setUpdateTime(0);
  }

  return (
    <li className="bus_item" onClick={goDetail}>
      <div>
        <h1>{RouteName.Zh_tw}</h1>
        <p className="text-sm text-gray-600">{`${DepartureStopNameZh} - ${DestinationStopNameZh}`}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <BusFavorite bus={bus} />
        <p className="text-sm text-gray-600">{City}</p>
      </div>
    </li>
  )
}

export default BusItem;
