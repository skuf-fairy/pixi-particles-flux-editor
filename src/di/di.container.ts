import { Container } from "brandi";
import { EasingName } from "particle-flux";
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
import { BehaviorType } from "src/stores/types";
import { ApplyExampleEmitterConfigUseCase } from "src/use-cases/ApplyExampleEmitterConfigUseCase";
import { InitializeUseCase } from "src/use-cases/InitializeUseCase";
import { ToggleLocalStorageSaveUseCase } from "src/use-cases/ToggleLocalStorageSaveUseCase";
import { CopyParticleFluxConfigUseCase } from "src/use-cases/particles-flux-config/CopyParticleFluxConfigUseCase";
import { ResetParticleFluxConfigUseCase } from "src/use-cases/particles-flux-config/ResetParticleFluxConfigUseCase";
import { RestoreParticleFluxConfigUseCase } from "src/use-cases/particles-flux-config/RestoreParticleFluxConfigUseCase";
import { SaveParticleFluxConfigUseCase } from "src/use-cases/particles-flux-config/SaveParticleFluxConfigUseCase";
import { AddChainItemPointUseCase } from "src/use-cases/polygonal-chain-spawn-shape/AddChainItemPointUseCase";
import { AddChainUseCase } from "src/use-cases/polygonal-chain-spawn-shape/AddChainUseCase";
import { ChangeChainItemPointUseCase } from "src/use-cases/polygonal-chain-spawn-shape/ChangeChainItemPointUseCase";
import { DropChainItemPointUseCase } from "src/use-cases/polygonal-chain-spawn-shape/DropChainItemPointUseCase";
import { DropChainUseCase } from "src/use-cases/polygonal-chain-spawn-shape/DropChainUseCase";
import { DropTextureUseCase } from "src/use-cases/textures/DropTextureUseCase";
import { SelectTextureFromCollectionUseCase } from "src/use-cases/textures/SelectTextureFromCollectionUseCase";
import { UploadTextureUseCase } from "src/use-cases/textures/UploadTextureUseCase";
import { DI_TOKENS } from "./di.tokens";

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
        new BehaviorStore({
          staticConfig: {
            value: 1,
            multiplier: 1,
          },
          dynamicConfig: {
            start: 0,
            end: 1,
            multiplier: 1,
            easing: EasingName.linear,
          },
          scriptConfig: {
            script: [
              { time: 0, value: 0 },
              { time: 1, value: 1 },
            ],
            isInterpolate: false,
          },
          activeType: BehaviorType.Static,
          enabled: true,
          availableTypes: [BehaviorType.Static, BehaviorType.Dynamic, BehaviorType.Script],
        })
    )
    .inSingletonScope();
  container
    .bind(DI_TOKENS.scaleBehaviorStore)
    .toInstance(
      () =>
        new BehaviorStore({
          staticConfig: {
            value: 1,
            multiplier: 1,
          },
          dynamicConfig: {
            start: 0,
            end: 1,
            multiplier: 1,
            easing: EasingName.linear,
          },
          scriptConfig: {
            script: [
              { time: 0, value: 0 },
              { time: 1, value: 1 },
            ],
            isInterpolate: false,
          },
          // todo
          vectorConfig: {
            x: {
              value: 1,
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
          availableTypes: [BehaviorType.Static, BehaviorType.Dynamic, BehaviorType.Script, BehaviorType.Vector],
        })
    )
    .inSingletonScope();
  container
    .bind(DI_TOKENS.speedBehaviorStore)
    .toInstance(
      () =>
        new BehaviorStore({
          staticConfig: {
            value: 3,
            multiplier: 1,
          },
          dynamicConfig: {
            start: 0,
            end: 1,
            multiplier: 3,
            easing: EasingName.linear,
          },
          scriptConfig: {
            script: [
              { time: 0, value: 0 },
              { time: 1, value: 3 },
            ],
            isInterpolate: false,
          },
          activeType: BehaviorType.Static,
          availableTypes: [BehaviorType.Dynamic, BehaviorType.Static, BehaviorType.Script],
          enabled: true,
        })
    )
    .inSingletonScope();
  container.bind(DI_TOKENS.spawnShapeBehaviorStore).toInstance(SpawnShapeBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.colorBehaviorStore).toInstance(ColorBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.lifetimeBehaviorStore).toInstance(LifetimeBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.directionBehaviorStore).toInstance(DirectionBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.texturesStore).toInstance(TexturesStore).inSingletonScope();
  container
    .bind(DI_TOKENS.rotationBehaviorStore)
    .toInstance(
      () =>
        new BehaviorStore({
          dynamicConfig: {
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
          availableTypes: [BehaviorType.Static, BehaviorType.Dynamic, BehaviorType.Delta],
        })
    )
    .inSingletonScope();
  container.bind(DI_TOKENS.gravityBehaviorStore).toInstance(GravityBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.pathBehaviorStore).toInstance(PathBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.particleFluxConfigStore).toInstance(ParticleFluxConfigStore).inSingletonScope();
  container.bind(DI_TOKENS.appConfigStore).toInstance(AppConfigStore).inSingletonScope();

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
  container.bind(DI_TOKENS.addChainUseCase).toInstance(AddChainUseCase).inSingletonScope();
  container.bind(DI_TOKENS.addChainItemPointUseCase).toInstance(AddChainItemPointUseCase).inSingletonScope();
  container.bind(DI_TOKENS.dropChainItemPointUseCase).toInstance(DropChainItemPointUseCase).inSingletonScope();
  container.bind(DI_TOKENS.changeChainItemPointUseCase).toInstance(ChangeChainItemPointUseCase).inSingletonScope();
  container.bind(DI_TOKENS.dropChainUseCase).toInstance(DropChainUseCase).inSingletonScope();
  container
    .bind(DI_TOKENS.selectTextureFromCollectionUseCase)
    .toInstance(SelectTextureFromCollectionUseCase)
    .inSingletonScope();
  container.bind(DI_TOKENS.performanceStore).toInstance(PerformanceStore).inSingletonScope();
  container
    .bind(DI_TOKENS.applyExampleEmitterConfigUseCase)
    .toInstance(ApplyExampleEmitterConfigUseCase)
    .inSingletonScope();

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
