import { token } from "brandi";
import { EventEmitter } from "pixi.js";
import { EditorApp } from "src/modules/EditorApp";
import { AppConfigStore } from "src/stores/AppConfigStore/AppConfigStore";
import { BehaviorStore } from "src/stores/BehaviorStore";
import { BloomFilterConfigStore } from "src/stores/BloomFilterConfigStore/BloomFilterConfigStore";
import { ColorBehaviorStore } from "src/stores/ColorBehaviorStore/ColorBehaviorStore";
import { DirectionBehaviorStore } from "src/stores/DirectionBehaviorStore/DirectionBehaviorStore";
import { EmitterConfigStore } from "src/stores/EmitterConfigStore";
import { GravityBehaviorStore } from "src/stores/GravityBehaviorStore/GravityBehaviorStore";
import { LifetimeBehaviorStore } from "src/stores/LifetimeBehaviorStore/LifetimeBehaviorStore";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { PathBehaviorStore } from "src/stores/PathBehaviorStore/PathBehaviorStore";
import { PerformanceStore } from "src/stores/PerfomanceStore/PerformanceStore";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { ApplyExampleEmitterConfigUseCase } from "src/use-cases/ApplyExampleEmitterConfigUseCase";
import { InitializeUseCase } from "src/use-cases/InitializeUseCase";
import { ToggleLocalStorageSaveUseCase } from "src/use-cases/ToggleLocalStorageSaveUseCase";
import { AddChainItemPointUseCase } from "src/use-cases/chain-spawn-shape/AddChainItemPointUseCase";
import { ChangeChainItemPointUseCase } from "src/use-cases/chain-spawn-shape/ChangeChainItemPointUseCase";
import { DropChainItemPointUseCase } from "src/use-cases/chain-spawn-shape/DropChainItemPointUseCase";
import { CopyParticleFluxConfigUseCase } from "src/use-cases/particles-flux-config/CopyParticleFluxConfigUseCase";
import { ResetParticleFluxConfigUseCase } from "src/use-cases/particles-flux-config/ResetParticleFluxConfigUseCase";
import { RestoreParticleFluxConfigUseCase } from "src/use-cases/particles-flux-config/RestoreParticleFluxConfigUseCase";
import { SaveParticleFluxConfigUseCase } from "src/use-cases/particles-flux-config/SaveParticleFluxConfigUseCase";
import { AddSpawnShapeItem } from "src/use-cases/shapes/AddSpawnShapeItem";
import { DropSpawnShapeItem } from "src/use-cases/shapes/DropSpawnShapeItem";
import { DownloadTexturesUseCase } from "src/use-cases/textures/DownloadTexturesUseCase";
import { DropTextureUseCase } from "src/use-cases/textures/DropTextureUseCase";
import { SelectTextureFromCollectionUseCase } from "src/use-cases/textures/SelectTextureFromCollectionUseCase";
import { UploadTextureUseCase } from "src/use-cases/textures/UploadTextureUseCase";

export const DI_TOKENS = {
  editorApp: token<EditorApp>("editorApp"),
  eventEmitter: token<EventEmitter>("eventEmitter"),
  // stores
  bloomFilterConfigStore: token<BloomFilterConfigStore>("AdvancedBloomFilterConfig"),
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
  particleFluxConfigStore: token<ParticleFluxConfigStore>("particleFluxConfigStore"),
  appConfigStore: token<AppConfigStore>("appConfigStore"),
  performanceStore: token<PerformanceStore>("performanceStore"),
  // use-cases
  initializeUseCase: token<InitializeUseCase>("initializeUseCase"),
  saveParticleFluxConfigUseCase: token<SaveParticleFluxConfigUseCase>("saveParticleFluxConfigUseCase"),
  copyParticleFluxConfigUseCase: token<CopyParticleFluxConfigUseCase>("copyParticleFluxConfigUseCase"),
  restoreParticleFluxConfigUseCase: token<RestoreParticleFluxConfigUseCase>("restoreParticleFluxConfigUseCase"),
  resetParticleFluxConfigUseCase: token<ResetParticleFluxConfigUseCase>("resetParticleFluxConfigUseCase"),
  toggleLocalStorageSaveUseCase: token<ToggleLocalStorageSaveUseCase>("toggleLocalStorageSaveUseCase"),
  uploadTextureUseCase: token<UploadTextureUseCase>("uploadTextureUseCase"),
  dropTextureUseCase: token<DropTextureUseCase>("dropTextureUseCase"),
  selectTextureFromCollectionUseCase: token<SelectTextureFromCollectionUseCase>("selectTextureFromCollectionUseCase"),
  addChainItemPointUseCase: token<AddChainItemPointUseCase>("addChainItemPointUseCase"),
  dropChainItemPointUseCase: token<DropChainItemPointUseCase>("dropChainItemPointUseCase"),
  changeChainItemPointUseCase: token<ChangeChainItemPointUseCase>("changeChainItemPointUseCase"),
  applyExampleEmitterConfigUseCase: token<ApplyExampleEmitterConfigUseCase>("applyExampleEmitterConfigUseCase"),
  downloadTexturesUseCase: token<DownloadTexturesUseCase>("downloadTexturesUseCase"),
  addSpawnShapeItem: token<AddSpawnShapeItem>("addSpawnShapeItem"),
  dropSpawnShapeItem: token<DropSpawnShapeItem>("dropSpawnShapeItem"),
};
