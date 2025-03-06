import { useSyncExternalStore } from "react";
import { useSpeedBehaviorStoreToken } from "src/di/di.hooks";
import { BehaviorStore } from "src/services/BehaviorStore";

export function useSpeedBehaviorStore(): BehaviorStore {
  const store = useSpeedBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
