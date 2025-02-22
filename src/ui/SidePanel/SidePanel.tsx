import { ConfigProvider, Space, theme } from "antd";
import React from "react";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { StylizedDivider } from "../components/StylizedDivider/StylizedDivider";
import { BehaviorName } from "./BehaviorName/BehaviorName";
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
import { ConfigOptions } from "./ConfigOptions/ConfigOptions";
import { Properties } from "./Properties/Properties";
import "./SidePanel.style.scss";
import { UploadTextures } from "./UploadTextures/UploadTextures";

export function SidePanel() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Divider: {
            marginLG: 8,
          },
        },
      }}
    >
      <div className="side-panel">
        <Space direction="vertical" style={{ width: "100%" }}>
          <ConfigOptions />
          <UploadTextures />
        </Space>

        <Typography variant={TypographyVariant.H2} className="side-panel__title">
          Properties
        </Typography>

        <Properties />

        <BehaviorName name="Behaviors" />

        <Space direction="vertical" style={{ width: "100%" }}>
          <LifetimeBehavior />
          <ScaleBehavior />
          <AlphaBehavior />
          <SpeedBehavior />
          <DirectionBehavior />
          <ColorBehavior />
          <RotationBehavior />
          <GravityBehavior />
          <SpawnShapeBehavior />
          <PathBehavior />
        </Space>

        {/*  <AdvancedBloomFilterEditor className="side-panel__bloom-filter-config" /> */}
      </div>
    </ConfigProvider>
  );
}
