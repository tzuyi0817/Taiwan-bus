import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import BusProvider from '@/provider/BusProvider';
import store from '@/store';
import App from '@/App';
import '@/style/index.css';
import '@/style/tailwind.css';
import 'leaflet/dist/leaflet.css';
import '@/i18n';
import ScrollToTop from '@/hooks/useScrollToTop';
import generateToken from '@/utils/generateToken';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const persistor = persistStore(store);

generateToken();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BusProvider>
            <ScrollToTop />
            <App />
          </BusProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
