import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OptionsScreen from './OptionsScreen';
import GradesPage from './pages/Grades';
import TimeTablePage from './pages/TimeTable';
import BehaviorPage from './pages/Behavior';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Routes>
        <Route path="/" element={<OptionsScreen />} />
        <Route path="grades" element={<GradesPage />} />
        <Route path="timetable" element={<TimeTablePage />} />
        <Route path="behavior" element={<BehaviorPage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;