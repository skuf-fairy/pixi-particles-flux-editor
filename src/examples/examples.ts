import { ParticleEmitterConfig } from "particle-flux";
import { CollectionTexture } from "src/stores/TexturesStore/TextureStore.types";
import { BUBBLE_BLOW_EMITTER_CONFIG } from "./configs/bubble-blow";
import { BUBBLES_EMITTER_CONFIG } from "./configs/bubbles";
import { BUBBLES_PATH_EMITTER_CONFIG } from "./configs/bubbles-path";
import { CARTOON_SMOKE_BLAST_EMITTER_CONFIG } from "./configs/cartoon-smoke-blast";
import { FLAME_POLYGON_EMITTER_CONFIG } from "./configs/fire-polygon";
import { FLAME_EMITTER_CONFIG } from "./configs/flame";
import { FOUNTAIN_EMITTER_CONFIG } from "./configs/fountain";
import { LOL_TEXT_EMITTER_CONFIG } from "./configs/lol-text";
import { PULSE_EMITTER_CONFIG } from "./configs/pulse";
import { RAIN_EMITTER_CONFIG } from "./configs/rain";
import { STARSHIP_JUMP_EMITTER_CONFIG } from "./configs/starship-jump";
import { TRAIL_EMITTER_CONFIG } from "./configs/trail";

export enum AnimationExample {
  Pulse = "Pulse",
  Trail = "Trail",
  LolText = "Lol Text",
  Fountain = "Fountain",
  Rain = "Rain",
  FlamePolygon = "Flame Polygon",
  Flame = "Flame",
  CartoonSmokeBlast = "Cartoon Smoke Blast",
  BubblesPath = "Bubbles Path",
  Bubbles = "Bubbles",
  BubbleBlow = "BubbleBlow",
  StarshipJump = "StarshipJump",
}

export interface Example {
  name: AnimationExample;
  config: ParticleEmitterConfig;
  textures: CollectionTexture[];
}

export const PARTICLE_EMITTER_EXAMPLES: Example[] = [
  {
    name: AnimationExample.Pulse,
    config: PULSE_EMITTER_CONFIG,
    textures: [CollectionTexture.Wave],
  },
  {
    name: AnimationExample.Trail,
    config: TRAIL_EMITTER_CONFIG,
    textures: [CollectionTexture.Trail],
  },
  {
    name: AnimationExample.Rain,
    config: RAIN_EMITTER_CONFIG,
    textures: [CollectionTexture.RainDrop],
  },
  {
    name: AnimationExample.LolText,
    config: LOL_TEXT_EMITTER_CONFIG,
    textures: [CollectionTexture.DefaultParticle],
  },
  {
    name: AnimationExample.Fountain,
    config: FOUNTAIN_EMITTER_CONFIG,
    textures: [CollectionTexture.Trail],
  },
  {
    name: AnimationExample.FlamePolygon,
    config: FLAME_POLYGON_EMITTER_CONFIG,
    textures: [CollectionTexture.Fire],
  },
  {
    name: AnimationExample.Flame,
    config: FLAME_EMITTER_CONFIG,
    textures: [CollectionTexture.Fire, CollectionTexture.DefaultParticle],
  },
  {
    name: AnimationExample.CartoonSmokeBlast,
    config: CARTOON_SMOKE_BLAST_EMITTER_CONFIG,
    textures: [CollectionTexture.CartoonSmoke],
  },
  {
    name: AnimationExample.Bubbles,
    config: BUBBLES_EMITTER_CONFIG,
    textures: [CollectionTexture.Bubble],
  },
  {
    name: AnimationExample.BubblesPath,
    config: BUBBLES_PATH_EMITTER_CONFIG,
    textures: [CollectionTexture.Bubble],
  },
  {
    name: AnimationExample.BubbleBlow,
    config: BUBBLE_BLOW_EMITTER_CONFIG,
    textures: [CollectionTexture.Bubble],
  },
  {
    name: AnimationExample.StarshipJump,
    config: STARSHIP_JUMP_EMITTER_CONFIG,
    textures: [CollectionTexture.Bubble],
  },
];
