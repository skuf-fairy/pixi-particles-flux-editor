import { Emitter, EmitterConfigV3 } from "@pixi/particle-emitter";
import { Container } from "pixi.js";

export class ParticlesEmitterFactory {
  private emitter: Emitter;

  public create(container: Container, config: EmitterConfigV3) {
    this.emitter = new Emitter(container, config);
    return this.emitter;
  }
}
