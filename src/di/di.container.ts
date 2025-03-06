import { Container } from "brandi";
import { EasingName } from "particle-flux";
import { EventEmitter } from "pixi.js";
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
import { BehaviorType } from "src/stores/types";
import { DI_TOKENS } from "./di.tokens";

function createDIContainer(): Container {
  const container = new Container();

  container.bind(DI_TOKENS.editorApp).toInstance(EditorApp).inSingletonScope();
  container.bind(DI_TOKENS.emitterConfigStore).toInstance(EmitterConfigStore).inSingletonScope();

  // container.bind(DI_TOKENS.advancedBloomFilterConfig).toInstance(AdvancedBloomFilterConfig).inSingletonScope();

  container.bind(DI_TOKENS.eventEmitter).toInstance(EventEmitter).inResolutionScope();

  container
    .bind(DI_TOKENS.alphaBehaviorStore)
    .toInstance(
      () =>
        new BehaviorStore({
          staticConfig: {
            value: 1,
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
