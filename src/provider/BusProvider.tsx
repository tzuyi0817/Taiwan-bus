import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  type MutableRefObject,
} from 'react';
import type { Page } from '@/types/page';
import type { Bus, BusDirection, BusStops, BusStation } from '@/types/bus';

interface BusContext {
  page: Page;
  bus?: Bus;
  isOpenMap: boolean;
  mapZoom: number;
  mapCenterPos?: [number, number];
  updateTime: number;
  direction: BusDirection;
  busStops: BusStops;
  stations: Array<BusStation>;
  station?: BusStation;
  selectedStopId: string;
  isDesignateStop: MutableRefObject<boolean>;
  setPage: Dispatch<SetStateAction<Page>>;
  setBus: Dispatch<SetStateAction<Bus | undefined>>;
  toggleMap: Dispatch<SetStateAction<boolean>>;
  setMapZoom: Dispatch<SetStateAction<number>>;
  setMapCenterPos: Dispatch<SetStateAction<[number, number] | undefined>>;
  setUpdateTime: Dispatch<SetStateAction<number>>;
  setDirection: Dispatch<SetStateAction<BusDirection>>;
  setBusStops: Dispatch<SetStateAction<BusStops>>;
  setStations: Dispatch<SetStateAction<Array<BusStation>>>;
  setSelectedStopId: Dispatch<SetStateAction<string>>;
  setStation: Dispatch<SetStateAction<BusStation | undefined>>;
  resetMap: (isRestStation: boolean) => void;
  resetStation: () => void;
}

const BusContext = createContext<BusContext>({} as BusContext);

const BusProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>('route');
  const [isOpenMap, toggleMap] = useState(false);
  const [mapZoom, setMapZoom] = useState(17);
  const [mapCenterPos, setMapCenterPos] = useState<[number, number]>();
  const [bus, setBus] = useState<Bus>();
  const [updateTime, setUpdateTime] = useState(0);
  const [direction, setDirection] = useState<BusDirection>(0);
  const [busStops, setBusStops] = useState<BusStops>({ 0: [], 1: [] });
  const [stations, setStations] = useState<BusStation[]>([]);
  const [station, setStation] = useState<BusStation>();
  const [selectedStopId, setSelectedStopId] = useState('');
  const isDesignateStop = useRef(false);

  function resetMap(isRestStation: boolean) {
    setPage('route');
    toggleMap(false);
    setMapZoom(17);
    setMapCenterPos(undefined);
    setBus(undefined);
    setDirection(0);
    setBusStops({ 0: [], 1: [] });
    setSelectedStopId('');
    isRestStation && resetStation();
    isDesignateStop.current = false;
  }

  function resetStation() {
    setStations([]);
    setStation(undefined);
  }

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
        stations,
        station,
        isDesignateStop,
        selectedStopId,
        setPage,
        setBus,
        toggleMap,
        setMapZoom,
        setMapCenterPos,
        setUpdateTime,
        setDirection,
        setBusStops,
        setStations,
        setStation,
        setSelectedStopId,
        resetMap,
        resetStation,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

export const useBus = () => useContext(BusContext);

export default BusProvider;
