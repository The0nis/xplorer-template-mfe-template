

import React from "react";
import {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import ErrorBoundary from "./helper/ErrorBoundary";
import "./index.css";
import CCMSLandingPage from "./pages/CCMSLandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MESSAGE_TYPE = "ccms-mfe-navigation";

interface AppProps {
  initialEntries?: string[];
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

const AppRoutes: React.FC<AppProps> = ({ onNavigate, standalone }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!standalone) {
      window.parent.postMessage(
        { type: MESSAGE_TYPE, path: location.pathname },
        "*"
      );
      onNavigate?.(location.pathname);
    }
  }, [location, standalone, onNavigate]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={<CCMSLandingPage onNavigate={handleNavigation} />}
        />
        {/* <Route
          path="/report-details/:id"
          element={<ReportViewPageWrapper onNavigate={handleNavigation} />}
        /> */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes> 
      <ToastContainer />
    </ErrorBoundary>
  );
};

const App: React.FC<AppProps> = ({ onNavigate, standalone = true }) => {
  const Router = standalone ? BrowserRouter : MemoryRouter;

  return (
    <Router basename={standalone ? "/ccms" : undefined}>
      <AppRoutes standalone={standalone} />
    </Router>
  );
};

export default App;
function lazy(arg0: () => Promise<any>) {
  throw new Error("Function not implemented.");
}
