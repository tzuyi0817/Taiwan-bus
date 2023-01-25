import { useState, useRef, useCallback, useEffect } from 'react';
import SearchBar from "@/components/common/SearchBar";
import SearchBusKeyboard from '@/components/searchBus/SearchBusKeyboard';
import { debounce } from '@/utils/common';

function SearchBusBlock() {
  const [keyword, setKeyword] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  // const handlerSearch = useCallback(debounce(setKeyword), []);


  useEffect(() => {
    if (keyword === '') return;
    searchInput.current?.focus();
  }, [keyword])

  return (
    <>
      <div className="bg-white p-5 shadow-sm flex-1 overflow-y-auto">
        <SearchBar
          placeholder="輸入公車路線 / 起迄方向名或關鍵字"
          keyword={keyword} setKeyword={setKeyword}
          ref={searchInput}
        />
      </div>
      <SearchBusKeyboard setKeyword={setKeyword} />
    </>
  )
}

export default SearchBusBlock;