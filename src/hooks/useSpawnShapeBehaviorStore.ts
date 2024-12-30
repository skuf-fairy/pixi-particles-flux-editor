import { useSyncExternalStore } from "react";
import { useSpawnShapeBehaviorStoreToken } from "src/di/di.hooks";
import { SpawnShapeBehaviorStore } from "src/services/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";

export function useSpawnShapeBehaviorStore(): SpawnShapeBehaviorStore {
  const store = useSpawnShapeBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
