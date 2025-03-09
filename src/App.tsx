import React from "react";
import "./App.style.scss";
import { AppDIContainer } from "./ui/components/AppDiContainer/AppDIContainer";
import { Editor } from "./ui/components/Editor/Editor";
import { InfoPanel } from "./ui/components/InfoPanel/InfoPanel";
import { SidePanel } from "./ui/components/SidePanel/SidePanel";
import { TopBar } from "./ui/components/TopBar/TopBar";

export function App() {
  return (
    <AppDIContainer>
      <div className="page">
        <TopBar />
        <InfoPanel />
        <Editor />
        <SidePanel />
      </div>
    </AppDIContainer>
  );
}
