import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import UserLayout from './pages/UserLayout';
import UserDashboard from './pages/UserDashboard';
import UserSchedule from './pages/UserSchedule';
import UserSettings from './pages/UserSettings';
import UserHelp from './pages/UserHelp';
import MarkAttendance from './pages/MarkAttendance';
import LoginPage from './pages/LoginPage';
import UnauthProtected from './pages/UnauthProtected';
import TrackerDashboard from './pages/TrackerDashboard';
import TrackerManagement from './pages/TrackerManagement';
import AddProject from './componenets/AddProject';
import RemoveProject from './componenets/RemoveProject';
import SkillManagement from './componenets/SkillManagement';
import AddPlatforms from './componenets/AddPlatform';
import Leaderboard from './pages/Leaderboard';
import TargetUserDashboard from './pages/TargetUserDashboard';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<UnauthProtected><UserLayout /></UnauthProtected>}>
          <Route index element={<UserDashboard />} />
          <Route path="Schedule" element={<UserSchedule />} />
          <Route path="Attendance" element={<MarkAttendance />} />
          <Route path="Settings" element={<UserSettings />} />
          <Route path="Help" element={<UserHelp />} />
          <Route path="Tracker" element={<TrackerDashboard />} />
          <Route path="Tracker/:library_id" element={<TargetUserDashboard />} />
          <Route path="Leaderboard" element={<Leaderboard />} />
          <Route path="ManageTracker" element={<TrackerManagement />}>
            <Route path="AddProject" element={<AddProject />} />
            <Route path="RemoveProject" element={<RemoveProject />} />
            <Route path="SkillManagement" element={<SkillManagement />} />
            <Route index element={<AddPlatforms />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<div className="text-white p-8">404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
