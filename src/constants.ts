import { ParticleEmitterConfig, SpawnShapeType } from "particle-flux";

export const CONFIG_JSON_FILE_NAME = "config.json";
export const TEXTURES_ZIP_FILE_NAME = "particle-textures.zip";

export const DEFAULT_PARTICLE_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnParticlesPerWave: 10,
    maxParticles: 500,
    spawnChance: 100,
    spawnTimeout: 0,
    spawnTime: 0,
    spawnInterval: 50,
  },
  particleConfig: {
    lifeTime: {
      value: 800,
    },
    alpha: {
      start: 1,
      end: 0,
      multiplier: 1,
    },
    speed: {
      value: 5,
      multiplier: 1,
    },
    scale: {
      value: 0.15,
      multiplier: 1,
    },
    spawnShape: {
      shape: {
        type: SpawnShapeType.Point,
        x: 0,
        y: 0,
      },
    },
    color: {
      value: "#ffffff",
    },
    direction: {
      minAngle: 0,
      maxAngle: 360,
      isRotateByDirection: false,
    },
    rotation: {
      value: 0,
      multiplier: 1,
    },
  },
};
