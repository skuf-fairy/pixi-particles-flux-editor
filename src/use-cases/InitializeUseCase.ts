import {Application, Assets, Sprite, Texture} from 'pixi.js';
import {DI_TOKENS} from 'src/di/di.tokens';
import {AppConfigStoreState} from 'src/stores/AppConfigStore/AppConfigStore.types';
import {BloomFilterConfigStoreState} from 'src/stores/BloomFilterConfigStore/BloomFilterConfigStore.types';
import {ParticleTexture} from 'src/stores/TexturesStore/TexturesStore.types';

import {injected} from 'brandi';
import {
  AlphaBehaviorConfig,
  ParticleEmitter,
  ParticleEmitterConfig,
  RotationBehaviorConfig,
  ScaleBehaviorConfig,
  SpeedBehaviorConfig,
} from 'particle-flux';
import {DEFAULT_PARTICLE_CONFIG} from 'src/constants';
import {AppConfigStore} from 'src/stores/AppConfigStore/AppConfigStore';
import {BaseBehaviorStore} from 'src/stores/BaseBehaviorStore/BaseBehaviorStore';
import {BloomFilterConfigStore} from 'src/stores/BloomFilterConfigStore/BloomFilterConfigStore';
import {ColorBehaviorStore} from 'src/stores/ColorBehaviorStore/ColorBehaviorStore';
import {DirectionBehaviorStore} from 'src/stores/DirectionBehaviorStore/DirectionBehaviorStore';
import {EmitterConfigStore} from 'src/stores/EmitterConfigStore/EmitterConfigStore';
import {GravityBehaviorStore} from 'src/stores/GravityBehaviorStore/GravityBehaviorStore';
import {LifetimePropertyStore} from 'src/stores/LifetimePropertyStore/LifetimePropertyStore';
import {ParticleFluxConfigStore} from 'src/stores/ParticleFluxConfigStore';
import {PathBehaviorStore} from 'src/stores/PathBehaviorStore/PathBehaviorStore';
import {SpawnShapeBehaviorStore} from 'src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore';
import {TexturesStore} from 'src/stores/TexturesStore/TexturesStore';
import {LocalStorageKeys, LocalStorageUtils} from 'src/utils/LocalStorageUtils';

