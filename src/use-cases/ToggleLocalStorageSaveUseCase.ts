import { injected } from "brandi";
import { DI_TOKENS } from "src/di/di.tokens";
import { AppConfigStore } from "src/stores/AppConfigStore/AppConfigStore";
import { LocalStorageKeys, LocalStorageUtils } from "src/utils/LocalStorageUtils";

export class ToggleLocalStorageSaveUseCase {
  constructor(private readonly appConfigStore: AppConfigStore) {}

  public toggle = (isEnabled: boolean): void => {
    if (isEnabled) {
      this.enableAutoSave();
      this.appConfigStore.setValue("isLocalStorageSaveEnabled", true);
    } else {
      this.disableAutoSave();
      this.appConfigStore.setValue("isLocalStorageSaveEnabled", false);
    }
  };

  public enableAutoSave(): void {
    LocalStorageUtils.setItem(LocalStorageKeys.AutoSave, true);
  }

  public disableAutoSave(): void {
    LocalStorageUtils.setItem(LocalStorageKeys.AutoSave, false);

    LocalStorageUtils.dropItem(LocalStorageKeys.Config);
    LocalStorageUtils.dropItem(LocalStorageKeys.Textures);
  }
}

injected(ToggleLocalStorageSaveUseCase, DI_TOKENS.appConfigStore);
