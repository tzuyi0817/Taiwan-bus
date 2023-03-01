import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loading from '@/components/common/Loading';

const Index = lazy(() => import('@/pages/Index'));
const SearchBus = lazy(() => import('@/pages/SearchBus'));
const FavoriteStop = lazy(() => import('@/pages/FavoriteStop'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const ROUTE_CONFIG = [
  { path: '/', element: <Index /> },
  { path: '/searchbus', element: <SearchBus /> },
  { path: '/favoritestop', element: <FavoriteStop /> },
  { path: '*', element: <NotFound /> },
];

function Routes() {
  const elements = useRoutes(ROUTE_CONFIG);

  return (
    <Suspense fallback={<Loading />}>
      {elements}
    </Suspense>
  )
}

export default Routes;
