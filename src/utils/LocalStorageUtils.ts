import {JSONUtils} from './JSONUtils';

export enum LocalStorageKeys {
  Config = 'particle-flux-config',
  Textures = 'particle-flux-textures',
  BloomFilter = 'bloom-filter-option',
  AppSettings = 'app-settings',
}

export class LocalStorageUtils {
  public static getItem<T>(key: LocalStorageKeys): T | undefined {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value) as T;
    }
  }

  public static setItem(key: LocalStorageKeys, value: any): void {
    localStorage.setItem(key, JSONUtils.stringify(value));
  }

  public static dropItem(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }
}
