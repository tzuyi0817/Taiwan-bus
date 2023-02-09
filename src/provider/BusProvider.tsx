import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { Page } from '@/types/page';
import type { Bus, BusDirection, BusStops } from '@/types/bus';

interface BusContext {
  page: Page;
  bus?: Bus;
  isOpenMap: boolean;
  mapZoom: number;
  mapCenterPos?: [number, number];
  updateTime: number;
  direction: BusDirection;
  busStops: BusStops;
  setPage: Dispatch<SetStateAction<Page>>;
  setBus: Dispatch<SetStateAction<Bus | undefined>>;
  toggleMap: Dispatch<SetStateAction<boolean>>;
  setMapZoom: Dispatch<SetStateAction<number>>;
  setMapCenterPos: Dispatch<SetStateAction<[number, number] | undefined>>;
  setUpdateTime: Dispatch<SetStateAction<number>>;
  setDirection: Dispatch<SetStateAction<BusDirection>>;
  setBusStops: Dispatch<SetStateAction<BusStops>>;
}

const BusContext = createContext<BusContext>({} as BusContext);

const BusProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>('route');
  const [isOpenMap, toggleMap] = useState(false);
  const [mapZoom, setMapZoom] = useState(12);
  const [mapCenterPos, setMapCenterPos] = useState<[number, number]>();
  const [bus, setBus] = useState<Bus>();
  const [updateTime, setUpdateTime] = useState(0);
  const [direction, setDirection] = useState<BusDirection>(0);
  const [busStops, setBusStops] = useState<BusStops>({ 0: [], 1: [] });

  return (
    <BusContext.Provider
      value={{
        page,
        bus,
        isOpenMap,
        mapZoom,
        mapCenterPos,
        updateTime,
        direction,
        busStops,
        setPage,
        setBus,
        toggleMap,
        setMapZoom,
        setMapCenterPos,
        setUpdateTime,
        setDirection,
        setBusStops,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

export const useBus = () => useContext(BusContext);

export default BusProvider;
