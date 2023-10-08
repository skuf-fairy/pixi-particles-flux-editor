import { createInjectionHooks } from "brandi-react";
import { DI_TOKENS } from "./di.tokens";

const [useEditorApp, useEmitterConfig, useAdvancedBloomFilterConfig] = createInjectionHooks(
  DI_TOKENS.editorApp,
  DI_TOKENS.emitterConfig,
  DI_TOKENS.advancedBloomFilterConfig
);

export { useEditorApp, useEmitterConfig, useAdvancedBloomFilterConfig };
