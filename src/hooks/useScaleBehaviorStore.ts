import { useSyncExternalStore } from "react";
import { useScaleBehaviorStoreToken } from "src/di/di.hooks";
import { BehaviorStore } from "src/services/BehaviorStore";

export function useScaleBehaviorStore(): BehaviorStore {
  const store = useScaleBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
