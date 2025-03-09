import { Store } from "../Store";
import { AppConfigStoreState } from "./AppConfigStore.types";

export class AppConfigStore extends Store<AppConfigStoreState> {
  constructor() {
    super({
      backgroundColor: "#475b60",
      isLocalStorageSaveEnabled: false,
    });
  }
}
