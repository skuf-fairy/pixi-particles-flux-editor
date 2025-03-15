export enum CollectionTexture {
  DefaultParticle = "DefaultParticle",
  Wave = "Wave",
  Star = "Star",
  BloomParticle = "BloomParticle",
}

export interface ParticleTexture {
  url: string;
  name: string;
}

export interface TexturesStoreState {
  list: ParticleTexture[];
}
