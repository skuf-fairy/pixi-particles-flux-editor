import { useSyncExternalStore } from "react";
import { useSpeedBehaviorStoreToken } from "src/di/di.hooks";
import { SpeedBehaviorStore } from "src/services/SpeedBehaviorStore/SpeedBehaviorStore";

export function useSpeedBehaviorStore(): SpeedBehaviorStore {
  const store = useSpeedBehaviorStoreToken();

  useSyncExternalStore(store.subscribe, store.getState);

  return store;
}
