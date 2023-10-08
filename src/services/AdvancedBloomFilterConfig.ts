import { AdvancedBloomFilter, AdvancedBloomFilterOptions } from "@pixi/filter-advanced-bloom";
import { EventEmitter } from "@pixi/utils";
import { BLEND_MODES } from "pixi.js";

export type AdvancedBloomFilterConfigOptions = Omit<AdvancedBloomFilterOptions, "pixelSize" | "resolution"> & {
  enabled: boolean;
  blendMode: BLEND_MODES;
};

export class AdvancedBloomFilterConfig {
  private readonly emitEventname = "config-changed";

  public config: AdvancedBloomFilterConfigOptions;

  constructor(private readonly eventEmitter: EventEmitter) {
    const { pixelSize, ...options } = AdvancedBloomFilter.defaults;
    this.config = {
      enabled: false,
      blendMode: BLEND_MODES.NORMAL,
      ...options,
      threshold: 0.2,
    };
  }

  public getStringifyConfig() {
    return JSON.stringify(this.config, null, 2);
  }

  public setConfigFromString(config: string) {
    this.config = JSON.parse(config);
    this.emit();
  }

  // public setParam<K extends keyof AdvancedBloomFilterOptions>(key: K, value: AdvancedBloomFilterOptions[K]) {
  //   this.config[key] = value;
  //   this.emit();
  // }

  public subscribeOnConfigChange = (
    cb: (config: AdvancedBloomFilterConfigOptions) => void,
    isHandleImmediatly: boolean = false
  ) => {
    const onChange = () => cb(this.config);
    this.eventEmitter.on(this.emitEventname, onChange);

    if (isHandleImmediatly) {
      cb(this.config);
    }

    return () => this.eventEmitter.off(this.emitEventname, onChange);
  };

  public getConfig = () => this.config;

  private emit() {
    this.config = { ...this.config };
    this.eventEmitter.emit(this.emitEventname);
  }
}
