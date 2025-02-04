import { createInjectionHooks } from "brandi-react";
import { DI_TOKENS } from "./di.tokens";

const [
  useEditorAppToken,
  // useAdvancedBloomFilterConfigToken,
  useEmitterConfigToken,
  useAlphaBehaviorStoreToken,
  useScaleBehaviorStoreToken,
  useSpeedBehaviorStoreToken,
  useSpawnShapeBehaviorStoreToken,
  useColorBehaviorStoreToken,
  useLifetimeBehaviorStoreToken,
  useDirectionBehaviorStoreToken,
  useTexturesStoreToken,
  useRotationBehaviorStoreToken,
  useGravityBehaviorStoreToken,
  usePathBehaviorStoreToken,
] = createInjectionHooks(
  DI_TOKENS.editorApp,
  // DI_TOKENS.advancedBloomFilterConfig,
  //stores
  DI_TOKENS.emitterConfigStore,
  DI_TOKENS.alphaBehaviorStore,
  DI_TOKENS.scaleBehaviorStore,
  DI_TOKENS.speedBehaviorStore,
  DI_TOKENS.spawnShapeBehaviorStore,
  DI_TOKENS.colorBehaviorStore,
  DI_TOKENS.lifetimeBehaviorStore,
  DI_TOKENS.directionBehaviorStore,
  DI_TOKENS.texturesStore,
  DI_TOKENS.rotationBehaviorStore,
  DI_TOKENS.gravityBehaviorStore,
  DI_TOKENS.pathBehaviorStore
);

export {
  useEditorAppToken,
  useEmitterConfigToken,
  // useAdvancedBloomFilterConfigToken,
  useAlphaBehaviorStoreToken,
  useScaleBehaviorStoreToken,
  useSpeedBehaviorStoreToken,
  useSpawnShapeBehaviorStoreToken,
  useColorBehaviorStoreToken,
  useLifetimeBehaviorStoreToken,
  useDirectionBehaviorStoreToken,
  useTexturesStoreToken,
  useRotationBehaviorStoreToken,
  useGravityBehaviorStoreToken,
  usePathBehaviorStoreToken,
};
