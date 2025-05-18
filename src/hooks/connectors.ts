import {
  useAlphaBehaviorStoreToken,
  useAppConfigStoreToken,
  useBloomFilterConfigStoreToken,
  useColorBehaviorStoreToken,
  useDirectionBehaviorStoreToken,
  useEmitterConfigToken,
  useErrorsStoreToken,
  useGravityBehaviorStoreToken,
  useLifetimeBehaviorStoreToken,
  useParticleFluxConfigStoreToken,
  usePathBehaviorStoreToken,
  usePerformanceStoreToken,
  useRotationBehaviorStoreToken,
  useScaleBehaviorStoreToken,
  useSpawnShapeBehaviorStoreToken,
  useSpeedBehaviorStoreToken,
  useTexturesStoreToken,
} from 'src/di/di.hooks';

import {useSyncExternalStore} from 'react';

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

export function useAlphaBehaviorStore(): BaseBehaviorStore {
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

export function useLifetimeBehaviorStore(): LifetimePropertyStore {
  const store = useLifetimeBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function usePathBehaviorStore(): PathBehaviorStore {
  const store = usePathBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useRotationBehaviorStore(): BaseBehaviorStore {
  const store = useRotationBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useScaleBehaviorStore(): BaseBehaviorStore {
  const store = useScaleBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useSpawnShapeBehaviorStore(): SpawnShapeBehaviorStore {
  const store = useSpawnShapeBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useSpeedBehaviorStore(): BaseBehaviorStore {
  const store = useSpeedBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useTexturesStore(): TexturesStore {
  const store = useTexturesStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useParticleFluxConfigStore(): ParticleFluxConfigStore {
  const store = useParticleFluxConfigStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useAppConfigStore(): AppConfigStore {
  const store = useAppConfigStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useBloomFilterConfigStore(): BloomFilterConfigStore {
  const store = useBloomFilterConfigStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function usePerformanceStore(): PerformanceStore {
  const store = usePerformanceStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}

export function useErrorsStore(): ErrorsStore {
  const store = useErrorsStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
