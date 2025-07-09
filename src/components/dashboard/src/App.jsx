import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sidebar
import MyGBUSidebar from './components/sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Academic from './pages/Academic';
import Assignments from './pages/Assignments';
import Attendance from './pages/Attendance';
import ExamsResults from './pages/ExamsResults';
import FeeManagement from './pages/FeeManagement';
import Library from './pages/Library';
import SkillsLabs from './pages/SkillsLabs';
import Placement from './pages/Placement';
import Wellness from './pages/Wellness';
import ClubsSocieties from './pages/ClubsSocieties';
import Notifications from './pages/Notifications';
import GBUStore from './pages/Store';
import Impacts from './pages/Social_impacts';
import Goals from './pages/Goals';
import Documents from './pages/Documents';
import Hostels from './pages/Hostels';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <MyGBUSidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Core Pages */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/academic" element={<Academic />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/exams-results" element={<ExamsResults />} />
            <Route path="/fee-management" element={<FeeManagement />} />
            <Route path="/library" element={<Library />} />
            <Route path="/skills-labs" element={<SkillsLabs />} />
           <Route path="/placement" element={<Placement />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/clubs-societies" element={<ClubsSocieties />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/store" element={<GBUStore />} />
            <Route path="/impacts" element={<Impacts />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/hostels" element={<Hostels />} /> 

            {/* 404 Fallback */}
            <Route path="*" element={<div className="p-10 text-center text-2xl">404 - Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
