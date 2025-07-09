import { useState } from "react";
import { Button } from "../components/ui/button";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/modules/Dashboard";
import ProfileModule from "../components/modules/ProfileModule";
import AcademicModule from "../components/modules/AcademicModule";
import AttendanceModule from "../components/modules/AttendanceModule";
import AssignmentsModule from "../components/modules/AssignmentsModule";
import ExamsModule from "../components/modules/ExamsModule";
import FeesModule from "../components/modules/FeesModule";
import LibraryModule from "../components/modules/LibraryModule";
import SkillsModule from "../components/modules/SkillsModule";
import PlacementModule from "../components/modules/PlacementModule";
import WellnessModule from "../components/modules/WellnessModule";
import DocumentVaultModule from "../components/modules/DocumentVaultModule";
import ClubsModule from "../components/modules/ClubsModule";
import NotificationsModule from "../components/modules/NotificationsModule";
import GBUStoreModule from "../components/modules/GBUStoreModule";
import SocialImpactModule from "../components/modules/SocialImpactModule";
import GoalTrackerModule from "../components/modules/GoalTrackerModule";
import HostelMessModule from "../components/modules/HostelMessModule";
import GrievanceModule from "../components/modules/GrievanceModule";
import SOSAlert from "../components/emergency/SOSAlert";
import { Menu } from "lucide-react";

// Removed TypeScript interface; props are accepted dynamically

const MainDashboard = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardHome user={user} />;
      case "profile":
        return <ProfileModule user={user} />;
      case "academic":
        return <AcademicModule user={user} />;
      case "attendance":
        return <AttendanceModule user={user} />;
      case "assignments":
        return <AssignmentsModule user={user} />;
      case "exams":
        return <ExamsModule user={user} />;
      case "fees":
        return <FeesModule user={user} />;
      case "library":
        return <LibraryModule user={user} />;
      case "skills":
        return <SkillsModule user={user} />;
      case "placement":
        return <PlacementModule user={user} />;
      case "wellness":
        return <WellnessModule user={user} />;
      case "clubs":
        return <ClubsModule user={user} />;
      case "documents":
        return <DocumentVaultModule user={user} />;
      case "notifications":
        return <NotificationsModule user={user} />;
      case "store":
        return <GBUStoreModule user={user} />;
      case "social":
        return <SocialImpactModule user={user} />;
      case "goals":
        return <GoalTrackerModule user={user} />;
      case "hostel":
        return <HostelMessModule user={user} />;
      case "grievance":
        return <GrievanceModule user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        onLogout={onLogout}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="font-semibold text-gray-900">MyGBU Smart Campus</h1>
          <div className="w-10" />
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderActiveModule()}
        </main>
      </div>

      {/* SOS Emergency Alert - Available on all pages */}
      <SOSAlert />
    </div>
  );
};

export default MainDashboard;
