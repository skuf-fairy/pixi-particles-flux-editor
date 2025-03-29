import { injected } from "brandi";
import { ParticleFullConfig } from "particle-flux";
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

  public init(): void {
    // this.appConfigStore.setValue("isLocalStorageSaveEnabled", this.isAutoSaveEnabled());

    const appSettings = this.getSavedAppSettings();

    if (appSettings) {
      this.appConfigStore.setState(appSettings);
    }

    const config = this.getParticleFluxConfig();

    if (config) {
      this.particleFluxConfigStore.restore(config);
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

  public getParticleFluxConfig(): ParticleFullConfig | undefined {
    return LocalStorageUtils.getItem<ParticleFullConfig>(LocalStorageKeys.Config);
  }

  private setTexturesConfig(textures: ParticleTexture[]): void {
    if (this.isAutoSaveEnabled()) {
      LocalStorageUtils.setItem(LocalStorageKeys.Textures, textures);
    }
  }

  private setParticleFluxConfig(config: ParticleFullConfig): void {
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
}

injected(
  InitializeUseCase,
  DI_TOKENS.appConfigStore,
  DI_TOKENS.particleFluxConfigStore,
  DI_TOKENS.texturesStore,
  DI_TOKENS.bloomFilterConfigStore
);
