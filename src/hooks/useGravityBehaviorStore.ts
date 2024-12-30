import { useSyncExternalStore } from "react";
import { useGravityBehaviorStoreToken } from "src/di/di.hooks";
import { GravityBehaviorStore } from "src/services/GravityBehaviorStore/GravityBehaviorStore";

export function useGravityBehaviorStore(): GravityBehaviorStore {
  const store = useGravityBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
