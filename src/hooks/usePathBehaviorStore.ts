import { useSyncExternalStore } from "react";
import { usePathBehaviorStoreToken } from "src/di/di.hooks";
import { PathBehaviorStore } from "src/services/PathBehaviorStore/PathBehaviorStore";

export function usePathBehaviorStore(): PathBehaviorStore {
  const store = usePathBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
