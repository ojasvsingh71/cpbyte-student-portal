import {configureStore} from '@reduxjs/toolkit';
import dashboardSlice from './slices/profileSlice';
import AttendanceSlice from './slices/getDomainUserSlice';
import authSlice from './slices/authSlice';
import eventSlice from './slices/eventSlice';
import markAttendance from './slices/attendanceSlice';
import SettingsSlice from './slices/settingsSlice'

const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    attendance: AttendanceSlice,
    authSlice: authSlice,
    event:eventSlice,
    markAttendance:markAttendance,
    settings:SettingsSlice
  },
})

export default store;