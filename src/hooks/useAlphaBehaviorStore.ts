import { useSyncExternalStore } from "react";
import { useAlphaBehaviorStoreToken } from "src/di/di.hooks";
import { AlphaBehaviorStore } from "src/services/AlphaBehaviorStore/AlphaBehaviorStore";

export function useAlphaBehaviorStore(): AlphaBehaviorStore {
  const store = useAlphaBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
