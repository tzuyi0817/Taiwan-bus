import { useState, useCallback } from 'react';
import SearchBar from "@/components/common/SearchBar";
import { debounce } from '@/utils/common';

function SearchBusBlock() {
  const [keyword, setKeyword] = useState('');
  // const handlerSearch = useCallback(debounce(setKeyword), []);

  return (
    <div className="bg-white p-5">
      <SearchBar placeholder="輸入公車路線 / 起迄方向名或關鍵字" keyword={keyword} setKeyword={setKeyword} />
    </div>
  )
}

export default SearchBusBlock;