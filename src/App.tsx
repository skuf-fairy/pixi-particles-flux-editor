import React from "react";
import "./App.style.scss";
import { Editor } from "./ui/Editor/Editor";
import { InfoPanel } from "./ui/InfoPanel/InfoPanel";
import { SidePanel } from "./ui/SidePanel/SidePanel";
import { AppDIContainer } from "./ui/components/AppDiContainer/AppDIContainer";

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
