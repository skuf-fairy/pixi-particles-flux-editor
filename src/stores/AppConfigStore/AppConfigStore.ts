import { Store } from "../Store";
import { AppConfigStoreState } from "./AppConfigStore.types";

export class AppConfigStore extends Store<AppConfigStoreState> {
  constructor() {
    super({
      backgroundColor: "#ffffff",
      isLocalStorageSaveEnabled: false,
    });
  }
}
