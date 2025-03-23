import { Store } from "../Store";

export class PerformanceStore extends Store<{
  particleCount: number;
}> {
  constructor() {
    super({ particleCount: 0 });
  }

  public setParticlesCount(count: number): void {
    this.setValue("particleCount", count);
  }

  public getParticleCount(): number {
    return this.state.particleCount;
  }
}
