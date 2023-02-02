import { useBus } from '@/provider/BusProvider';
import SearchBusCrumb from '@/components/searchBus/SearchBusCrumb';
import SearchBusBlock from '@/components/searchBus/SearchBusBlock';
import SearchBusMap from '@/components/searchBus/SearchBusMap';
import SearchBusDetail from '@/components/searchBus/SearchBusDetail';

function SearchBus() {
  const { page } = useBus();

  return (
    <div className="flex flex-col h-[calc(100vh-128px)] relative">
      <SearchBusCrumb page={page} />
      <SearchBusBlock fade={`${page === 'route' ? 'fadeIn' : 'fadeOut'}`} />
      <SearchBusDetail fade={`${page === 'detail' ? 'fadeIn' : 'fadeOut'}`} />
      <SearchBusMap />
    </div>
  )
}

export default SearchBus;
