import { useBus } from '@/provider/BusProvider';
import BusCrumb from '@/components/common/BusCrumb';
import SearchBusBlock from '@/components/searchBus/SearchBusBlock';
import BusMap from '@/components/common/BusMap';
import BusDetail from '@/components/common/BusDetail';

function SearchStop() {
  const { page, isOpenMap } = useBus();

  return (
    <div className="searchBus">
      <BusCrumb page={page} />
      <SearchBusBlock fade={`${page === 'route' ? 'fadeIn' : 'fadeOut'}`} />
      <BusDetail fade={`${page === 'detail' ? 'fadeIn' : 'fadeOut'}`} />
      <BusMap fade={`${isOpenMap ? 'fadeIn' : 'fadeOut'}`} />
    </div>
  )
}

export default SearchStop;
