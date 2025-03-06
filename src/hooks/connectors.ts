import { useSyncExternalStore } from "react";
import {
  useAlphaBehaviorStoreToken,
  useColorBehaviorStoreToken,
  useDirectionBehaviorStoreToken,
  useEmitterConfigToken,
  useGravityBehaviorStoreToken,
  useLifetimeBehaviorStoreToken,
  usePathBehaviorStoreToken,
  useRotationBehaviorStoreToken,
  useScaleBehaviorStoreToken,
  useSpawnShapeBehaviorStoreToken,
  useSpeedBehaviorStoreToken,
  useTexturesStoreToken,
} from "src/di/di.hooks";
import { BehaviorStore } from "src/stores/BehaviorStore";
import { ColorBehaviorStore } from "src/stores/ColorBehaviorStore/ColorBehaviorStore";
import { DirectionBehaviorStore } from "src/stores/DirectionBehaviorStore/DirectionBehaviorStore";
import { EmitterConfigStore } from "src/stores/EmitterConfigStore";
import { GravityBehaviorStore } from "src/stores/GravityBehaviorStore/GravityBehaviorStore";
import { LifetimeBehaviorStore } from "src/stores/LifetimeBehaviorStore/LifetimeBehaviorStore";
import { PathBehaviorStore } from "src/stores/PathBehaviorStore/PathBehaviorStore";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";

export function useAlphaBehaviorStore(): BehaviorStore {
  const store = useAlphaBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useColorBehaviorStore(): ColorBehaviorStore {
  const store = useColorBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useDirectionBehaviorStore(): DirectionBehaviorStore {
  const store = useDirectionBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useEmitterConfigStore(): EmitterConfigStore {
  const emitterConfig = useEmitterConfigToken();

  useSyncExternalStore(emitterConfig.subscribe, emitterConfig.getState);

  return emitterConfig;
}

export function useGravityBehaviorStore(): GravityBehaviorStore {
  const store = useGravityBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useLifetimeBehaviorStore(): LifetimeBehaviorStore {
  const store = useLifetimeBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function usePathBehaviorStore(): PathBehaviorStore {
  const store = usePathBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useRotationBehaviorStore(): BehaviorStore {
  const store = useRotationBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useScaleBehaviorStore(): BehaviorStore {
  const store = useScaleBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useSpawnShapeBehaviorStore(): SpawnShapeBehaviorStore {
  const store = useSpawnShapeBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useSpeedBehaviorStore(): BehaviorStore {
  const store = useSpeedBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useTexturesStore(): TexturesStore {
  const store = useTexturesStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
