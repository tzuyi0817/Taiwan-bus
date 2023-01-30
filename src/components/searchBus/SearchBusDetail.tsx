import { useState, useEffect } from 'react';
import { useBus } from '@/provider/BusProvider';
import BusFavorite from '@/components/common/BusFavorite';
import { createImageSrc } from '@/utils/images';

interface Props {
  fade: string;
}

function SearchBusDetail({ fade }: Props) {
  const [tab, setTab] = useState(0);
  const { bus, setPage } = useBus();

  useEffect(() => {
    if (!bus) return;
    console.log(bus)
  }, [bus]);

  return (
    <div className={`w-full h-full ${fade} absolute top-10 left-0 bg-white`}>
      <div className="flex justify-between px-6 py-3">
        <div className="flex gap-3 cursor-pointer items-center" onClick={() => setPage('route')}>
          <img src={createImageSrc('icons/back.png')} alt="" />返回搜尋
        </div>
        <BusFavorite bus={bus} />
      </div>
      <p className="text-3xl font-bold text-center">{bus?.RouteName?.Zh_tw}</p>
      <p className="text-center mt-2 mb-5">{bus?.Operators?.[0]?.OperatorName?.Zh_tw}</p>
      <div className="flex">
        <div className={`searchBus_tab ${tab === 0 ? 'searchBus_tab-active' : ''}`} onClick={() => setTab(0)}>
          往<span>{bus?.DestinationStopNameZh}</span>
        </div>
        <div className={`searchBus_tab ${tab === 1 ? 'searchBus_tab-active' : ''}`} onClick={() => setTab(1)}>
          往<span>{bus?.DepartureStopNameZh}</span>
        </div>
      </div>
    </div>
  )
}

export default SearchBusDetail;
