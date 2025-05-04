import {Assets} from 'pixi.js';
import {DI_TOKENS} from 'src/di/di.tokens';

import {injected} from 'brandi';
import {ParticleEmitterConfig, SpawnShapeType} from 'particle-flux';
import {DEFAULT_PARTICLE_CONFIG} from 'src/constants';
import {BaseBehaviorStore} from 'src/stores/BaseBehaviorStore/BaseBehaviorStore';
import {ColorBehaviorStore} from 'src/stores/ColorBehaviorStore/ColorBehaviorStore';
import {DirectionBehaviorStore} from 'src/stores/DirectionBehaviorStore/DirectionBehaviorStore';
import {EmitterConfigStore} from 'src/stores/EmitterConfigStore/EmitterConfigStore';
import {GravityBehaviorStore} from 'src/stores/GravityBehaviorStore/GravityBehaviorStore';
import {LifetimePropertyStore} from 'src/stores/LifetimePropertyStore/LifetimePropertyStore';
import {PathBehaviorStore} from 'src/stores/PathBehaviorStore/PathBehaviorStore';
import {SpawnShapeBehaviorStore} from 'src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore';
import {TexturesStore} from 'src/stores/TexturesStore/TexturesStore';

export class ResetParticleFluxConfigUseCase {
  constructor(
    private readonly emitterConfigStore: EmitterConfigStore,
    private readonly alphaBehaviorStore: BaseBehaviorStore,
    private readonly scaleBehaviorStore: BaseBehaviorStore,
    private readonly speedBehaviorStore: BaseBehaviorStore,
    private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore,
    private readonly colorBehaviorStore: ColorBehaviorStore,
    private readonly lifetimeBehaviorStore: LifetimePropertyStore,
    private readonly directionBehaviorStore: DirectionBehaviorStore,
    private readonly rotationBehaviorStore: BaseBehaviorStore,
    private readonly gravityBehaviorStore: GravityBehaviorStore,
    private readonly pathBehaviorStore: PathBehaviorStore,
    private readonly texturesStore: TexturesStore,
  ) {}

  public reset = async (): Promise<void> => {
    this.texturesStore.reset();
    const textures = this.texturesStore.getTextureList();

    for (const texture of textures) {
      await Assets.load(texture.url);
    }

    this.setConfig(DEFAULT_PARTICLE_CONFIG);
  };

  private setConfig(config: ParticleEmitterConfig): void {
    this.emitterConfigStore.restore(config.emitterConfig);

    const {alpha, color, direction, gravity, lifeTime, path, rotation, scale, spawnShape, speed} =
      config.particleConfig;

    this.lifetimeBehaviorStore.restore(lifeTime);
    this.alphaBehaviorStore.restore(alpha);
    this.colorBehaviorStore.restore(color);
    this.directionBehaviorStore.restore(direction);
    this.gravityBehaviorStore.restore(gravity);
    this.pathBehaviorStore.restore(path);
    this.rotationBehaviorStore.restore(rotation);
    this.scaleBehaviorStore.restore(scale);
    this.spawnShapeBehaviorStore.restore(spawnShape);
    this.speedBehaviorStore.restore(speed);
  }
}

injected(
  ResetParticleFluxConfigUseCase,
  DI_TOKENS.emitterConfigStore,
  DI_TOKENS.alphaBehaviorStore,
  DI_TOKENS.scaleBehaviorStore,
  DI_TOKENS.speedBehaviorStore,
  DI_TOKENS.spawnShapeBehaviorStore,
  DI_TOKENS.colorBehaviorStore,
  DI_TOKENS.lifetimeBehaviorStore,
  DI_TOKENS.directionBehaviorStore,
  DI_TOKENS.rotationBehaviorStore,
  DI_TOKENS.gravityBehaviorStore,
  DI_TOKENS.pathBehaviorStore,
  DI_TOKENS.texturesStore,
);
