import React from "react";
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import ErrorBoundary from "./helper/ErrorBoundary";
import "./index.css";
import ActivitiesLandingPage from "./pages/ActivitiesLandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AppProps {
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

const MESSAGE_TYPE = 'activities-mfe-navigation';

const AppRoutes: React.FC<{ standalone: boolean }> = ({ standalone }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!standalone) {
      // Only call onNavigate in integrated mode
      window.parent.postMessage({ type: MESSAGE_TYPE, path: location.pathname }, '*');
    }
  }, [location, standalone]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return ( 
    <ErrorBoundary>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<ActivitiesLandingPage
          //  onNavigate={handleNavigation}
           
           />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
      <ToastContainer />
    </ErrorBoundary>
  );
};

const App: React.FC<AppProps> = ({ onNavigate, standalone = false }) => {
  const Router = standalone ? BrowserRouter : MemoryRouter;

  return (
    <Router basename={standalone ? "/activities" : undefined}>
      <AppRoutes standalone={standalone} />
    </Router>
  );
};

export default App;
