import {EmitterConfig, ParticleConfig, ParticleEmitterConfig} from 'particle-flux';

import {Store} from './Store';

export class ParticleFluxConfigStore extends Store<ParticleEmitterConfig> {
  constructor() {
    super({
      emitterConfig: {
        autoStart: true,
      },
      particleConfig: {
        lifeTime: {
          value: 1000,
        },
      },
    });
  }

  public getConfig(): ParticleEmitterConfig {
    return this.state;
  }

  public setFullConfig(config: ParticleEmitterConfig): void {
    this.setState(config);
  }

  public setParticleConfigValue<K extends keyof ParticleConfig>(key: K, value: ParticleConfig[K]): void {
    this.setState({
      ...this.state,
      particleConfig: {
        ...this.state.particleConfig,
        [key]: value,
      },
    });
  }

  public setParticleConfig(config: ParticleConfig): void {
    this.setState({
      ...this.state,
      particleConfig: config,
    });
  }

  public setEmitterConfig(config: EmitterConfig): void {
    this.setState({
      ...this.state,
      emitterConfig: config,
    });
  }
}
