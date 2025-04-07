import React from 'react'
import UserLayout from './pages/UserLayout'
import { Route, Routes } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import UserSchedule from './pages/UserSchedule'
import UserSettings from './pages/UserSettings'
import UserHelp from './pages/UserHelp'
import MarkAttendance from './pages/MarkAttendance'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
        <Route path="" element={<UserDashboard/>} />
        <Route path="Schedule" element={<UserSchedule/>} />
        <Route path="Attendance" element={<MarkAttendance/>} />
        <Route path="Settings" element={<UserSettings/>} />
        <Route path="Help" element={<UserHelp/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
