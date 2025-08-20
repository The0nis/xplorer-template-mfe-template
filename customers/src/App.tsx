import React from "react";
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Customer from "./pages/Customer";
import './index.css';

interface AppProps { 
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

const MESSAGE_TYPE = 'customer-mfe-navigation';

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
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Customer onNavigate={handleNavigation} />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
};

const App: React.FC<AppProps> = ({ onNavigate, standalone = false }) => {
  const Router = standalone ? BrowserRouter : MemoryRouter;
  console.log({ Router, standalone })

  return (
    <Router basename={standalone ? "/customers" : undefined}>
      <AppRoutes standalone={standalone} />
    </Router>
  );
};

export default App;