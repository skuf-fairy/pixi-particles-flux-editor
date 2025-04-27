import { injected } from "brandi";
import { ParticleEmitter, ParticleEmitterConfig } from "particle-flux";
import { Application, Assets, Sprite, Texture } from "pixi.js";
import { DEFAULT_PARTICLE_CONFIG } from "src/constants";
import { DI_TOKENS } from "src/di/di.tokens";
import { AppConfigStore } from "src/stores/AppConfigStore/AppConfigStore";
import { AppConfigStoreState } from "src/stores/AppConfigStore/AppConfigStore.types";
import { BloomFilterConfigStore } from "src/stores/BloomFilterConfigStore/BloomFilterConfigStore";
import { BloomFilterConfigStoreState } from "src/stores/BloomFilterConfigStore/BloomFilterConfigStore.types";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { ParticleTexture } from "src/stores/TexturesStore/TextureStore.types";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { LocalStorageKeys, LocalStorageUtils } from "src/utils/LocalStorageUtils";

export class InitializeUseCase {
  constructor(
    private readonly appConfigStore: AppConfigStore,
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly texturesStore: TexturesStore,
    private readonly bloomFilterConfigStore: BloomFilterConfigStore
  ) {}

  public async init(): Promise<void> {
    // this.appConfigStore.setValue("isLocalStorageSaveEnabled", this.isAutoSaveEnabled());

    const appSettings = this.getSavedAppSettings();

    if (appSettings) {
      this.appConfigStore.setState(appSettings);
    }

    const config = this.getParticleFluxConfig();

    if (config) {
      try {
        await this.testParticleEmitterConfig(config);
        this.particleFluxConfigStore.restore(config);
      } catch {
        LocalStorageUtils.dropItem(LocalStorageKeys.Config);
        this.particleFluxConfigStore.restore(DEFAULT_PARTICLE_CONFIG);
      }
    } else {
      this.particleFluxConfigStore.restore(DEFAULT_PARTICLE_CONFIG);
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
}

injected(
  InitializeUseCase,
  DI_TOKENS.appConfigStore,
  DI_TOKENS.particleFluxConfigStore,
  DI_TOKENS.texturesStore,
  DI_TOKENS.bloomFilterConfigStore
);
