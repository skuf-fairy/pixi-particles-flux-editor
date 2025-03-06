import { useSyncExternalStore } from "react";
import { useRotationBehaviorStoreToken } from "src/di/di.hooks";
import { BehaviorStore } from "src/services/BehaviorStore";

export function useRotationBehaviorStore(): BehaviorStore {
  const store = useRotationBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
