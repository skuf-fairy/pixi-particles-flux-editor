import React from "react";
import { Editor } from "../Editor/Editor";
import { InfoPanel } from "../InfoPanel/InfoPanel";
import { RestartButton } from "../RestartButton/RestartButton";
import { SidePanel } from "../SidePanel/SidePanel";
import { TopBar } from "../TopBar/TopBar";
import "./MainPage.style.scss";

export function MainPage() {
  return (
    <>
      <div className="page">
        <TopBar />
        <div className="page__container">
          <div style={{ position: "relative", width: "100%" }}>
            <Editor />
            <RestartButton />
          </div>
          <SidePanel />
        </div>
      </div>
      <InfoPanel />
    </>
  );
}
