import {EventEmitter} from 'pixi.js';

import {token} from 'brandi';
import {EditorApp} from 'src/modules/EditorApp';
import {ErrorsService} from 'src/services/ErrorsService';
import {AppConfigStore} from 'src/stores/AppConfigStore/AppConfigStore';
import {BaseBehaviorStore} from 'src/stores/BaseBehaviorStore/BaseBehaviorStore';
import {BloomFilterConfigStore} from 'src/stores/BloomFilterConfigStore/BloomFilterConfigStore';
import {ColorBehaviorStore} from 'src/stores/ColorBehaviorStore/ColorBehaviorStore';
import {DirectionBehaviorStore} from 'src/stores/DirectionBehaviorStore/DirectionBehaviorStore';
import {EmitterConfigStore} from 'src/stores/EmitterConfigStore/EmitterConfigStore';
import {ErrorsStore} from 'src/stores/ErrorsStore/ErrorsStore';
import {GravityBehaviorStore} from 'src/stores/GravityBehaviorStore/GravityBehaviorStore';
import {LifetimePropertyStore} from 'src/stores/LifetimePropertyStore/LifetimePropertyStore';
import {ParticleFluxConfigStore} from 'src/stores/ParticleFluxConfigStore';
import {PathBehaviorStore} from 'src/stores/PathBehaviorStore/PathBehaviorStore';
import {PerformanceStore} from 'src/stores/PerformanceStore/PerformanceStore';
import {SpawnShapeBehaviorStore} from 'src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore';
import {TexturesStore} from 'src/stores/TexturesStore/TexturesStore';
import {ApplyExampleEmitterConfigUseCase} from 'src/use-cases/ApplyExampleEmitterConfigUseCase';
import {InitializeUseCase} from 'src/use-cases/InitializeUseCase';
import {ToggleLocalStorageSaveUseCase} from 'src/use-cases/ToggleLocalStorageSaveUseCase';
import {AddChainItemPointUseCase} from 'src/use-cases/chain-spawn-shape/AddChainItemPointUseCase';
import {ChangeChainItemPointUseCase} from 'src/use-cases/chain-spawn-shape/ChangeChainItemPointUseCase';
import {DropChainItemPointUseCase} from 'src/use-cases/chain-spawn-shape/DropChainItemPointUseCase';
import {CopyParticleFluxConfigUseCase} from 'src/use-cases/particles-flux-config/CopyParticleFluxConfigUseCase';
import {ResetParticleFluxConfigUseCase} from 'src/use-cases/particles-flux-config/ResetParticleFluxConfigUseCase';
import {RestoreParticleFluxConfigUseCase} from 'src/use-cases/particles-flux-config/RestoreParticleFluxConfigUseCase';
import {SaveParticleFluxConfigUseCase} from 'src/use-cases/particles-flux-config/SaveParticleFluxConfigUseCase';
import {AddSpawnShapeItemUseCase} from 'src/use-cases/shapes/AddSpawnShapeItemUseCase';
import {DropSpawnShapeItemUseCase} from 'src/use-cases/shapes/DropSpawnShapeItemUseCase';
import {DownloadTexturesUseCase} from 'src/use-cases/textures/DownloadTexturesUseCase';
import {DropTextureUseCase} from 'src/use-cases/textures/DropTextureUseCase';
import {SelectTextureFromCollectionUseCase} from 'src/use-cases/textures/SelectTextureFromCollectionUseCase';
import {UploadTextureUseCase} from 'src/use-cases/textures/UploadTextureUseCase';

export const DI_TOKENS = {
  editorApp: token<EditorApp>('editorApp'),
  eventEmitter: token<EventEmitter>('eventEmitter'),
  // stores
  bloomFilterConfigStore: token<BloomFilterConfigStore>('AdvancedBloomFilterConfig'),
  emitterConfigStore: token<EmitterConfigStore>('emitterConfigStore'),
  alphaBehaviorStore: token<BaseBehaviorStore>('alphaBehaviorStore'),
  scaleBehaviorStore: token<BaseBehaviorStore>('scaleBehaviorStore'),
  speedBehaviorStore: token<BaseBehaviorStore>('speedBehaviorStore'),
  colorBehaviorStore: token<ColorBehaviorStore>('colorBehaviorStore'),
  spawnShapeBehaviorStore: token<SpawnShapeBehaviorStore>('spawnShapeBehaviorStore'),
  lifetimeBehaviorStore: token<LifetimePropertyStore>('lifetimeBehaviorStore'),
  directionBehaviorStore: token<DirectionBehaviorStore>('directionBehaviorStore'),
  texturesStore: token<TexturesStore>('texturesStore'),
  rotationBehaviorStore: token<BaseBehaviorStore>('rotationBehaviorStore'),
  gravityBehaviorStore: token<GravityBehaviorStore>('gravityBehaviorStore'),
  pathBehaviorStore: token<PathBehaviorStore>('pathBehaviorStore'),
  particleFluxConfigStore: token<ParticleFluxConfigStore>('particleFluxConfigStore'),
  appConfigStore: token<AppConfigStore>('appConfigStore'),
  performanceStore: token<PerformanceStore>('performanceStore'),
  errorsStore: token<ErrorsStore>('errorsStore'),
  // use-cases
  initializeUseCase: token<InitializeUseCase>('initializeUseCase'),
  saveParticleFluxConfigUseCase: token<SaveParticleFluxConfigUseCase>('saveParticleFluxConfigUseCase'),
  copyParticleFluxConfigUseCase: token<CopyParticleFluxConfigUseCase>('copyParticleFluxConfigUseCase'),
  restoreParticleFluxConfigUseCase: token<RestoreParticleFluxConfigUseCase>('restoreParticleFluxConfigUseCase'),
  resetParticleFluxConfigUseCase: token<ResetParticleFluxConfigUseCase>('resetParticleFluxConfigUseCase'),
  toggleLocalStorageSaveUseCase: token<ToggleLocalStorageSaveUseCase>('toggleLocalStorageSaveUseCase'),
  uploadTextureUseCase: token<UploadTextureUseCase>('uploadTextureUseCase'),
  dropTextureUseCase: token<DropTextureUseCase>('dropTextureUseCase'),
  selectTextureFromCollectionUseCase: token<SelectTextureFromCollectionUseCase>('selectTextureFromCollectionUseCase'),
  addChainItemPointUseCase: token<AddChainItemPointUseCase>('addChainItemPointUseCase'),
  dropChainItemPointUseCase: token<DropChainItemPointUseCase>('dropChainItemPointUseCase'),
  changeChainItemPointUseCase: token<ChangeChainItemPointUseCase>('changeChainItemPointUseCase'),
  applyExampleEmitterConfigUseCase: token<ApplyExampleEmitterConfigUseCase>('applyExampleEmitterConfigUseCase'),
  downloadTexturesUseCase: token<DownloadTexturesUseCase>('downloadTexturesUseCase'),
  addSpawnShapeItemUseCase: token<AddSpawnShapeItemUseCase>('addSpawnShapeItemUseCase'),
  dropSpawnShapeItemUseCase: token<DropSpawnShapeItemUseCase>('dropSpawnShapeItemUseCase'),
  // services
  errorsService: token<ErrorsService>('errorsService'),
};
