import { useSyncExternalStore } from "react";
import { useLifetimeBehaviorStoreToken } from "src/di/di.hooks";
import { LifetimeBehaviorStore } from "src/services/LifetimeBehaviorStore/LifetimeBehaviorStore";

export function useLifetimeBehaviorStore(): LifetimeBehaviorStore {
  const store = useLifetimeBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
