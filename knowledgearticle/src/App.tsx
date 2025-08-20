import React from "react";
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import ErrorBoundary from "./helper/ErrorBoundary";
import "./index.css";
import KnowledgeArticle from "./pages/KnowledgeArticle";


interface AppProps {
  onNavigate?: (path: string) => void;
  standalone?: boolean;
}

const MESSAGE_TYPE = 'knowledgearticle-mfe-navigation';

const AppRoutes: React.FC<{ standalone: boolean; onNavigate?: (path: string) => void }> = ({ standalone, onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!standalone && onNavigate) {
      // Only call onNavigate in integrated mode
      window.parent.postMessage({ type: MESSAGE_TYPE, path: location.pathname }, '*');
    }
  }, [location, standalone, onNavigate]);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <ErrorBoundary>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<KnowledgeArticle onNavigate={handleNavigation} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

const App: React.FC<AppProps> = ({ onNavigate, standalone = false }) => {
  const Router = standalone ? BrowserRouter : MemoryRouter;

  return (
    <Router basename={standalone ? "/knowledgearticle" : undefined}>
      <AppRoutes standalone={standalone} onNavigate={onNavigate} />
    </Router>
  );
};

export default App;
