import { useState, useEffect } from 'react';
import { useBus } from '@/provider/BusProvider';
import { fetchStationBuses } from '@/apis/station';
import { createImageSrc } from '@/utils/images';

interface Props {
  fade: string;
}

function NearbyStopBus({ fade }: Props) {
  const [buses, setBuses] = useState([]);
  const { station, setPage, setStation } = useBus();

  useEffect(() => {
    if (!station) return setBuses([]);

    async function getStationBuses() {
      if (!station) return;
      const result = await fetchStationBuses(station);

      setBuses(result);
    }

    getStationBuses();
  }, [station])

  function backSearchPage() {
    setPage('route');
    setStation(undefined);
  }

  return (
    <div className={`bus_detail ${fade}`}>
      <div className="bus_detail_header">
        <div className="bus_detail_back" onClick={backSearchPage}>
          <img src={createImageSrc('icons/back.png')} alt="" />返回搜尋
        </div>
      </div>
    </div>
  )
}

export default NearbyStopBus;
