import { injected } from "brandi";
import { ParticleFluxConfig } from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { AppConfigStore } from "src/stores/AppConfigStore/AppConfigStore";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { ParticleTexture, TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { LocalStorageKeys, LocalStorageUtils } from "src/utils/LocalStorageUtils";

export class InitializeUseCase {
  constructor(
    private readonly appConfigStore: AppConfigStore,
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly texturesStore: TexturesStore
  ) {}

  public init(): void {
    this.appConfigStore.setValue("isLocalStorageSaveEnabled", this.isAutoSaveEnabled());

    const config = this.getParticleFluxConfig();

    if (config) {
      this.particleFluxConfigStore.restore(config);
    } else {
      this.setParticleFluxConfig(this.particleFluxConfigStore.getConfig());
    }

    const textures = this.getTexturesConfig();

    if (textures) {
      this.texturesStore.setTextures(textures);
    } else {
      this.setTexturesConfig(this.texturesStore.getTextureList());
    }
  }

  private isAutoSaveEnabled(): boolean {
    const isSavedOption = LocalStorageUtils.getItem<boolean>(LocalStorageKeys.AutoSave);

    if (isSavedOption === undefined) return true;

    return isSavedOption;
  }

  public getParticleFluxConfig(): ParticleFluxConfig | undefined {
    return LocalStorageUtils.getItem<ParticleFluxConfig>(LocalStorageKeys.Config);
  }

  private setTexturesConfig(textures: ParticleTexture[]): void {
    if (this.isAutoSaveEnabled()) {
      LocalStorageUtils.setItem(LocalStorageKeys.Textures, textures);
    }
  }

  private setParticleFluxConfig(config: ParticleFluxConfig): void {
    if (this.isAutoSaveEnabled()) {
      LocalStorageUtils.setItem(LocalStorageKeys.Config, config);
    }
  }

  private getTexturesConfig(): ParticleTexture[] | undefined {
    return LocalStorageUtils.getItem(LocalStorageKeys.Textures);
  }
}

injected(InitializeUseCase, DI_TOKENS.appConfigStore, DI_TOKENS.particleFluxConfigStore, DI_TOKENS.texturesStore);
