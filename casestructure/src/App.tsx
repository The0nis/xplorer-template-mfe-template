import React from "react";
import {
  BrowserRouter as Router,
  MemoryRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import ErrorBoundary from "./helper/ErrorBoundary";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CaseStructurePage from "./pages/CaseStructurePage";


interface AppProps {
  initialEntries?: string[];
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

const MESSAGE_TYPE = '_casestructure-mfe-navigation';

const AppRoutes: React.FC<{ standalone: boolean }> = ({ standalone }) => {
  const location = useLocation();
  // const navigate = useNavigate();

  React.useEffect(() => {
    if (!standalone) {
      // Only call onNavigate in integrated mode
      window.parent.postMessage(
        { type: MESSAGE_TYPE, path: location.pathname },
        "*"
      );
    }
  }, [location, standalone]);


  return (
    <ErrorBoundary>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<CaseStructurePage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

const App: React.FC<AppProps> = ({ onNavigate, standalone = false }) => {
  const Router = standalone ? BrowserRouter : MemoryRouter;

  return (
    <Router basename={standalone ? "/case-structure" : undefined}>
      <AppRoutes standalone={standalone} />
    </Router>
  );
};

export default App;
