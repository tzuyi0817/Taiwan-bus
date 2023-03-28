import { useBus } from '@/provider/BusProvider';
import BusCrumb from '@/components/common/BusCrumb';
import FavoriteStopBlock from '@/components/favoriteStop/FavoriteStopBlock';

function FavoriteStop() {
  const { page } = useBus();

  return (
    <div className="bus">
      <BusCrumb page={page} />
      <FavoriteStopBlock />
    </div>
  )
}

export default FavoriteStop;
