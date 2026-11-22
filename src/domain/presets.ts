import glow from '../assets/bloom-particle.png';
import bubble from '../assets/bubble.png';
import smoke from '../assets/cartoon-smoke.png';
import dot from '../assets/default.png';
import flame from '../assets/fire.png';
import drop from '../assets/rain-drop.png';
import spark from '../assets/sparkle.png';
import star from '../assets/star.png';
import trail from '../assets/trail.png';
import wave from '../assets/wave.png';

import type {NumberTimelapsesConfig, ParticleConfig, ParticleEmitterConfig} from 'particle-flux';

import type {Preset, Project, SceneSettings, TextureAsset} from './types';

export const TEXTURES: TextureAsset[] = [
  {id: 'glow', name: 'Soft glow', url: glow},
  {id: 'spark', name: 'Sparkle', url: spark},
  {id: 'smoke', name: 'Smoke', url: smoke},
  {id: 'bubble', name: 'Bubble', url: bubble},
  {id: 'star', name: 'Star', url: star},
  {id: 'drop', name: 'Raindrop', url: drop},
  {id: 'flame', name: 'Flame', url: flame},
  {id: 'trail', name: 'Trail', url: trail},
  {id: 'wave', name: 'Wave', url: wave},
  {id: 'dot', name: 'Dot', url: dot},
];
export const curve = (start: number, end = start): NumberTimelapsesConfig => ({
  timelapses: [
    {time: 0, value: start},
    {time: 100, value: end},
  ],
});
export const DEFAULT_SCENE: SceneSettings = {
  background: '#10121c',
  grid: true,
  guides: true,
  followPointer: false,
  blend: 'add',
  zoom: 1,
  timeScale: 1,
  seed: 12345,
  bloom: false,
};
const base: ParticleEmitterConfig = {
  emitterConfig: {spawnInterval: 24, spawnParticlesPerWave: 4, maxParticles: 1500, spawnChance: 100},
  particleConfig: {
    lifeTime: {min: 900, max: 1800},
    spawnPosition: {x: 0, y: 0},
    spawnShape: {shape: {type: 'Torus', x: 0, y: 0, innerRadius: 0, outerRadius: 14}},
    direction: {minAngle: 0, maxAngle: 360},
    speed: {...curve(3.5, 0.4), randomRange: {min: 0.5, max: 1.4}},
    alpha: {
      timelapses: [
        {time: 0, value: 0},
        {time: 12, value: 1},
        {time: 100, value: 0},
      ],
    },
    scale: curve(0.24, 0.02),
    color: {
      timelapses: [
        {time: 0, value: '#ddd6ff'},
        {time: 45, value: '#a78bfa'},
        {time: 100, value: '#4f46e5'},
      ],
    },
  },
};
function preset(
  id: string,
  name: string,
  description: string,
  color: string,
  texture: string,
  particle: Partial<ParticleConfig> = {},
  emitter: Partial<ParticleEmitterConfig['emitterConfig']> = {},
  scene: Partial<SceneSettings> = {},
): Preset {
  return {
    id,
    name,
    description,
    color,
    project: {
      version: 2,
      name,
      config: {
        emitterConfig: {...base.emitterConfig, ...emitter},
        particleConfig: {...base.particleConfig, ...particle},
      },
      textures: [TEXTURES.find((t) => t.id === texture)!],
      scene: {...DEFAULT_SCENE, ...scene},
    },
  };
}
export const PRESETS: Preset[] = [
  preset('nebula', 'Violet nebula', 'Soft light · radial drift', '#a78bfa', 'glow'),
  preset('fire', 'Ember fountain', 'Warm sparks · rising heat', '#fb923c', 'glow', {
    direction: {minAngle: 248, maxAngle: 292},
    speed: curve(4, 1.2),
    gravity: curve(1.1),
    scale: curve(0.18, 0.015),
    color: {
      timelapses: [
        {time: 0, value: '#fff0b3'},
        {time: 35, value: '#ff9e3d'},
        {time: 100, value: '#e83a22'},
      ],
    },
  }),
  preset(
    'stars',
    'Stardust',
    'Glitter · slow rotation',
    '#facc15',
    'star',
    {
      speed: curve(1.5, 0.4),
      scale: curve(0.15, 0),
      rotation: curve(0, 180),
      color: {
        timelapses: [
          {time: 0, value: '#fff2b0'},
          {time: 100, value: '#fbbf24'},
        ],
      },
    },
    {spawnInterval: 60, spawnParticlesPerWave: 3},
  ),
  preset(
    'bubbles',
    'Ocean bubbles',
    'Buoyant · soft expansion',
    '#67e8f9',
    'bubble',
    {
      direction: {minAngle: 250, maxAngle: 290},
      speed: curve(0.7, 1.5),
      scale: curve(0.1, 0.4),
      lifeTime: {min: 1800, max: 3000},
      spawnShape: {shape: {type: 'Rectangle', x: -140, y: 100, width: 280, height: 20}},
      color: {
        timelapses: [
          {time: 0, value: '#a5f3fc'},
          {time: 100, value: '#38bdf8'},
        ],
      },
    },
    {spawnInterval: 100, spawnParticlesPerWave: 2},
    {blend: 'normal'},
  ),
  preset(
    'smoke',
    'Smoke plume',
    'Weightless · billowing cloud',
    '#94a3b8',
    'smoke',
    {
      lifeTime: {min: 1800, max: 2800},
      direction: {minAngle: 255, maxAngle: 285},
      speed: curve(1.2, 0.5),
      scale: curve(0.08, 0.65),
      alpha: {
        timelapses: [
          {time: 0, value: 0},
          {time: 20, value: 0.35},
          {time: 100, value: 0},
        ],
      },
      rotation: {...curve(0, 65), randomRange: {min: -1, max: 1}},
      color: {
        timelapses: [
          {time: 0, value: '#94a3b8'},
          {time: 100, value: '#475569'},
        ],
      },
    },
    {spawnInterval: 85, spawnParticlesPerWave: 2},
    {blend: 'normal'},
  ),
  preset(
    'rain',
    'Midnight rain',
    'Directional · falling streaks',
    '#60a5fa',
    'drop',
    {
      lifeTime: {value: 1300},
      spawnShape: {shape: {type: 'Rectangle', x: -300, y: -240, width: 600, height: 20}},
      direction: {angle: 100, isRotateByDirection: true},
      speed: curve(7),
      scale: curve(0.12),
      color: {
        timelapses: [
          {time: 0, value: '#93c5fd'},
          {time: 100, value: '#3b82f6'},
        ],
      },
    },
    {spawnInterval: 35, spawnParticlesPerWave: 5},
  ),
  preset(
    'burst',
    'Solar burst',
    'Single wave · radial explosion',
    '#fb7185',
    'spark',
    {
      direction: {startAngle: 0, deltaAngle: 3},
      speed: curve(6, 0),
      scale: curve(0.22, 0),
      color: {
        timelapses: [
          {time: 0, value: '#fff7ed'},
          {time: 100, value: '#fb7185'},
        ],
      },
    },
    {spawnInterval: undefined, spawnParticlesPerWave: 120},
  ),
  preset(
    'path',
    'Sine ribbons',
    'Expression path · flowing light',
    '#34d399',
    'glow',
    {
      direction: {angle: 0},
      speed: curve(3),
      path: {path: '35*sin(x/35)'},
      scale: curve(0.1, 0.02),
      color: {
        timelapses: [
          {time: 0, value: '#a7f3d0'},
          {time: 100, value: '#059669'},
        ],
      },
    },
    {spawnInterval: 16, spawnParticlesPerWave: 2},
  ),
];
export function clone<T>(value: T): T {
  return structuredClone(value);
}
export function defaultProject(): Project {
  return clone(PRESETS[0].project);
}
