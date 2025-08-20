import React from "react";
export interface RootState {
  gensettings: any;
}

function SettingsMain() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1>GEN SETTINGS</h1>
    </div>
  );
}

export default SettingsMain;
