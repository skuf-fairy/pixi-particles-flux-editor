import defaultParticleTexture from "src/assets/default.png";
import { Store } from "../Store";
import { CollectionTexture, ParticleTexture, TexturesStoreState } from "./TextureStore.types";

export class TexturesStore extends Store<TexturesStoreState> {
  static defaultParticle: ParticleTexture = {
    url: defaultParticleTexture,
    name: CollectionTexture.DefaultParticle,
  };

  static acceptMimeTypes = "image/png, image/jpeg, image/jpg, image/webp, image/avif";

  constructor() {
    super({
      list: [TexturesStore.defaultParticle],
    });
  }

  public add(texture: ParticleTexture): void {
    this.setState({ list: [...this.state.list, texture] });
  }

  public drop(textureName: string): void {
    const newList = this.state.list.filter((t) => t.name !== textureName);

    if (newList.length === 0) {
      this.setState({
        list: [TexturesStore.defaultParticle],
      });
    } else {
      this.setState({ list: newList });
    }
  }

  public setTextures(textures: ParticleTexture[]): void {
    this.setState({ list: textures });
  }

  public getTextureList(): ParticleTexture[] {
    return this.state.list;
  }
}
