import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  favoriteList: [];
}

const initialFavoriteSate: State = {
  favoriteList: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialFavoriteSate,
  reducers: {
    // addFavorite(state, action: PayloadAction<>) {
    //   state.favoriteList.push(action.payload);
    // },
    // removeFavorite(state, action: PayloadAction<>) {
    //   state.favoriteList = state.favoriteList.filter(action.payload);
    // }
  }
});

export const cityActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
