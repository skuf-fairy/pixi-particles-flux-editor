import { ParticleEmitterConfig, SpawnShapeType } from "particle-flux";

export const FLAME_POLYGON_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 50,
    spawnParticlesPerWave: 20,
  },
  particleConfig: {
    lifeTime: {
      min: 2000,
      max: 3000,
    },
    alpha: {
      start: 0.62,
      end: 0,
    },
    speed: {
      start: 0.1,
      end: 0.5,
    },
    direction: {
      minAngle: -100,
      maxAngle: -110,
    },
    scale: {
      start: 0.25,
      end: 0.75,
    },
    color: {
      start: "#fff191",
      end: "#ff622c",
    },
    spawnShape: {
      shape: {
        type: SpawnShapeType.Chain,
        chain: [
          {
            x: -300,
            y: 0,
          },
          {
            x: -300,
            y: -300,
          },
          {
            x: 0,
            y: -500,
          },
          {
            x: 300,
            y: -300,
          },
          {
            x: 300,
            y: 0,
          },
          {
            x: -300,
            y: 0,
          },
        ],
      },
    },
  },
};
