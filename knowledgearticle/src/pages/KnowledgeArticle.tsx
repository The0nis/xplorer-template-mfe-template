import React, { useState } from "react";

const KnowledgeArticle: React.FC<any> = ({ onNavigate }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Knowledge article</h1>
    </div>
  );
};

export default React.memo(KnowledgeArticle);
