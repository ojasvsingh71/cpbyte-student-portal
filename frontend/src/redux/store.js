import {configureStore} from '@reduxjs/toolkit';
import dashboardSlice from './slices/index';
import AttendanceSlice from './slices/getDomainUserSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    attendance: AttendanceSlice
  },
})

export default store;