const {test} = require('node:test');
const assert = require('node:assert/strict');
require('ts-node').register({transpileOnly: true, compilerOptions: {module: 'commonjs'}});
require.extensions['.png'] = (module, filename) => {
  module.exports = filename;
};
const {ParticleEmitter} = require('particle-flux');
const {ConfigService} = require('../src/services/ConfigService');
const {ProjectService} = require('../src/services/ProjectService');
const {EditorUseCases} = require('../src/use-cases/EditorUseCases');
const {EditorStore} = require('../src/stores/EditorStore');
const {PreviewStore} = require('../src/stores/EditorStore');
const {PreviewService} = require('../src/services/PreviewService');
const {PRESETS, defaultProject} = require('../src/domain/presets');
const config = new ConfigService();

test('destroying a preview while its chunk loads prevents a late renderer mount', async () => {
  const store = new EditorStore();
  const stats = new PreviewStore();
  let finish;
  const loading = new Promise((resolve) => (finish = resolve));
  const preview = new PreviewService(store, stats, () => loading);
  const mounting = preview.mount({});
  preview.pause();
  assert.equal(store.getState().playing, false);
  preview.play();
  assert.equal(store.getState().playing, true);
  preview.destroy();
  finish({
    PreviewRenderer: class {
      constructor() {
        assert.fail('Renderer mounted after destruction');
      }
    },
  });
  await mounting;
  assert.equal(stats.getState().ready, false);
});

test('a failed preview chunk reports an error and can be retried', async () => {
  const store = new EditorStore();
  const stats = new PreviewStore();
  let attempts = 0;
  let mounts = 0;
  let destroyed = false;
  const preview = new PreviewService(store, stats, async () => {
    if (!attempts++) throw new Error('Chunk unavailable');
    return {
      PreviewRenderer: class {
        mount() {
          mounts++;
          stats.patch({ready: true});
        }
        destroy() {
          destroyed = true;
        }
      },
    };
  });
  await preview.mount({});
  assert.match(store.getState().error, /Chunk unavailable/);
  await preview.mount({});
  assert.equal(mounts, 1);
  assert.equal(stats.getState().ready, true);
  preview.destroy();
  assert.equal(destroyed, true);
  assert.equal(stats.getState().ready, false);
});

test('an obsolete preview load failure cannot overwrite a newer mount', async () => {
  const store = new EditorStore();
  const stats = new PreviewStore();
  let rejectOld;
  let attempts = 0;
  const preview = new PreviewService(store, stats, () =>
    ++attempts === 1
      ? new Promise((_, reject) => (rejectOld = reject))
      : Promise.resolve({
          PreviewRenderer: class {
            mount() {}
            destroy() {}
          },
        }),
  );
  const oldMount = preview.mount({});
  await preview.mount({});
  rejectOld(new Error('Obsolete chunk failure'));
  await oldMount;
  assert.equal(store.getState().error, '');
  preview.destroy();
});
test('configuration exports are directly consumable JSON even for infinite defaults', () => {
  const project = defaultProject();
  project.config.emitterConfig.spawnTime = Infinity;
  project.config.emitterConfig.maxParticles = Infinity;
  project.config.particleConfig.lifeTime = {value: Infinity};
  const exported = JSON.parse(config.stringifyConfig(project.config));
  config.validate(exported);
  assert.equal(exported.emitterConfig.spawnTime, undefined);
  assert.equal(exported.emitterConfig.maxParticles, undefined);
  assert.equal(exported.particleConfig.lifeTime, undefined);
  assert.equal(project.config.particleConfig.lifeTime.value, Infinity);
});
function commands() {
  const store = new EditorStore();
  store.patch({storage: false});
  return {store, actions: new EditorUseCases(store, config, new ProjectService(config))};
}
function view() {
  return {
    x: 0,
    y: 0,
    scale: {x: 1, y: 1},
    alpha: 1,
    tint: '#ffffff',
    angle: 0,
    destroyed: false,
    visible: false,
    width: 32,
    height: 32,
  };
}

