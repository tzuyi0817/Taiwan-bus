import SearchBusCrumb from '@/components/searchBus/SearchBusCrumb';
import SearchBusBlock from '@/components/searchBus/SearchBusBlock';

function SearchBus() {
  return (
    <div className="flex flex-col h-[calc(100vh-128px)]">
      <SearchBusCrumb />
      <SearchBusBlock />
    </div>
  )
}

export default SearchBus;
