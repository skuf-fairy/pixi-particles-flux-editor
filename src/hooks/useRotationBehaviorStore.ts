import { useSyncExternalStore } from "react";
import { useRotationBehaviorStoreToken } from "src/di/di.hooks";
import { RotationBehaviorStore } from "src/services/RotationBehaviorStore/RotationBehaviorStore";

export function useRotationBehaviorStore(): RotationBehaviorStore {
  const store = useRotationBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
