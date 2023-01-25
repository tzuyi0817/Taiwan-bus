import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bus } from '@/types/bus';

interface State {
  favoriteList: Bus[];
}

const initialFavoriteSate: State = {
  favoriteList: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialFavoriteSate,
  reducers: {
    addFavorite(state, action: PayloadAction<Bus>) {
      state.favoriteList.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favoriteList = state.favoriteList.filter(({ RouteID }) => RouteID !== action.payload);
    }
  }
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
