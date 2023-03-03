import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { City } from '@/types/city';

interface State {
  currentCity: City | '';
}

const initialCitySate: State = {
  currentCity: '',
};

const citySlice = createSlice({
  name: 'city',
  initialState: initialCitySate,
  reducers: {
    updateCity(state, action: PayloadAction<City | ''>) {
      state.currentCity = action.payload;
    },
  }
});

export const cityActions = citySlice.actions;

export default citySlice.reducer;