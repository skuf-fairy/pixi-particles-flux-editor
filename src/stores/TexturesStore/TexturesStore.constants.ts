import bloomParticleTexture from "src/assets/bloom-particle.png";
import defaultParticleTexture from "src/assets/default.png";
import sparkleTexture from "src/assets/sparkle.png";
import starTexture from "src/assets/star.png";
import trailTexture from "src/assets/trail.png";
import waveTexture from "src/assets/wave.png";
import { CollectionTexture, ParticleTexture } from "./TextureStore.types";

export const AVAILABLE_TEXTURES: ParticleTexture[] = [
  {
    url: defaultParticleTexture,
    name: CollectionTexture.DefaultParticle,
  },
  {
    url: waveTexture,
    name: CollectionTexture.Wave,
  },
  {
    url: starTexture,
    name: CollectionTexture.Star,
  },
  {
    url: bloomParticleTexture,
    name: CollectionTexture.BloomParticle,
  },
  {
    url: sparkleTexture,
    name: CollectionTexture.Sparkle,
  },
  {
    url: trailTexture,
    name: CollectionTexture.Trail,
  },
];
