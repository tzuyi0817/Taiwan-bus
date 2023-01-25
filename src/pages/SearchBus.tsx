import { useState } from 'react';
import SearchBusCrumb from '@/components/searchBus/SearchBusCrumb';
import SearchBusBlock from '@/components/searchBus/SearchBusBlock';
import type { Page } from '@/types/page';

function SearchBus() {
  const [page, setPage] = useState<Page>('route');

  return (
    <div className="flex flex-col h-[calc(100vh-128px)]">
      <SearchBusCrumb page={page} setPage={setPage} />
      <SearchBusBlock />
    </div>
  )
}

export default SearchBus;
