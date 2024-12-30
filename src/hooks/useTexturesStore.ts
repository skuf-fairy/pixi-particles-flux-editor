import { useSyncExternalStore } from "react";
import { useTexturesStoreToken } from "src/di/di.hooks";
import { TexturesStore } from "src/services/TexturesStore/TexturesStore";

export function useTexturesStore(): TexturesStore {
  const store = useTexturesStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
