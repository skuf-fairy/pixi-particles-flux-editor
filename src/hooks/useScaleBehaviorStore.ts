import { useSyncExternalStore } from "react";
import { useScaleBehaviorStoreToken } from "src/di/di.hooks";
import { ScaleBehaviorStore } from "src/services/ScaleBehaviorStore/ScaleBehaviorStore";

export function useScaleBehaviorStore(): ScaleBehaviorStore {
  const store = useScaleBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
