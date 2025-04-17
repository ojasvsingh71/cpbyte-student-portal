import {configureStore} from '@reduxjs/toolkit';
import dashboardSlice from './slices/index';
import AttendanceSlice from './slices/getDomainUserSlice';
import authSlice from './slices/authSlice';
import eventSlice from './slices/eventSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    attendance: AttendanceSlice,
    authSlice: authSlice,
    event:eventSlice
  },
})

export default store;