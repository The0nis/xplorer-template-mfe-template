import React from "react";
import {
  BrowserRouter as Router,
  MemoryRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "./helper/ErrorBoundary";
import "./index.css";
import UserManagementMain from "./pages/UserManagementMain";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface AppProps {
  initialEntries?: string[];
  onNavigate?: (path: string) => void;
  isStandalone?: boolean;
}

const MESSAGE_TYPE = '_usermanagement-mfe-navigation';

const AppRoutes: React.FC<{ isStandalone?: boolean }> = ({ isStandalone }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isStandalone) {
      // Communicate navigation events to parent app in integrated mode
      window.parent.postMessage({ type: MESSAGE_TYPE, path: location.pathname }, '*');
    }
  }, [location, isStandalone]);
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  console.log("🛠️ Checking env vars in usermanagement MFE:");
console.log("VITE_SECRETKEY:", import.meta.env.VITE_SECRETKEY);
console.log("VITE_ENCRYPTION_IV:", import.meta.env.VITE_ENCRYPTION_IV);


  return (
    <div>
      <ToastContainer />
      <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<UserManagementMain onNavigate={handleNavigation} />} />
      {/* <Route path="/view-teams/:teamsId/:teamName" element={<ViewTeamsDetails />} /> */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
    </div>
  );
};

const App: React.FC<AppProps> = ({ onNavigate, isStandalone = false }) => {
  const RouterComponent = isStandalone ? Router : MemoryRouter;

  return (
    <RouterComponent basename={isStandalone ? "/usermanagement" : undefined}>
      <ErrorBoundary>
        <AppRoutes isStandalone={isStandalone} />
      </ErrorBoundary>
    </RouterComponent>
  );
};

export default App;
