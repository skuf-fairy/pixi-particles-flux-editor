export type TextureUrl = string;

export class TexturesList {
  protected readonly textureUrlList: Set<TextureUrl>;
  // private readonly fileLoader: FileLoader;

  constructor(textureUrlList?: TextureUrl[]) {
    this.textureUrlList = new Set(textureUrlList) || new Set([]);
  }

  public pushTextureFromFile(...file: File[]) {
    this.pushTexture(...file.map((f) => URL.createObjectURL(f)));
  }

  public pushTexture(...url: TextureUrl[]) {
    url.forEach((v) => this.textureUrlList.add(v));
  }

  public removeTexture(url: TextureUrl) {
    this.textureUrlList.delete(url);
  }

  get textures(): TextureUrl[] {
    return Array.from(this.textureUrlList);
  }
}
