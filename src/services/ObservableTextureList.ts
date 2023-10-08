import { EventEmitter } from "@pixi/utils";
import bloomParticle from "src/assets/bloom-particle.png";
import bublikTexture from "src/assets/bublik.png";
import defaultParticle from "src/assets/default.png";
import { TextureUrl, TexturesList } from "./TexturesList";

export class ObservableTexturesList extends TexturesList {
  private readonly emitter: EventEmitter;
  private readonly emitEventname = "textures-changed";
  private prevTextures: TextureUrl[];

  constructor() {
    super([defaultParticle, bublikTexture, bloomParticle]);
    this.prevTextures = this.textures;

    this.emitter = new EventEmitter();
  }

  public pushTextureFromFile(...file: File[]): void {
    super.pushTextureFromFile(...file);
    this.emit();
  }

  public pushTexture = (...url: TextureUrl[]) => {
    super.pushTexture(...url);
    this.emit();
  };

  public removeTexture = (url: TextureUrl) => {
    super.removeTexture(url);
    this.emit();
  };

  public getTextures = () => {
    if (this.prevTextures.length === this.textures.length) {
      return this.prevTextures;
    }

    this.prevTextures = this.textures;
    return this.textures;
  };

  public subscribeOnTexturesChange = (cb: (textureList: string[]) => void) => {
    const onChange = () => cb(this.textures);
    this.emitter.on(this.emitEventname, onChange);

    return () => this.emitter.off(this.emitEventname, onChange);
  };

  private emit() {
    this.emitter.emit(this.emitEventname);
  }
}
