import defaultParticle from "src/assets/default.png";
import { Store } from "../Store";

export interface ParticleTexture {
  url: string;
  name: string;
}

export class TexturesStore extends Store<{
  list: ParticleTexture[];
}> {
  static defaultParticle: ParticleTexture = {
    url: defaultParticle,
    name: "default.png",
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

  public getTextureList(): ParticleTexture[] {
    return this.state.list;
  }
}
