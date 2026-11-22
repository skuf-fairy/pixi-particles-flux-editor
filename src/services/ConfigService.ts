import {ParticleEmitter} from 'particle-flux';
import type {ParticleEmitterConfig, ViewParticle} from 'particle-flux';

import {DEFAULT_SCENE, TEXTURES, clone} from '../domain/presets';
import type {Project} from '../domain/types';

const emitterKeys = [
  'spawnInterval',
  'spawnTime',
  'spawnTimeout',
  'maxParticles',
  'spawnParticlesPerWave',
  'spawnChance',
  'autoStart',
];
const particleKeys = [
  'lifeTime',
  'spawnPosition',
  'spawnShape',
  'direction',
  'speed',
  'scale',
  'alpha',
  'gravity',
  'rotation',
  'color',
  'path',
];
function object(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
function keys(value: Record<string, unknown>, allowed: string[], label: string): void {
  const unknown = Object.keys(value).find((key) => !allowed.includes(key));
  if (unknown) throw new Error(`${label}.${unknown} is not supported in particle-flux 2.0.0.`);
}
export class ConfigService {
  /** JSON has no Infinity number; omitted optional fields have the same Flux defaults. */
  stringifyConfig(config: ParticleEmitterConfig): string {
    const portable = clone(config);
    if (portable.emitterConfig.maxParticles === Infinity) delete portable.emitterConfig.maxParticles;
    if (portable.emitterConfig.spawnTime === Infinity) delete portable.emitterConfig.spawnTime;
    const lifetime = portable.particleConfig.lifeTime;
    if (lifetime && 'value' in lifetime && lifetime.value === Infinity) delete portable.particleConfig.lifeTime;
    return this.stringify(portable);
  }
  validate(config: unknown): asserts config is ParticleEmitterConfig {
    if (!object(config) || !object(config.emitterConfig) || !object(config.particleConfig)) {
      throw new Error('Expected emitterConfig and particleConfig objects.');
    }
    keys(config, ['emitterConfig', 'particleConfig'], 'config');
    keys(config.emitterConfig, emitterKeys, 'emitterConfig');
    keys(config.particleConfig, particleKeys, 'particleConfig');
    if (config.emitterConfig.autoStart !== undefined && typeof config.emitterConfig.autoStart !== 'boolean')
      throw new Error('autoStart must be a boolean.');
    // Validation uses the public API with autoStart disabled: no timer, canvas or renderer allocation.
    const validator = new ParticleEmitter<ViewParticle>(
      {addChild() {}, removeChild() {}},
      () => ({
        x: 0,
        y: 0,
        scale: {x: 1, y: 1},
        alpha: 1,
        tint: '#ffffff',
        angle: 0,
        destroyed: false,
        visible: false,
        width: 1,
        height: 1,
      }),
      {...(config as unknown as ParticleEmitterConfig), emitterConfig: {...config.emitterConfig, autoStart: false}},
      {autoUpdate: false, seed: 1},
    );
    validator.destroy();
  }
  stringify(value: unknown): string {
    return JSON.stringify(value, (_key, val) => (val === Infinity ? 'Infinity' : val), 2);
  }
  parse(text: string): unknown {
    return JSON.parse(text, (key, val) =>
      val === 'Infinity' && ['value', 'maxParticles', 'spawnTime'].includes(key) ? Infinity : val,
    );
  }
  parseProject(text: string, current: Project): Project {
    const data = this.parse(text);
    if (object(data) && 'version' in data) {
      if (data.version !== 2)
        throw new Error('This project format is unsupported. Import a particle-flux 2.0.0 configuration.');
      this.validate(data.config);
      if (typeof data.name !== 'string' || !data.name.trim()) throw new Error('Project name is required.');
      if (!Array.isArray(data.textures) || !data.textures.length) throw new Error('Select at least one texture.');
      const textures = data.textures.map((asset: unknown) => {
        if (
          !object(asset) ||
          typeof asset.id !== 'string' ||
          typeof asset.name !== 'string' ||
          typeof asset.url !== 'string'
        )
          throw new Error('Invalid texture asset.');
        const builtin = TEXTURES.find((t) => t.id === asset.id);
        if (builtin) return clone(builtin);
        if (!/^data:image\/(png|jpeg|webp);base64,/i.test(asset.url))
          throw new Error('Custom textures must be embedded PNG, JPEG or WebP images.');
        return {id: asset.id, name: asset.name, url: asset.url};
      });
      if (!object(data.scene)) throw new Error('Invalid scene settings.');
      const scene = {...DEFAULT_SCENE, ...data.scene};
      for (const key of ['grid', 'guides', 'followPointer', 'bloom'] as const)
        if (typeof scene[key] !== 'boolean') throw new Error(`Invalid scene ${key}.`);
      if (!/^#[0-9a-f]{6}$/i.test(scene.background) || !['normal', 'add', 'screen'].includes(scene.blend))
        throw new Error('Invalid scene appearance.');
      if (
        !Number.isFinite(scene.zoom) ||
        scene.zoom < 0.1 ||
        scene.zoom > 4 ||
        !Number.isFinite(scene.timeScale) ||
        scene.timeScale < 0.1 ||
        scene.timeScale > 4
      )
        throw new Error('Zoom and playback speed must be between 0.1 and 4.');
      if (!Number.isSafeInteger(scene.seed) || scene.seed === 0 || scene.seed % 2147483647 === 0)
        throw new Error('Seed must be a nonzero safe integer, not a multiple of 2147483647.');
      return {version: 2, name: data.name, config: data.config, textures, scene};
    }
    this.validate(data);
    return {...clone(current), config: data, name: 'Imported effect'};
  }
}
