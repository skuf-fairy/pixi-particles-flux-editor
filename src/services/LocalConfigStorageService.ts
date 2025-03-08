import { ParticleFluxConfig } from "particle-flux";
import { ParticleTexture } from "src/stores/TexturesStore/TexturesStore";

enum LocalStorageKeys {
  Config = "particle-flux-config",
  Textures = "particle-flux-textures",
  AutoSave = "auto-save-enabled",
}

// todo
export class LocalConfigStorageService {
  public setParticleFluxConfig(config: ParticleFluxConfig): void {
    if (this.isAutoSaveEnabled()) {
      this.setItem(LocalStorageKeys.Config, config);
    }
  }

  public getParticleFluxConfig(): ParticleFluxConfig | undefined {
    return this.getItem<ParticleFluxConfig>(LocalStorageKeys.Config);
  }

  public setTexturesConfig(textures: ParticleTexture[]): void {
    if (this.isAutoSaveEnabled()) {
      this.setItem(LocalStorageKeys.Textures, textures);
    }
  }

  public getTexturesConfig(): ParticleTexture[] | undefined {
    return this.getItem(LocalStorageKeys.Textures);
  }

  public isAutoSaveEnabled(): boolean {
    const isSavedOption = this.getItem<boolean>(LocalStorageKeys.AutoSave);

    if (isSavedOption === undefined) return true;

    return isSavedOption;
  }

  public enableAutoSave(): void {
    this.setItem(LocalStorageKeys.AutoSave, true);
  }

  public disableAutoSave(): void {
    this.setItem(LocalStorageKeys.AutoSave, false);

    this.dropItem(LocalStorageKeys.Config);
    this.dropItem(LocalStorageKeys.Textures);
  }

  private getItem<T>(key: LocalStorageKeys): T | undefined {
    const config = localStorage.getItem(key);

    if (config) {
      try {
        return JSON.parse(config) as T;
      } catch {
        // todo error
      }
    }
  }

  private setItem(key: LocalStorageKeys, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private dropItem(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }
}
