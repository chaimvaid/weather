import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { setMsgAsync, Message } from './notificationsSlice';

// Fetch weather data with filters and pagination
export const getWeatherDataAsync = createAsyncThunk(
  'weather/getWeatherData',
  async ({ filters, page }, { dispatch }) => {
    try {
      const response = await axios.get('/api/weather', {
        params: { ...filters, page }
      });
      return response.data;
    } catch (e) {
      dispatch(setMsgAsync(new Message(e.response.data).getAction()));
      return null;
    }
  }
);

const initialState = {
  loading: false,
  weatherData: [],
  filters: {
    city: '',
    temperatureMin: '',
    temperatureMax: '',
    fromDate: null,
    toDate: null,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  }
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.pagination.totalItems = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherDataAsync.fulfilled, (state, action) => {
        if (action.payload === null) {
          state.loading = false;
          return;
        }
        state.weatherData = action.payload.data;
        state.pagination.totalItems = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(getWeatherDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeatherDataAsync.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const getWeatherData = (state) => state.weather.weatherData;
export const getLoadingWeatherData = (state) => state.weather.loading;
export const getWeatherFilters = (state) => state.weather.filters;
export const getPagination = (state) => state.weather.pagination;

export const { setFilters, setCurrentPage, setTotalItems } = weatherSlice.actions;

export default weatherSlice.reducer;
