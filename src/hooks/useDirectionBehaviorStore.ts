import { useSyncExternalStore } from "react";
import { useDirectionBehaviorStoreToken } from "src/di/di.hooks";
import { DirectionBehaviorStore } from "src/services/DirectionBehaviorStore/DirectionBehaviorStore";

export function useDirectionBehaviorStore(): DirectionBehaviorStore {
  const store = useDirectionBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
