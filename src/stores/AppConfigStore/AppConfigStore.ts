import { Store } from "../Store";
import { AppConfigStoreState } from "./AppConfigStore.types";

export class AppConfigStore extends Store<AppConfigStoreState> {
  constructor() {
    super({
      backgroundColor: "#475b60",
      isLocalStorageSaveEnabled: false,
    });
  }

  public getBackgroundColor(): string {
    return this.state.backgroundColor;
  }

  public setBackgroundColor(color: string): void {
    this.setValue("backgroundColor", color);
  }

  public isLocalStorageSaveEnabled(): boolean {
    return this.state.isLocalStorageSaveEnabled;
  }

  public setLocalStorageSaveEnabled(): void {
    this.setValue("isLocalStorageSaveEnabled", true);
  }

  public setLocalStorageSaveDisabled(): void {
    this.setValue("isLocalStorageSaveEnabled", false);
  }
}
