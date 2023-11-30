import { createSlice } from '@reduxjs/toolkit';
import data from '../assets/data/data.json';

export interface AppState {
  data: {
    name: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    revenue: number;
  }[];
  filteredData: {
    name: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    revenue: number;
  }[];
  filter: {
    search: string;
    balance: number;
  };
}

const initialState: AppState = {
  data: data.stores,
  filteredData: data.stores,
  filter: {
    search: '',
    balance: 15000,
  },
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.filteredData = action.payload;
    },
    setSearch: (state, action) => {
      state.filter.search = action.payload;
    },
    setBalance: (state, action) => {
      state.filter.balance = action.payload;
    },
  },
});

export const { setSearch, setBalance, setData } = dataSlice.actions;

export default dataSlice.reducer;
