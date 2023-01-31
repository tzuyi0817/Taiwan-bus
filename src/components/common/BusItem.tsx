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
    <li className="flex justify-between items-end py-3 border-b-[1px] border-[#E7E7E7]" onClick={goDetail}>
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
