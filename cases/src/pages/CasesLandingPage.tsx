import React from "react";


interface CaseLandingProps {
  onNavigate?: (path: string) => void;
}


const CasesLandingPage: React.FC<CaseLandingProps> = ({ onNavigate }) => {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>CASES Module</h1>
    </div>
  );
};

export default CasesLandingPage;
