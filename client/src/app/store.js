import { configureStore } from '@reduxjs/toolkit';
import weather from '../features/redux/weatherSlice';
import notifications from '../features/redux/notificationsSlice';

export const store = configureStore({
  reducer: {
    weather: weather,
    notifications: notifications,
  },
});
