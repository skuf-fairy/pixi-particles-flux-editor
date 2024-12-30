import { Factory, token } from "brandi";
import { Container, EventEmitter } from "pixi.js";
import { EditorApp } from "src/modules/EditorApp";
// import { AdvancedBloomFilterConfig } from "src/services/AdvancedBloomFilterConfig";
import { AlphaBehaviorStore } from "src/services/AlphaBehaviorStore/AlphaBehaviorStore";
import { ColorBehaviorStore } from "src/services/ColorBehaviorStore/ColorBehaviorStore";
import { DirectionBehaviorStore } from "src/services/DirectionBehaviorStore/DirectionBehaviorStore";
import { EmitterConfigStore } from "src/services/EmitterConfigStore";
import { GravityBehaviorStore } from "src/services/GravityBehaviorStore/GravityBehaviorStore";
import { LifetimeBehaviorStore } from "src/services/LifetimeBehaviorStore/LifetimeBehaviorStore";
import { PathBehaviorStore } from "src/services/PathBehaviorStore/PathBehaviorStore";
import { RotationBehaviorStore } from "src/services/RotationBehaviorStore/RotationBehaviorStore";
import { ScaleBehaviorStore } from "src/services/ScaleBehaviorStore/ScaleBehaviorStore";
import { SpawnShapeBehaviorStore } from "src/services/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { SpeedBehaviorStore } from "src/services/SpeedBehaviorStore/SpeedBehaviorStore";
import { TexturesStore } from "src/services/TexturesStore/TexturesStore";

export const DI_TOKENS = {
  editorApp: token<EditorApp>("editorApp"),
  eventEmitter: token<EventEmitter>("eventEmitter"),
  // advancedBloomFilterConfig: token<AdvancedBloomFilterConfig>("AdvancedBloomFilterConfig"),
  // stores
  emitterConfigStore: token<EmitterConfigStore>("emitterConfigStore"),
  alphaBehaviorStore: token<AlphaBehaviorStore>("alphaBehaviorStore"),
  scaleBehaviorStore: token<ScaleBehaviorStore>("scaleBehaviorStore"),
  speedBehaviorStore: token<SpeedBehaviorStore>("speedBehaviorStore"),
  colorBehaviorStore: token<ColorBehaviorStore>("colorBehaviorStore"),
  spawnShapeBehaviorStore: token<SpawnShapeBehaviorStore>("spawnShapeBehaviorStore"),
  lifetimeBehaviorStore: token<LifetimeBehaviorStore>("lifetimeBehaviorStore"),
  directionBehaviorStore: token<DirectionBehaviorStore>("directionBehaviorStore"),
  texturesStore: token<TexturesStore>("texturesStore"),
  rotationBehaviorStore: token<RotationBehaviorStore>("rotationBehaviorStore"),
  gravityBehaviorStore: token<GravityBehaviorStore>("gravityBehaviorStore"),
  pathBehaviorStore: token<PathBehaviorStore>("pathBehaviorStore"),
};
