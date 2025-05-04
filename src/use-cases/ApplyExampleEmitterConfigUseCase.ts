import {Assets} from 'pixi.js';
import {DI_TOKENS} from 'src/di/di.tokens';
import {AVAILABLE_TEXTURES} from 'src/stores/TexturesStore/TexturesStore.constants';
import {CollectionTexture, ParticleTexture} from 'src/stores/TexturesStore/TexturesStore.types';

import {injected} from 'brandi';
import {ParticleEmitterConfig} from 'particle-flux';
import {Example} from 'src/examples/examples';
import {BaseBehaviorStore} from 'src/stores/BaseBehaviorStore/BaseBehaviorStore';
import {ColorBehaviorStore} from 'src/stores/ColorBehaviorStore/ColorBehaviorStore';
import {DirectionBehaviorStore} from 'src/stores/DirectionBehaviorStore/DirectionBehaviorStore';
import {EmitterConfigStore} from 'src/stores/EmitterConfigStore/EmitterConfigStore';
import {GravityBehaviorStore} from 'src/stores/GravityBehaviorStore/GravityBehaviorStore';
import {LifetimePropertyStore} from 'src/stores/LifetimePropertyStore/LifetimePropertyStore';
import {PathBehaviorStore} from 'src/stores/PathBehaviorStore/PathBehaviorStore';
import {SpawnShapeBehaviorStore} from 'src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore';
import {TexturesStore} from 'src/stores/TexturesStore/TexturesStore';

export class ApplyExampleEmitterConfigUseCase {
  constructor(
    private readonly texturesStore: TexturesStore,
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
  ) {}

  public applyExample = async (example: Example): Promise<void> => {
    const textures: ParticleTexture[] = [];

    for (const textureName of example.textures) {
      const url = this.getTexture(textureName)?.url;

      if (url) {
        await Assets.load(url);

        textures.push({
          name: textureName,
          url,
        });
      }
    }

    this.texturesStore.set(textures);

    this.setConfig(example.config);
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

  private getTexture(textureName: CollectionTexture): ParticleTexture | undefined {
    return AVAILABLE_TEXTURES.find((t) => t.name === textureName);
  }
}

injected(
  ApplyExampleEmitterConfigUseCase,
  DI_TOKENS.texturesStore,
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
);
