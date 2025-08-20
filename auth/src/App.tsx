import React from "react";
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import ErrorBoundary from "./helper/ErrorBoundary";
import "./index.css";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AppProps {
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

const MESSAGE_TYPE = 'auth-mfe-navigation';

const AppRoutes: React.FC<{ standalone: boolean; onNavigate?: (path: string) => void }> = ({ standalone, onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!standalone
      // && onNavigate
    ) {
      // Only call onNavigate in integrated mode
      window.parent.postMessage({ type: MESSAGE_TYPE, path: location.pathname }, '*');
    }
  }, [location, standalone]);

  const handleNavigation = (path: string) => {
    navigate(path);
    // if (onNavigate) {
    //   console.log({ path })
    //   onNavigate(path);
    // }
  };

  return (
    <ErrorBoundary>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onNavigate={handleNavigation} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
      <ToastContainer />
    </ErrorBoundary>
  );
};

const App: React.FC<AppProps> = ({ onNavigate, standalone = false }) => {
  const Router = standalone ? BrowserRouter : MemoryRouter;

  return (
    <Router basename={standalone ? "/auth" : undefined}>
      <AppRoutes standalone={standalone} onNavigate={onNavigate} />
    </Router>
  );
};

export default App;