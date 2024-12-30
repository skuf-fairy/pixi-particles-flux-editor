import { useSyncExternalStore } from "react";
import { useColorBehaviorStoreToken } from "src/di/di.hooks";
import { ColorBehaviorStore } from "src/services/ColorBehaviorStore/ColorBehaviorStore";

export function useColorBehaviorStore(): ColorBehaviorStore {
  const store = useColorBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
