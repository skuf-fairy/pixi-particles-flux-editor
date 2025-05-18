import {DI_TOKENS} from './di.tokens';
import {EventEmitter} from 'pixi.js';

import {Container} from 'brandi';
import {EasingName} from 'particle-flux';
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
import {BehaviorType} from 'src/stores/types';
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

function createDIContainer(): Container {
  const container = new Container();

  container.bind(DI_TOKENS.editorApp).toInstance(EditorApp).inSingletonScope();
  container.bind(DI_TOKENS.emitterConfigStore).toInstance(EmitterConfigStore).inSingletonScope();

  container.bind(DI_TOKENS.bloomFilterConfigStore).toInstance(BloomFilterConfigStore).inSingletonScope();

  container.bind(DI_TOKENS.eventEmitter).toInstance(EventEmitter).inResolutionScope();

  container
    .bind(DI_TOKENS.alphaBehaviorStore)
    .toInstance(
      () =>
        new BaseBehaviorStore({
          staticConfig: {
            value: 1,
            multiplier: 1,
          },
          transitionConfig: {
            start: 0,
            end: 1,
            multiplier: 1,
            easing: EasingName.linear,
          },
          scriptConfig: {
            script: [
              {time: 0, value: 0},
              {time: 100, value: 1},
            ],
            isInterpolate: false,
          },
          activeType: BehaviorType.Static,
          enabled: true,
          availableBehaviorTypes: [BehaviorType.Static, BehaviorType.Transition, BehaviorType.Script],
        }),
    )
    .inSingletonScope();
  container
    .bind(DI_TOKENS.scaleBehaviorStore)
    .toInstance(
      () =>
        new BaseBehaviorStore({
          staticConfig: {
            value: 1,
            multiplier: 1,
          },
          transitionConfig: {
            start: 0,
            end: 1,
            multiplier: 1,
            easing: EasingName.linear,
          },
          scriptConfig: {
            script: [
              {time: 0, value: 0},
              {time: 100, value: 1},
            ],
            isInterpolate: false,
          },
          vectorConfig: {
            x: {
              start: 0,
              end: 1,
              multiplier: 1,
              easing: EasingName.linear,
            },
            y: {
              start: 0,
              end: 1,
              multiplier: 1,
              easing: EasingName.linear,
            },
          },
          activeType: BehaviorType.Static,
          enabled: true,
          availableBehaviorTypes: [
            BehaviorType.Static,
            BehaviorType.Transition,
            BehaviorType.Script,
            BehaviorType.Vector,
          ],
        }),
    )
    .inSingletonScope();
  container
    .bind(DI_TOKENS.speedBehaviorStore)
    .toInstance(
      () =>
        new BaseBehaviorStore({
          staticConfig: {
            value: 1,
            multiplier: 1,
          },
          transitionConfig: {
            start: 0,
            end: 1,
            multiplier: 1,
            easing: EasingName.linear,
          },
          scriptConfig: {
            script: [
              {time: 0, value: 0},
              {time: 100, value: 1},
            ],
            isInterpolate: false,
          },
          activeType: BehaviorType.Static,
          availableBehaviorTypes: [BehaviorType.Transition, BehaviorType.Static, BehaviorType.Script],
          enabled: true,
        }),
    )
    .inSingletonScope();
  container.bind(DI_TOKENS.spawnShapeBehaviorStore).toInstance(SpawnShapeBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.colorBehaviorStore).toInstance(ColorBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.lifetimeBehaviorStore).toInstance(LifetimePropertyStore).inSingletonScope();
  container.bind(DI_TOKENS.directionBehaviorStore).toInstance(DirectionBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.texturesStore).toInstance(TexturesStore).inSingletonScope();
  container
    .bind(DI_TOKENS.rotationBehaviorStore)
    .toInstance(
      () =>
        new BaseBehaviorStore({
          transitionConfig: {
            start: 0,
            end: 1,
            multiplier: 1,
            easing: EasingName.linear,
          },
          staticConfig: {
            value: 0,
            multiplier: 1,
          },
          deltaConfig: {
            value: 0,
            delta: 0,
            multiplier: 1,
          },
          activeType: BehaviorType.Static,
          enabled: true,
          availableBehaviorTypes: [BehaviorType.Static, BehaviorType.Transition, BehaviorType.Delta],
        }),
    )
    .inSingletonScope();
  container.bind(DI_TOKENS.gravityBehaviorStore).toInstance(GravityBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.pathBehaviorStore).toInstance(PathBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.particleFluxConfigStore).toInstance(ParticleFluxConfigStore).inSingletonScope();
  container.bind(DI_TOKENS.appConfigStore).toInstance(AppConfigStore).inSingletonScope();
  container.bind(DI_TOKENS.errorsStore).toInstance(ErrorsStore).inSingletonScope();

  // use-cases
  container.bind(DI_TOKENS.initializeUseCase).toInstance(InitializeUseCase).inSingletonScope();
  container.bind(DI_TOKENS.saveParticleFluxConfigUseCase).toInstance(SaveParticleFluxConfigUseCase).inSingletonScope();
  container.bind(DI_TOKENS.copyParticleFluxConfigUseCase).toInstance(CopyParticleFluxConfigUseCase).inSingletonScope();
  container
    .bind(DI_TOKENS.restoreParticleFluxConfigUseCase)
    .toInstance(RestoreParticleFluxConfigUseCase)
    .inSingletonScope();
  container
    .bind(DI_TOKENS.resetParticleFluxConfigUseCase)
    .toInstance(ResetParticleFluxConfigUseCase)
    .inSingletonScope();
  container.bind(DI_TOKENS.toggleLocalStorageSaveUseCase).toInstance(ToggleLocalStorageSaveUseCase).inSingletonScope();
  container.bind(DI_TOKENS.uploadTextureUseCase).toInstance(UploadTextureUseCase).inSingletonScope();
  container.bind(DI_TOKENS.dropTextureUseCase).toInstance(DropTextureUseCase).inSingletonScope();
  container.bind(DI_TOKENS.addChainItemPointUseCase).toInstance(AddChainItemPointUseCase).inSingletonScope();
  container.bind(DI_TOKENS.dropChainItemPointUseCase).toInstance(DropChainItemPointUseCase).inSingletonScope();
  container.bind(DI_TOKENS.changeChainItemPointUseCase).toInstance(ChangeChainItemPointUseCase).inSingletonScope();
  container
    .bind(DI_TOKENS.selectTextureFromCollectionUseCase)
    .toInstance(SelectTextureFromCollectionUseCase)
    .inSingletonScope();
  container.bind(DI_TOKENS.performanceStore).toInstance(PerformanceStore).inSingletonScope();
  container
    .bind(DI_TOKENS.applyExampleEmitterConfigUseCase)
    .toInstance(ApplyExampleEmitterConfigUseCase)
    .inSingletonScope();
  container.bind(DI_TOKENS.downloadTexturesUseCase).toInstance(DownloadTexturesUseCase).inSingletonScope();
  container.bind(DI_TOKENS.addSpawnShapeItemUseCase).toInstance(AddSpawnShapeItemUseCase).inSingletonScope();
  container.bind(DI_TOKENS.dropSpawnShapeItemUseCase).toInstance(DropSpawnShapeItemUseCase).inSingletonScope();

  // services
  container.bind(DI_TOKENS.errorsService).toInstance(ErrorsService).inSingletonScope();

  return container;
}

export const getOrCreateDiRootContainer = (() => {
  let c: Container;
  return () => {
    if (!c) {
      c = createDIContainer();
    }
    return c;
  };
})();
