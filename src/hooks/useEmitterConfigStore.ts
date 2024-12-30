import { useSyncExternalStore } from "react";
import { useEmitterConfigToken } from "src/di/di.hooks";
import { EmitterConfigStore } from "src/services/EmitterConfigStore";

export function useEmitterConfigStore(): EmitterConfigStore {
  const emitterConfig = useEmitterConfigToken();

  useSyncExternalStore(emitterConfig.subscribe, emitterConfig.getState);

  return emitterConfig;
}
