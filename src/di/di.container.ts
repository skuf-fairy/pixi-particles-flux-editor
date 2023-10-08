import { Emitter, EmitterConfigV3 } from "@pixi/particle-emitter";
import { EventEmitter } from "@pixi/utils";
import { Container, injected } from "brandi";
import { DisplayObject } from "pixi.js";
import { EditorApp } from "src/modules/EditorApp";
import { baseParticlesEmitterConfig } from "src/modules/particles-emitter.config";
import { AdvancedBloomFilterConfig } from "src/services/AdvancedBloomFilterConfig";
import { EmitterConfig } from "src/services/EmitterConfig";
import { DI_TOKENS } from "./di.tokens";

function createDIContainer(): Container {
  const container = new Container();

  injected(EditorApp, DI_TOKENS.emitterConfig.optional, DI_TOKENS.advancedBloomFilterConfig.optional);
  container.bind(DI_TOKENS.editorApp).toInstance(EditorApp).inSingletonScope();
  container
    .bind(DI_TOKENS.emitterConfig)
    .toInstance(() => new EmitterConfig(baseParticlesEmitterConfig, container.get(DI_TOKENS.eventEmitter)))
    .inSingletonScope();

  injected(AdvancedBloomFilterConfig, DI_TOKENS.eventEmitter.optional);
  container.bind(DI_TOKENS.advancedBloomFilterConfig).toInstance(AdvancedBloomFilterConfig).inSingletonScope();

  container.bind(DI_TOKENS.eventEmitter).toInstance(EventEmitter).inResolutionScope();
  // container.bind(DI_TOKENS.particlesEmitterFactory).toFactory(Emitter, (instance, container, config) => instance.init(container,config))

  return container;
}

export const getOrCreateDiRootContainer = (() => {
  let c: Container;
  return () => {
    if (!c) {
      c = createDIContainer();
    }
    return c;
  };
})();