export class InitializeUseCase {
  constructor(
    private readonly appConfigStore: AppConfigStore,
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly texturesStore: TexturesStore,
    private readonly bloomFilterConfigStore: BloomFilterConfigStore,
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

  public async init(): Promise<void> {
    // this.appConfigStore.setValue("isLocalStorageSaveEnabled", this.isAutoSaveEnabled());

    this.subscribe();

    const appSettings = this.getSavedAppSettings();

    if (appSettings) {
      this.appConfigStore.setState(appSettings);
    }

    const config = this.getParticleFluxConfig();

    if (config) {
      try {
        await this.testParticleEmitterConfig(config);
        this.setConfig(config);
      } catch {
        LocalStorageUtils.dropItem(LocalStorageKeys.Config);
        this.setConfig(DEFAULT_PARTICLE_CONFIG);
      }
    } else {
      this.setConfig(DEFAULT_PARTICLE_CONFIG);
    }

    const textures = this.getSavedTexturesConfig();

    if (textures) {
      this.texturesStore.setTextures(textures);
    }

    const bloomFilterConfig = this.getSavedBloomFilterConfig();
    if (bloomFilterConfig) {
      this.bloomFilterConfigStore.setState(bloomFilterConfig);
    }

    this.appConfigStore.subscribe((config) => {
      this.setSavedAppSettings(config);
    });

    this.particleFluxConfigStore.subscribe((config) => {
      this.setParticleFluxConfig(config);
    });

    this.texturesStore.subscribe(() => {
      this.setTexturesConfig(this.texturesStore.getTextureList());
    });

    this.bloomFilterConfigStore.subscribe((config) => {
      LocalStorageUtils.setItem(LocalStorageKeys.BloomFilter, config);
    });

    await Assets.load(this.texturesStore.getTextureList().map((t) => t.url));
  }

  private isAutoSaveEnabled(): boolean {
    return this.appConfigStore.isLocalStorageSaveEnabled();
  }

  public getParticleFluxConfig(): ParticleEmitterConfig | undefined {
    return LocalStorageUtils.getItem<ParticleEmitterConfig>(LocalStorageKeys.Config);
  }

  private setTexturesConfig(textures: ParticleTexture[]): void {
    if (this.isAutoSaveEnabled()) {
      LocalStorageUtils.setItem(LocalStorageKeys.Textures, textures);
    }
  }

  private setParticleFluxConfig(config: ParticleEmitterConfig): void {
    if (this.isAutoSaveEnabled()) {
      LocalStorageUtils.setItem(LocalStorageKeys.Config, config);
    }
  }

  private setSavedAppSettings(config: AppConfigStoreState): void {
    LocalStorageUtils.setItem(LocalStorageKeys.AppSettings, config);
  }

  private getSavedTexturesConfig(): ParticleTexture[] | undefined {
    return LocalStorageUtils.getItem(LocalStorageKeys.Textures);
  }

  private getSavedBloomFilterConfig(): BloomFilterConfigStoreState | undefined {
    return LocalStorageUtils.getItem(LocalStorageKeys.BloomFilter);
  }

  private getSavedAppSettings(): AppConfigStoreState | undefined {
    return LocalStorageUtils.getItem(LocalStorageKeys.AppSettings);
  }

  private async testParticleEmitterConfig(config: ParticleEmitterConfig): Promise<void> {
    const app = new Application();

    await Assets.load(this.texturesStore.getTextureList().map((t) => t.url));

    await app.init({
      background: this.appConfigStore.getBackgroundColor(),
      width: 0,
      height: 0,
    });

    try {
      new ParticleEmitter<Sprite>(app.stage, () => new Sprite(Texture.EMPTY), config);
    } catch (e) {
      throw e;
    } finally {
      app.destroy();
    }
  }

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

  private subscribe(): void {
    this.alphaBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue(
        'alpha',
        this.alphaBehaviorStore.getActiveConfig() as AlphaBehaviorConfig,
      );
    });

    this.speedBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue(
        'speed',
        this.speedBehaviorStore.getActiveConfig() as SpeedBehaviorConfig,
      );
    });
    this.scaleBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue(
        'scale',
        this.scaleBehaviorStore.getActiveConfig() as ScaleBehaviorConfig,
      );
    });
    this.spawnShapeBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue(
        'spawnShape',
        this.spawnShapeBehaviorStore.getSpawnShapeBehavior(),
      );
    });
    this.colorBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue('color', this.colorBehaviorStore.getActiveConfig());
    });
    this.lifetimeBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue('lifeTime', this.lifetimeBehaviorStore.getActiveConfig());
    });
    this.directionBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue('direction', this.directionBehaviorStore.getActiveConfig());
    });
    this.rotationBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue(
        'rotation',
        this.rotationBehaviorStore.getActiveConfig() as RotationBehaviorConfig,
      );
    });
    this.gravityBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue('gravity', this.gravityBehaviorStore.getActiveConfig());
    });
    this.pathBehaviorStore.subscribe(() => {
      this.particleFluxConfigStore.setParticleConfigValue('path', this.pathBehaviorStore.getActiveConfig());
    });

    this.emitterConfigStore.subscribe(() => {
      this.particleFluxConfigStore.setEmitterConfig(this.emitterConfigStore.getConfig());
    });
  }
}

injected(
  InitializeUseCase,
  DI_TOKENS.appConfigStore,
  DI_TOKENS.particleFluxConfigStore,
  DI_TOKENS.texturesStore,
  DI_TOKENS.bloomFilterConfigStore,
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
