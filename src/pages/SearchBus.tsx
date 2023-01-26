import { useState } from 'react';
import SearchBusCrumb from '@/components/searchBus/SearchBusCrumb';
import SearchBusBlock from '@/components/searchBus/SearchBusBlock';
import SearchBusMap from '@/components/searchBus/SearchBusMap';
import type { Page } from '@/types/page';

function SearchBus() {
  const [page, setPage] = useState<Page>('route');

  return (
    <div className="flex flex-col h-[calc(100vh-128px)] relative">
      <SearchBusCrumb page={page} setPage={setPage} />
      <SearchBusBlock fade={`${page === 'route' ? 'fadeIn' : 'fadeOut'}`} />
      <SearchBusMap fade={`${page === 'map' ? 'fadeIn' : 'fadeOut'}`} />
    </div>
  )
}

export default SearchBus;
