import React from "react";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { AlphaBehavior } from "./Behaviors/AlphaBehavior/AlphaBehavior";
import { ColorBehavior } from "./Behaviors/ColorBehavior/ColorBehavior";
import { DirectionBehavior } from "./Behaviors/DirectionBehavior/DirectionBehavior";
import { GravityBehavior } from "./Behaviors/GravityBehavior/GravityBehavior";
import { LifetimeBehavior } from "./Behaviors/LifetimeBehavior/LifetimeBehavior";
import { PathBehavior } from "./Behaviors/PathBehavior/PathBehavior";
import { RotationBehavior } from "./Behaviors/RotationBehavior/RotationBehavior";
import { ScaleBehavior } from "./Behaviors/ScaleBehavior/ScaleBehavior";
import { SpawnShapeBehavior } from "./Behaviors/SpawnShapeBehavior/SpawnShapeBehavior";
import { SpeedBehavior } from "./Behaviors/SpeedBehavior/SpeedBehavior";
import { AppOptions } from "./ConfigOptions/AppOptions";
import { Properties } from "./Properties/Properties";
import "./SidePanel.style.scss";
import { UploadTextures } from "./UploadTextures/UploadTextures";

export function SidePanel() {
  return (
    <div className="side-panel">
      <div className="side-panel__config">
        <div className="side-panel__options">
          <AppOptions />
        </div>
        <UploadTextures />
      </div>

      <Typography variant={TypographyVariant.H2} className="side-panel__title">
        Properties
      </Typography>

      <div className="side-panel__properties">
        <Properties />
      </div>

      <Typography variant={TypographyVariant.H2} className="side-panel__title">
        Behaviors
      </Typography>

      <div className="side-panel__behaviors">
        <div className="side-panel__behaviors-item">
          <LifetimeBehavior />
        </div>
        <div className="side-panel__behaviors-item">
          <ScaleBehavior />
        </div>
        <div className="side-panel__behaviors-item">
          <AlphaBehavior />
        </div>
        <div className="side-panel__behaviors-item">
          <SpeedBehavior />
        </div>
        <div className="side-panel__behaviors-item">
          <DirectionBehavior />
        </div>
        <div className="side-panel__behaviors-item">
          <ColorBehavior />
        </div>
        <div className="side-panel__behaviors-item">
          <RotationBehavior />
        </div>
        <div className="side-panel__behaviors-item">
          <GravityBehavior />
        </div>
        <div className="side-panel__behaviors-item">
          <SpawnShapeBehavior />
        </div>
        <div className="side-panel__behaviors-item">
          <PathBehavior />
        </div>
      </div>

      {/*  <AdvancedBloomFilterEditor className="side-panel__bloom-filter-config" /> */}
    </div>
  );
}
