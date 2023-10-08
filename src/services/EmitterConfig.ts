import { EmitterConfigV3 } from "@pixi/particle-emitter";
import { EventEmitter } from "@pixi/utils";
import bloomParticle from "src/assets/bloom-particle.png";
import bublikTexture from "src/assets/bublik.png";
import coinImage from "src/assets/coin.png";
import defaultParticle from "src/assets/default.png";

export type TextureUrl = string;

// todo excluded keys
// textures
// todo presets
export class EmitterConfig {
  private readonly emitEventname = "config-changed";

  constructor(public config: EmitterConfigV3, private readonly eventEmitter: EventEmitter) {
    this.config.behaviors.push({
      type: "textureRandom",
      config: {
        textures: [coinImage],
      },
    });
  }

  public getConfig = () => this.config;

  public getStringifyExcludedTexturesConfig() {
    const behaviors = this.config.behaviors.filter((b) => b.type !== "textureRandom");
    const validJSONConfig = { ...this.config, behaviors };
    return JSON.stringify(validJSONConfig, null, 2);
  }

  public setConfigFromStringAndMergeTexturues(config: string) {
    const textureBehavior = this.config.behaviors.find((b) => b.type === "textureRandom");

    if (!textureBehavior) return;

    this.config = JSON.parse(config);
    this.config.behaviors.push(textureBehavior);

    this.emit();
  }

  public subscribeOnConfigChange = (cb: (config: EmitterConfigV3) => void) => {
    const onChange = () => cb(this.config);
    this.eventEmitter.on(this.emitEventname, onChange);

    return () => this.eventEmitter.off(this.emitEventname, onChange);
  };

  public pushTexture(file: File) {
    const textureBehavior = this.config.behaviors.find((b) => b.type === "textureRandom");

    if (!textureBehavior) return;

    textureBehavior.config.textures.push(URL.createObjectURL(file));

    this.config.behaviors = [...this.config.behaviors.filter((b) => b.type !== "textureRandom"), textureBehavior];

    console.log(this.config);
    this.emit();
  }

  public getTextureList = (): string[] => {
    const textureBehavior = this.config.behaviors.find((b) => b.type === "textureRandom");

    if (!textureBehavior) return [];

    return textureBehavior.config.textures as string[];
  };

  public removeTexture = (url: TextureUrl) => {
    const textureBehavior = this.config.behaviors.find((b) => b.type === "textureRandom");

    if (!textureBehavior) return;

    textureBehavior.config.textures = textureBehavior.config.textures.filter((t: string) => t !== url);

    this.config.behaviors = [...this.config.behaviors.filter((b) => b.type !== "textureRandom"), textureBehavior];

    this.emit();
  };

  private emit() {
    this.config = { ...this.config };
    this.eventEmitter.emit(this.emitEventname);
  }
}
