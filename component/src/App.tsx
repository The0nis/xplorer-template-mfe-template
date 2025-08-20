import React from "react";
import { MemoryRouter, Routes, Route, BrowserRouter as Router, HashRouter } from "react-router-dom";
import Counter from "./components/counter/Counter";
import ErrorBoundary from "./helper/ErrorBoundary";

// Define the props type for the App component
interface AppProps {
  initialEntries?: string[];
  onNavigate?: (path: string) => void;
  isStandalone?: boolean;
}

// Use the AppProps type in the functional component
const App: React.FC<AppProps> = ({ initialEntries, onNavigate, isStandalone }) => {

  // const Router = isStandalone ? BrowserRouter: MemoryRouter
  return (
    <Router>
      <ErrorBoundary>
        <div>
          <Routes>
            <Route path="/" element={<Counter />} />
            <Route path="/home" element={<Counter />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;


// import { useState } from 'react'
// // import './App.css'
// import Button from './components/button/Button'
// // import Button from 'component/Button'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       {/* <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img className="logo react" alt="React logo" />
//         </a>
//       </div> */}
//       <h1>Vite + React</h1>
//       <div className="card">
//         {/* <Button size={'small'}>Back</Button> */}
//         <Button size={'small'}>Back</Button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App