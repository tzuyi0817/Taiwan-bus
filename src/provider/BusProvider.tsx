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
  setPage: Dispatch<SetStateAction<Page>>;
  setBus: Dispatch<SetStateAction<Bus | undefined>>;
  toggleMap: Dispatch<SetStateAction<boolean>>;
}

const BusContext = createContext<BusContext>({} as BusContext);

const BusProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>('route');
  const [isOpenMap, toggleMap] = useState(false);
  const [bus, setBus] = useState<Bus>();

  return (
    <BusContext.Provider
      value={{
        page,
        bus,
        isOpenMap,
        setPage,
        setBus,
        toggleMap,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

export const useBus = () => useContext(BusContext);

export default BusProvider;
