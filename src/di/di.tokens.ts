import { Factory, token } from "brandi";
import { Container, EventEmitter } from "pixi.js";
import { EditorApp } from "src/modules/EditorApp";
// import { AdvancedBloomFilterConfig } from "src/services/AdvancedBloomFilterConfig";
import { BehaviorStore } from "src/services/BehaviorStore";
import { ColorBehaviorStore } from "src/services/ColorBehaviorStore/ColorBehaviorStore";
import { DirectionBehaviorStore } from "src/services/DirectionBehaviorStore/DirectionBehaviorStore";
import { EmitterConfigStore } from "src/services/EmitterConfigStore";
import { GravityBehaviorStore } from "src/services/GravityBehaviorStore/GravityBehaviorStore";
import { LifetimeBehaviorStore } from "src/services/LifetimeBehaviorStore/LifetimeBehaviorStore";
import { PathBehaviorStore } from "src/services/PathBehaviorStore/PathBehaviorStore";
import { SpawnShapeBehaviorStore } from "src/services/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { TexturesStore } from "src/services/TexturesStore/TexturesStore";

export const DI_TOKENS = {
  editorApp: token<EditorApp>("editorApp"),
  eventEmitter: token<EventEmitter>("eventEmitter"),
  // advancedBloomFilterConfig: token<AdvancedBloomFilterConfig>("AdvancedBloomFilterConfig"),
  // stores
  emitterConfigStore: token<EmitterConfigStore>("emitterConfigStore"),
  alphaBehaviorStore: token<BehaviorStore>("alphaBehaviorStore"),
  scaleBehaviorStore: token<BehaviorStore>("scaleBehaviorStore"),
  speedBehaviorStore: token<BehaviorStore>("speedBehaviorStore"),
  colorBehaviorStore: token<ColorBehaviorStore>("colorBehaviorStore"),
  spawnShapeBehaviorStore: token<SpawnShapeBehaviorStore>("spawnShapeBehaviorStore"),
  lifetimeBehaviorStore: token<LifetimeBehaviorStore>("lifetimeBehaviorStore"),
  directionBehaviorStore: token<DirectionBehaviorStore>("directionBehaviorStore"),
  texturesStore: token<TexturesStore>("texturesStore"),
  rotationBehaviorStore: token<BehaviorStore>("rotationBehaviorStore"),
  gravityBehaviorStore: token<GravityBehaviorStore>("gravityBehaviorStore"),
  pathBehaviorStore: token<PathBehaviorStore>("pathBehaviorStore"),
};
