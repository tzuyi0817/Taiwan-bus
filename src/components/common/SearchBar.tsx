import {
  forwardRef,
  type Dispatch,
  type SetStateAction,
  type LegacyRef,
} from 'react';
import { createImageSrc } from '@/utils/images';

interface Props {
  placeholder: string;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

const icon = 'absolute top-1/2 right-3 -translate-y-1/2';

function SearchBar(
  { placeholder, keyword, setKeyword }: Props,
  ref: LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <div className="relative mx-5">
      <input
        type="text"
        className="searchBar"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder={placeholder}
        ref={ref}
      />
      {keyword 
        ? <span className={`${icon} cursor-pointer hover:text-primary text-base transition-colors`} onClick={() => setKeyword('')}>✖</span>
        : <img src={createImageSrc(`icons/${keyword ? 'close' : 'search'}.png`)} alt="" className={icon} />
      }
    </div>
  )
}

export default forwardRef(SearchBar);
