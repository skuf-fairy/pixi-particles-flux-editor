import { EmitterConfigV3 } from "@pixi/particle-emitter";

export const STAR_WARS_CONFIG: EmitterConfigV3 = {
  lifetime: {
    min: 4,
    max: 4,
  },
  frequency: 0.5,
  spawnChance: 1,
  particlesPerWave: 1,
  emitterLifetime: -1,
  maxParticles: 50,
  pos: {
    x: 0,
    y: 0,
  },
  addAtBack: false,
  behaviors: [
    {
      type: "scale",
      config: {
        scale: {
          list: [
            {
              value: 0.05,
              time: 0,
            },
            {
              value: 1,
              time: 1,
            },
          ],
        },
      },
    },

    {
      type: "moveSpeed",
      config: {
        speed: {
          list: [
            {
              value: 400,
              time: 0,
            },
            {
              value: 50,
              time: 0.2,
            },
            {
              value: 50,
              time: 1,
            },
          ],
          isStepped: false,
        },
      },
    },
    {
      type: "rotationStatic",
      config: {
        min: 0,
        max: 360,
      },
    },
    {
      type: "spawnShape",
      config: {
        type: "torus",
        data: {
          x: 0,
          y: 0,
          radius: 10,
        },
      },
    },
  ],
};
