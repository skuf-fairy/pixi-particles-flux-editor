export enum CollectionTexture {
  DefaultParticle = "Default Particle",
  Wave = "Wave",
  Star = "Star",
  BloomParticle = "Bloom Particle",
  Sparkle = "Sparkle",
  Trail = "Trail",
  RainDrop = "Rain Drop",
  Fire = "Fire",
  CartoonSmoke = "Cartoon Smoke",
  Bubble = "Bubble",
}

export interface ParticleTexture {
  url: string;
  name: string;
}

export interface TexturesStoreState {
  list: ParticleTexture[];
}
