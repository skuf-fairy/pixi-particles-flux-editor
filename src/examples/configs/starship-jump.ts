import { ParticleEmitterConfig, SpawnShapeType } from "particle-flux";

export const STARSHIP_JUMP_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnParticlesPerWave: 1,
    maxParticles: 500,
    spawnChance: 100,
    spawnTimeout: 0,
    spawnTime: 0,
    spawnInterval: 500,
  },
  particleConfig: {
    lifeTime: {
      value: 5000,
    },
    speed: {
      script: [
        {
          time: 0,
          value: 0,
        },
        {
          time: 0.015,
          value: 12,
        },
        {
          time: 0.15,
          value: 2,
        },
        {
          time: 1,
          value: 2,
        },
      ],
      isInterpolate: true,
    },
    scale: {
      script: [
        {
          time: 0,
          value: 0,
        },
        {
          time: 0.1,
          value: 0.8,
        },
        {
          time: 0.5,
          value: 2,
        },
        {
          time: 1,
          value: 4,
        },
      ],
      isInterpolate: true,
    },
    spawnShape: {
      type: SpawnShapeType.Torus,
      x: 0,
      y: 0,
      innerRadius: 0,
      outerRadius: 100,
      startAngle: 0,
      endAngle: 360,
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
