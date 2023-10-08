import { Emitter, EmitterConfigV3 } from "@pixi/particle-emitter";
import { EventEmitter } from "@pixi/utils";
import { Factory, token } from "brandi";
import { Container } from "pixi.js";
import { EditorApp } from "src/modules/EditorApp";
import { AdvancedBloomFilterConfig } from "src/services/AdvancedBloomFilterConfig";
import { EmitterConfig } from "src/services/EmitterConfig";

export const DI_TOKENS = {
  editorApp: token<EditorApp>("editorApp"),
  emitterConfig: token<EmitterConfig>("EmitterConfig"),
  eventEmitter: token<EventEmitter>("eventEmitter"),
  advancedBloomFilterConfig: token<AdvancedBloomFilterConfig>("AdvancedBloomFilterConfig"),
  // particlesEmitterFactory: token<Factory<Emitter,[container: Container, config: EmitterConfigV3]>>('particlesEmitterFactory')
};
