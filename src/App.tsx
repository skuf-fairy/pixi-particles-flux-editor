import React from "react";
import "./App.style.scss";
import { AppDIContainer } from "./ui/components/AppDiContainer/AppDIContainer";
import { Editor } from "./ui/components/Editor/Editor";
import { InfoPanel } from "./ui/components/InfoPanel/InfoPanel";
import { SidePanel } from "./ui/components/SidePanel/SidePanel";

export function App() {
  return (
    <AppDIContainer>
      <div className="page">
        <InfoPanel />
        <Editor />
        <SidePanel />
      </div>
    </AppDIContainer>
  );
}
