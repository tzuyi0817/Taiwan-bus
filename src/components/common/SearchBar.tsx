import {
  useCallback,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { createImageSrc } from '@/utils/images';
import { debounce } from '@/utils/common';

interface Props {
  placeholder: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

function SearchBar({ placeholder, setKeyword }: Props) {
  const handlerSearch = useCallback(debounce(setKeyword), []);

  return (
    <div className="relative">
      <input
        type="text"
        className="searchBar"
        onChange={(event) => handlerSearch(event.target.value)}
        placeholder={placeholder}
      />
      <img
        src={createImageSrc('icon/search.png')}
        alt=""
        className="absolute top-1/2 right-6 -translate-y-1/2"
      />
    </div>
  )
}

export default SearchBar;
