import React from "react";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import './index.css'

interface AppProps {
  initialEntries?: string[];
  onNavigate?: (path: string) => void;
  isStandalone?: boolean;
}

const App: React.FC<AppProps> = ({
  // initialEntries,
  onNavigate,
  // isStandalone
}) => {

  // const Router = isStandalone ? BrowserRouter : MemoryRouter;

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default App;
