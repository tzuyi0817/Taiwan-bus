import { useState } from 'react';
import SearchBar from "@/components/common/SearchBar";

function SearchBusBlock() {
  const [keyword, setKeyword] = useState('');

  return (
    <div className="bg-white p-5">
      <SearchBar placeholder="輸入公車路線 / 起迄方向名或關鍵字" setKeyword={setKeyword} />
    </div>
  )
}

export default SearchBusBlock;