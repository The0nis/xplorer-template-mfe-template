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
import ErrorBoundary from "./helper/ErrorBoundary";
import "./index.css";
import CasesLandingPage from "./pages/CasesLandingPage";
import { ToastContainer } from "react-toastify";

// const ActivitiesLazy = lazy(() => import("activities/activity-details"));

interface AppProps {
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

const MESSAGE_TYPE = "cases-mfe-navigation";

const AppRoutes: React.FC<{ standalone: boolean }> = ({ standalone }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!standalone) {
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
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={<CasesLandingPage onNavigate={handleNavigation} />}
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

const App: React.FC<AppProps> = ({ onNavigate, standalone = false }) => {
  const Router = standalone ? BrowserRouter : MemoryRouter;

  return (
    <Router basename={standalone ? "/cases" : undefined}>
      <AppRoutes standalone={standalone} />
    </Router>
  );
};

export default App;
function lazy(arg0: () => Promise<any>) {
  throw new Error("Function not implemented.");
}
