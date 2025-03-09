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
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { CopyParticleFluxConfigUseCase } from "src/use-cases/CopyParticleFluxConfigUseCase";
import { DropTextureUseCase } from "src/use-cases/DropTextureUseCase";
import { InitializeUseCase } from "src/use-cases/InitializeUseCase";
import { ResetParticleFluxConfigUseCase } from "src/use-cases/ResetParticleFluxConfigUseCase";
import { RestoreParticleFluxConfigUseCase } from "src/use-cases/RestoreParticleFluxConfigUseCase";
import { SaveParticleFluxConfigUseCase } from "src/use-cases/SaveParticleFluxConfigUseCase";
import { ToggleLocalStorageSaveUseCase } from "src/use-cases/ToggleLocalStorageSaveUseCase";
import { UploadTextureUseCase } from "src/use-cases/UploadTextureUseCase";

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
  // use-cases
  initializeUseCase: token<InitializeUseCase>("initializeUseCase"),
  saveParticleFluxConfigUseCase: token<SaveParticleFluxConfigUseCase>("saveParticleFluxConfigUseCase"),
  copyParticleFluxConfigUseCase: token<CopyParticleFluxConfigUseCase>("copyParticleFluxConfigUseCase"),
  restoreParticleFluxConfigUseCase: token<RestoreParticleFluxConfigUseCase>("restoreParticleFluxConfigUseCase"),
  resetParticleFluxConfigUseCase: token<ResetParticleFluxConfigUseCase>("resetParticleFluxConfigUseCase"),
  toggleLocalStorageSaveUseCase: token<ToggleLocalStorageSaveUseCase>("toggleLocalStorageSaveUseCase"),
  uploadTextureUseCase: token<UploadTextureUseCase>("uploadTextureUseCase"),
  dropTextureUseCase: token<DropTextureUseCase>("dropTextureUseCase"),
};
