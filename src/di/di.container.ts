import { Container } from "brandi";
import { EventEmitter } from "pixi.js";
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
import { DI_TOKENS } from "./di.tokens";

function createDIContainer(): Container {
  const container = new Container();

  container.bind(DI_TOKENS.editorApp).toInstance(EditorApp).inSingletonScope();
  container.bind(DI_TOKENS.emitterConfigStore).toInstance(EmitterConfigStore).inSingletonScope();

  // container.bind(DI_TOKENS.advancedBloomFilterConfig).toInstance(AdvancedBloomFilterConfig).inSingletonScope();

  container.bind(DI_TOKENS.eventEmitter).toInstance(EventEmitter).inResolutionScope();

  container.bind(DI_TOKENS.alphaBehaviorStore).toInstance(AlphaBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.scaleBehaviorStore).toInstance(ScaleBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.speedBehaviorStore).toInstance(SpeedBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.spawnShapeBehaviorStore).toInstance(SpawnShapeBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.colorBehaviorStore).toInstance(ColorBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.lifetimeBehaviorStore).toInstance(LifetimeBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.directionBehaviorStore).toInstance(DirectionBehaviorStore).inSingletonScope();
  container.bind(DI_TOKENS.texturesStore).toInstance(TexturesStore).inSingletonScope();
  container.bind(DI_TOKENS.rotationBehaviorStore).toInstance(RotationBehaviorStore).inSingletonScope();
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
