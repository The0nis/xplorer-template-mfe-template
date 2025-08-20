import React from "react";
import {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./index.css";
import SettingsMain from "./pages/GeneralSettingsMain";
import ErrorBoundary from "./helper/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface AppProps {
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

const MESSAGE_TYPE = '_gensettings-mfe-navigation';

const AppRoutes: React.FC<{ standalone: boolean }> = ({ standalone }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!standalone) {
      console.log("SettingsApp-location", location);
      // Only call onNavigate in integrated mode
      window.parent.postMessage(
        { type: MESSAGE_TYPE, path: location.pathname },
        "*"
      );
    }
  }, [location, standalone]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <ErrorBoundary>
      <div>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/home" replace />}
          />
          <Route path="/home" element={<SettingsMain />} />
          <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

const App: React.FC<AppProps> = ({ onNavigate, standalone = false }) => {
  const Router = standalone ? BrowserRouter : MemoryRouter;

  return (
    <Router basename={standalone ? "/settings" : undefined}>
      <AppRoutes standalone={standalone} />
    </Router>
  );
};

export default App;
