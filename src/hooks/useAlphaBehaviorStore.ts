import { useSyncExternalStore } from "react";
import { useAlphaBehaviorStoreToken } from "src/di/di.hooks";
import { BehaviorStore } from "src/services/BehaviorStore";

export function useAlphaBehaviorStore(): BehaviorStore {
  const store = useAlphaBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
