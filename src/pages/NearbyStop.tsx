import { useBus } from '@/provider/BusProvider';
import BusCrumb from '@/components/common/BusCrumb';
import NearbyStopBlock from '@/components/nearbyStop/NearbyStopBlock';
import BusMap from '@/components/common/BusMap';
import BusDetail from '@/components/common/BusDetail';

function NearbyStop() {
  const { page, isOpenMap } = useBus();

  return (
    <div className="bus">
      <BusCrumb page={page} />
      <NearbyStopBlock fade={`${page === 'route' ? 'fadeIn' : 'fadeOut'}`} />
      <BusDetail fade={`${page === 'detail' ? 'fadeIn' : 'fadeOut'}`} />
      <BusMap fade={`${isOpenMap ? 'fadeIn' : 'fadeOut'}`} />
    </div>
  )
}

export default NearbyStop;
