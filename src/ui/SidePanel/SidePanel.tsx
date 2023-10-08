import React from "react";
import { AdvancedBloomFilterEditor } from "./AdvancedBloomFilterEditor/AdvancedBloomFilterEditor";
import { EmitterConfigEditor } from "./EmitterConfigEditor/EmitterConfigEditor";
import "./SidePanel.style.scss";
import { UploadTextures } from "./UploadTextures/UploadTextures";

export function SidePanel() {
  return (
    <div className="side-panel">
      <UploadTextures className="side-panel__textures" />
      <EmitterConfigEditor className="side-panel__emitter-config" />
      <AdvancedBloomFilterEditor className="side-panel__bloom-filter-config" />
    </div>
  );
}
