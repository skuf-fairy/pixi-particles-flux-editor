import { Store } from "../Store";
import { AppConfigStoreState } from "./AppConfigStore.types";

export class AppConfigStore extends Store<AppConfigStoreState> {
  constructor() {
    super({
      backgroundColor: "#475b60",
      isLocalStorageSaveEnabled: true,
      isFollowPointer: true,
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

  public isFollowPointer(): boolean {
    return this.state.isFollowPointer;
  }

  public setFollowPointer(isFollowPointer: boolean): void {
    this.setValue("isFollowPointer", isFollowPointer);
  }
}
