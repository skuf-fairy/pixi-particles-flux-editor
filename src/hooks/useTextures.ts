import { EmitterConfigV3 } from "@pixi/particle-emitter";
import { useSyncExternalStore } from "react";
import { useEmitterConfig } from "src/di/di.hooks";

export function useTextures(): string[] {
  const emitterConfig = useEmitterConfig();

  useSyncExternalStore<EmitterConfigV3>(emitterConfig.subscribeOnConfigChange, emitterConfig.getConfig);

  return emitterConfig.getTextureList();
}
