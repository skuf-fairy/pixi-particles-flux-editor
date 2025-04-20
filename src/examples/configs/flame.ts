import { ParticleEmitterConfig, SpawnShapeType } from "particle-flux";

export const FLAME_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 50,
    spawnParticlesPerWave: 10,
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
      start: 0.6,
      end: 3,
    },
    direction: {
      minAngle: -100,
      maxAngle: -110,
      isRotateByDirection: true,
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
      type: SpawnShapeType.Torus,
      x: 0,
      y: 0,
      outerRadius: 5,
    },
  },
};