test('every native v2 preset validates, simulates, and replays deterministically', () => {
  for (const preset of PRESETS) {
    config.validate(preset.project.config);
    const emitter = new ParticleEmitter({addChild() {}, removeChild() {}}, view, preset.project.config, {
      seed: 12345,
      autoUpdate: false,
    });
    const run = () => {
      if (preset.project.config.emitterConfig.spawnInterval === undefined) emitter.emitWave();
      for (let i = 0; i < 30; i++) emitter.update(1000 / 60);
      return emitter.getParticles().map((p) => ({x: p.view.x, y: p.view.y, alpha: p.view.alpha, tint: p.view.tint}));
    };
    const first = run();
    assert.ok(first.length > 0, preset.id);
    assert.ok(
      first.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y)),
      preset.id,
    );
    emitter.restart();
    assert.deepEqual(run(), first, preset.id);
    emitter.destroy();
  }
});
test('complete projects round-trip embedded textures, seed, and unlimited fields', () => {
  const project = defaultProject();
  project.config.emitterConfig.maxParticles = Infinity;
  project.config.emitterConfig.spawnTime = Infinity;
  project.config.particleConfig.lifeTime = {value: Infinity};
  project.textures = [{id: 'custom', name: 'Pixel', url: 'data:image/png;base64,aGVsbG8='}];
  const restored = config.parseProject(config.stringify(project), defaultProject());
  assert.deepEqual(restored, project);
});
test('bare config imports preserve selected textures and preview settings', () => {
  const current = defaultProject();
  current.scene.zoom = 2;
  const next = config.parseProject(config.stringify(PRESETS[3].project.config), current);
  assert.deepEqual(next.config, config.parse(config.stringify(PRESETS[3].project.config)));
  assert.deepEqual(next.textures, current.textures);
  assert.equal(next.scene.zoom, 2);
});
test('invalid edits are atomic and do not corrupt undo / redo', () => {
  const {store, actions} = commands();
  actions.emitter({spawnInterval: 50});
  const valid = store.getState().project;
  actions.emitter({spawnInterval: 0});
  assert.equal(store.getState().project, valid);
  assert.match(store.getState().error, /positive/);
  actions.undo();
  assert.equal(store.getState().project.config.emitterConfig.spawnInterval, 24);
  actions.redo();
  assert.equal(store.getState().project.config.emitterConfig.spawnInterval, 50);
});
test('duplicate keyframes, old behavior format and unknown properties are rejected', () => {
  const project = defaultProject();
  project.config.particleConfig.speed = {
    timelapses: [
      {time: 0, value: 1},
      {time: 0, value: 2},
    ],
  };
  assert.throws(() => config.validate(project.config));
  project.config.particleConfig.speed = {value: 2};
  assert.throws(() => config.validate(project.config));
  assert.throws(() => config.validate({emitterConfig: {}, particleConfig: {speedOld: {value: 1}}}), /not supported/);
});
test('malformed project data and unsafe scene values leave the current project intact', () => {
  const {store, actions} = commands();
  const before = store.getState().project;
  for (const text of [
    '{',
    '{"emitterConfig":{}}',
    config.stringify({...before, scene: {...before.scene, zoom: 0}}),
    config.stringify({...before, textures: []}),
    config.stringify({...before, version: 1}),
  ]) {
    assert.equal(actions.import(text), false);
    assert.equal(store.getState().project, before);
  }
});
test('multi-shape, sector endpoint zero, vector scale and easing survive project import', () => {
  const project = defaultProject();
  project.config.particleConfig.spawnShape = {
    isGroupWave: true,
    shape: [
      {type: 'Torus', x: 0, y: 0, outerRadius: 20, startAngle: -90, endAngle: 0},
      {
        type: 'Chain',
        chain: [
          {x: 0, y: 0},
          {x: 20, y: 20},
        ],
      },
    ],
  };
  project.config.particleConfig.scale = {
    x: {timelapses: [{time: 0, value: 1}], randomRange: {min: 0.8, max: 1.2}},
    y: {
      timelapses: [
        {time: 0, value: 0},
        {time: 100, value: 1},
      ],
      easing: 'easeInQuad',
    },
  };
  assert.deepEqual(config.parseProject(config.stringify(project), defaultProject()), project);
});
test('removing the final texture is rejected, and a new edit clears redo history', () => {
  const {store, actions} = commands();
  actions.texture(store.getState().project.textures[0]);
  assert.equal(store.getState().project.textures.length, 1);
  assert.match(store.getState().error, /at least one/);
  actions.emitter({spawnInterval: 50});
  actions.undo();
  actions.scene({grid: false});
  assert.equal(store.getState().canRedo, false);
  actions.redo();
  assert.equal(store.getState().project.scene.grid, false);
});
