import { Factory, token } from "brandi";
import { Container, EventEmitter } from "pixi.js";
import { EditorApp } from "src/modules/EditorApp";
// import { AdvancedBloomFilterConfig } from "src/services/AdvancedBloomFilterConfig";
import { BehaviorStore } from "src/stores/BehaviorStore";
import { ColorBehaviorStore } from "src/stores/ColorBehaviorStore/ColorBehaviorStore";
import { DirectionBehaviorStore } from "src/stores/DirectionBehaviorStore/DirectionBehaviorStore";
import { EmitterConfigStore } from "src/stores/EmitterConfigStore";
import { GravityBehaviorStore } from "src/stores/GravityBehaviorStore/GravityBehaviorStore";
import { LifetimeBehaviorStore } from "src/stores/LifetimeBehaviorStore/LifetimeBehaviorStore";
import { PathBehaviorStore } from "src/stores/PathBehaviorStore/PathBehaviorStore";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";

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
