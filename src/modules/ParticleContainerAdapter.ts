import {ParticleContainer} from 'pixi.js';

import {ViewContainer} from 'particle-flux';

import {ParticleAdapter} from './ParticleAdapter';

export class ParticleContainerAdapter implements ViewContainer<ParticleAdapter> {
  constructor(private readonly container: ParticleContainer) {}

  addChild(children: ParticleAdapter): void {
    this.container.addParticle(children.particle);
  }

  removeChild(children: ParticleAdapter): void {
    this.container.removeParticle(children.particle);
  }
}
