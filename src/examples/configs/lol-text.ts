import { ParticleEmitterConfig, SpawnShapeType } from "particle-flux";

export const LOL_TEXT_EMITTER_CONFIG: ParticleEmitterConfig = {
  emitterConfig: {
    spawnInterval: 75,
    spawnParticlesPerWave: 20,
  },
  particleConfig: {
    lifeTime: {
      min: 2000,
      max: 3000,
    },
    alpha: {
      start: 1,
      end: 0,
    },
    scale: {
      start: 0.1,
      end: 0.03,
      multiplier: 10,
    },
    speed: {
      value: 0.05 * 4,
    },
    direction: {
      minAngle: 0,
      maxAngle: 360,
    },
    color: {
      start: "#aee3ff",
      end: "#ecf8ff",
    },
    spawnShape: {
      shape: {
        type: SpawnShapeType.Polygon,
        chain: [
          // L
          [
            { x: -250, y: 0 },
            { x: -250, y: 200 },
            { x: -150, y: 200 },
          ],
          // O
          [
            { x: -50, y: 0 },
            { x: 50, y: 0 },
            { x: 50, y: 200 },
            { x: -50, y: 200 },
            { x: -50, y: 0 },
          ],
          // L
          [
            { x: 150, y: 0 },
            { x: 150, y: 200 },
            { x: 250, y: 200 },
          ],
        ],
      },
    },
  },
};
