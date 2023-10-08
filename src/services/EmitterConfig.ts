import { EmitterConfigV3 } from "@pixi/particle-emitter";
import { EventEmitter } from "@pixi/utils";
import defaultParticle from "src/assets/default.png";
import sparkleTexture from "src/assets/sparkle.png";

export type TextureUrl = string;

// todo excluded keys
// textures
// todo presets
export class EmitterConfig {
  private readonly emitEventname = "config-changed";
  private readonly configTextureTypeNameList: string[] = [
    "textureRandom",
    "textureSingle",
    "textureOrdered",
    "animatedSingle",
    "animatedRandom",
  ];
  private customTextureList: string[];

  constructor(public config: EmitterConfigV3, private readonly eventEmitter: EventEmitter) {
    this.customTextureList = [defaultParticle, sparkleTexture];
    this.mergeTextureListToConfig();
  }

  public getConfig = () => this.config;

  public getStringifyExcludedTexturesConfig() {
    const behaviors = this.config.behaviors.filter((b) => !this.configTextureTypeNameList.includes(b.type));
    const validJSONConfig = { ...this.config, behaviors };
    return JSON.stringify(validJSONConfig, null, 2);
  }

  public setConfigFromStringAndMergeTextures(config: string) {
    this.config = JSON.parse(config);

    this.emit();
  }

  public subscribeOnConfigChange = (cb: (config: EmitterConfigV3) => void) => {
    const onChange = () => cb(this.config);
    this.eventEmitter.on(this.emitEventname, onChange);

    return () => this.eventEmitter.off(this.emitEventname, onChange);
  };

  public pushTexture(file: File) {
    this.customTextureList = [...this.customTextureList, URL.createObjectURL(file)];

    this.emit();
  }

  public getTextureList = (): string[] => {
    return this.customTextureList;
  };

  public removeTexture = (url: TextureUrl) => {
    this.customTextureList = this.customTextureList.filter((t: string) => t !== url);

    this.emit();
  };

  private emit() {
    this.mergeTextureListToConfig();
    this.config = { ...this.config };
    this.eventEmitter.emit(this.emitEventname);
  }

  private mergeTextureListToConfig() {
    const behaviors = this.config.behaviors.filter((b) => !this.configTextureTypeNameList.includes(b.type));
    if (this.customTextureList.length === 1) {
      behaviors.push({
        type: "textureSingle",
        config: {
          texture: this.customTextureList[0],
        },
      });
    } else {
      behaviors.push({
        type: "textureRandom",
        config: {
          textures: this.customTextureList,
        },
      });
    }

    this.config.behaviors = behaviors;
  }
}
