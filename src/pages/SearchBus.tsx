import { useBus } from '@/provider/BusProvider';
import BusCrumb from '@/components/common/BusCrumb';
import SearchBusBlock from '@/components/searchBus/SearchBusBlock';
import BusMap from '@/components/common/BusMap';
import BusDetail from '@/components/common/BusDetail';

function SearchBus() {
  const { page, isOpenMap } = useBus();

  return (
    <div className="bus">
      <BusCrumb page={page} />
      <SearchBusBlock fade={`${page === 'route' ? 'fadeIn' : 'fadeOut'}`} />
      <BusDetail fade={`${page === 'detail' ? 'fadeIn' : 'fadeOut'}`} />
      <BusMap fade={`${isOpenMap ? 'fadeIn' : 'fadeOut'}`} />
    </div>
  )
}

export default SearchBus;
