import { Point2d, ViewParticle } from "particle-flux";
import { Particle } from "pixi.js";

export class ParticleAdapter implements ViewParticle {
  constructor(public readonly particle: Particle) {}

  set x(x: number) {
    this.particle.x = x;
  }

  set y(y: number) {
    this.particle.y = y;
  }

  get x() {
    return this.particle.x;
  }

  get y() {
    return this.particle.y;
  }

  set scale(value: Point2d) {
    this.particle.scaleX = value.x;
    this.particle.scaleY = value.y;
  }

  set alpha(value: number) {
    this.particle.alpha = value;
  }

  set tint(value: string | number) {
    // todo string=>number
    if (typeof value === "number") {
      this.particle.color = value;
    }
  }

  set angle(angle: number) {
    this.particle.rotation = angle;
  }

  set destroyed(value: boolean) {
    this.particle; // todo
  }

  set visible(value: boolean) {
    if (value) {
      this.particle.alpha = 0;
    }
  }

  get width(): number {
    return 0;
  }

  get height(): number {
    return 0;
  }
}
