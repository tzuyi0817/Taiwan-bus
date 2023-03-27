import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bus, BusSite } from '@/types/bus';

interface State {
  favoriteBus: Bus[];
  favoriteSite: BusSite[];
}

const initialFavoriteSate: State = {
  favoriteBus: [],
  favoriteSite: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialFavoriteSate,
  reducers: {
    addFavoriteBus(state, action: PayloadAction<Bus>) {
      state.favoriteBus.push(action.payload);
    },
    removeFavoriteBus(state, action: PayloadAction<string>) {
      state.favoriteBus = state.favoriteBus.filter(({ RouteID }) => RouteID !== action.payload);
    },
    addFavoriteSite(state, action: PayloadAction<BusSite>) {
      state.favoriteSite.push(action.payload);
    },
    removeFavoriteSite(state, action: PayloadAction<BusSite>) {
      const { RouteID, Direction } = action.payload;
  
      state.favoriteSite = state.favoriteSite.filter(site => {
        return site.RouteID !== RouteID && site.Direction !== Direction;
      });
    }
  }
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
