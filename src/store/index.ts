import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cityReducer from '@/store/city';
import favoriteReducer from '@/store/city';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [],
};

const reducer = combineReducers({
  city: cityReducer,
  favorite: favoriteReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
