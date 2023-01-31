import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { Page } from '@/types/page';
import type { Bus } from '@/types/bus';

interface BusContext {
  page: Page;
  bus?: Bus;
  isOpenMap: boolean;
  updateTime: number;
  setPage: Dispatch<SetStateAction<Page>>;
  setBus: Dispatch<SetStateAction<Bus | undefined>>;
  toggleMap: Dispatch<SetStateAction<boolean>>;
  setUpdateTime: Dispatch<SetStateAction<number>>;
}

const BusContext = createContext<BusContext>({} as BusContext);

const BusProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>('route');
  const [isOpenMap, toggleMap] = useState(false);
  const [bus, setBus] = useState<Bus>();
  const [updateTime, setUpdateTime] = useState(0);

  return (
    <BusContext.Provider
      value={{
        page,
        bus,
        isOpenMap,
        updateTime,
        setPage,
        setBus,
        toggleMap,
        setUpdateTime,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

export const useBus = () => useContext(BusContext);

export default BusProvider;
