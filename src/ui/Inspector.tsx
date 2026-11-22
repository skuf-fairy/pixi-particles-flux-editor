import React from 'react';

import type {DirectionConfig, NumberTimelapsesConfig, ParticleConfig, SpawnShape, SpawnShapeType} from 'particle-flux';

import {useEditor, useStore} from '../context';
import {TEXTURES, curve} from '../domain/presets';
import {ColorField, NumberField, Section, Select, TextField, Toggle} from './Controls';
import {CurveEditor} from './CurveEditor';

export function Inspector() {
  const {store} = useEditor();
  const {tab} = useStore(store);
  const tabs = [
    {value: 'emitter', label: 'Emitter'},
    {value: 'particle', label: 'Particle'},
    {value: 'shape', label: 'Spawn'},
    {value: 'texture', label: 'Texture'},
    {value: 'scene', label: 'Scene'},
  ] as const;
  return (
    <aside className="inspector">
      <div className="panel-heading">
        <span>INSPECTOR</span>
        <span className="muted">Live editing</span>
      </div>
      <div className="inspector-tabs" role="tablist" aria-label="Inspector">
        {tabs.map((t) => (
          <button role="tab" aria-selected={tab === t.value} key={t.value} onClick={() => store.patch({tab: t.value})}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="inspector-content" role="tabpanel" aria-label={`${tab} settings`} key={tab}>
        {tab === 'emitter' ? (
          <EmitterInspector />
        ) : tab === 'particle' ? (
          <ParticleInspector />
        ) : tab === 'shape' ? (
          <ShapeInspector />
        ) : tab === 'texture' ? (
          <TextureInspector />
        ) : (
          <SceneInspector />
        )}
      </div>
    </aside>
  );
}
function EmitterInspector() {
  const {store, actions} = useEditor();
  const {emitterConfig: c} = useStore(store).project.config;
  const interval = c.spawnInterval;
  const mode = interval === undefined ? 'Manual' : typeof interval === 'number' ? 'Fixed interval' : 'Random interval';
  return (
    <>
      <div className="inspector-intro">
        <h2>Emission</h2>
        <p>Control how particles are born.</p>
      </div>
      <Section title="Schedule">
        <Select
          label="Emission mode"
          value={mode}
          options={['Fixed interval', 'Random interval', 'Manual']}
          onChange={(v) =>
            actions.emitter({
              spawnInterval: v === 'Manual' ? undefined : v === 'Fixed interval' ? 40 : {min: 20, max: 80},
            })
          }
        />
        {typeof interval === 'number' && (
          <NumberField
            label="Wave interval"
            suffix="ms"
            value={interval}
            min={0.01}
            onChange={(spawnInterval) => actions.emitter({spawnInterval})}
          />
        )}
        {interval && typeof interval === 'object' && (
          <div className="field-grid">
            <NumberField
              label="Interval min"
              suffix="ms"
              value={interval.min}
              min={0.01}
              onChange={(min) => actions.emitter({spawnInterval: {...interval, min}})}
            />
            <NumberField
              label="Interval max"
              suffix="ms"
              value={interval.max}
              min={0.01}
              onChange={(max) => actions.emitter({spawnInterval: {...interval, max}})}
            />
          </div>
        )}
        <NumberField
          label="Initial delay"
          suffix="ms"
          value={c.spawnTimeout ?? 0}
          min={0}
          onChange={(spawnTimeout) => actions.emitter({spawnTimeout})}
        />
        <Toggle
          label="Emit indefinitely"
          checked={c.spawnTime === undefined || c.spawnTime === Infinity}
          onChange={(v) => actions.emitter({spawnTime: v ? undefined : 2000})}
        />
        {c.spawnTime !== undefined && c.spawnTime !== Infinity && (
          <NumberField
            label="Emission duration"
            suffix="ms"
            value={c.spawnTime}
            min={0}
            onChange={(spawnTime) => actions.emitter({spawnTime})}
          />
        )}
        <Toggle
          label="Auto start"
          checked={c.autoStart !== false}
          onChange={(autoStart) => actions.emitter({autoStart})}
        />
        <p className="help">
          Manual effects emit with the Burst button. Auto start is preserved in the exported configuration.
        </p>
      </Section>
      <Section title="Population">
        <NumberField
          label="Particles per wave"
          value={c.spawnParticlesPerWave ?? 1}
          min={0}
          step={1}
          onChange={(spawnParticlesPerWave) => actions.emitter({spawnParticlesPerWave})}
        />
        <NumberField
          label="Spawn chance"
          suffix="%"
          min={0}
          max={100}
          step={0.1}
          value={c.spawnChance ?? 100}
          onChange={(spawnChance) => actions.emitter({spawnChance})}
        />
        <Toggle
          label="Unlimited particles"
          checked={c.maxParticles === undefined || c.maxParticles === Infinity}
          onChange={(v) => actions.emitter({maxParticles: v ? undefined : 1500})}
        />
        {c.maxParticles !== undefined && c.maxParticles !== Infinity && (
          <NumberField
            label="Particle limit"
            value={c.maxParticles}
            min={0}
            onChange={(maxParticles) => actions.emitter({maxParticles})}
          />
        )}
      </Section>
    </>
  );
}
function ParticleInspector() {
  const {store, actions} = useEditor();
  const c = useStore(store).project.config.particleConfig;
  const life = c.lifeTime;
  const d = c.direction;
  const directionMode = d && 'angle' in d ? 'Fixed' : d && 'startAngle' in d ? 'Wave burst' : 'Random range';
  const direction = (patch: Partial<DirectionConfig>) =>
    actions.particle({direction: {...d, ...patch} as DirectionConfig});
  const curves = [
    {key: 'speed', title: 'Speed', hint: 'units / frame', initial: 2},
    {key: 'alpha', title: 'Opacity', hint: '0 — 1', initial: 1},
    {key: 'rotation', title: 'Rotation', hint: 'degrees', initial: 0},
    {key: 'gravity', title: 'Gravity', hint: 'direction force', initial: 0},
  ] as const;
  return (
    <>
      <div className="inspector-intro">
        <h2>Particle behavior</h2>
        <p>Shape each moment of a particle’s life.</p>
      </div>
      <Section
        title="Lifetime"
        hint="milliseconds"
        enabled={!!life}
        onToggle={(v) => actions.particle({lifeTime: v ? {min: 900, max: 1800} : undefined})}
      >
        <Select
          label="Lifetime mode"
          value={
            !life || ('value' in life && life.value === Infinity)
              ? 'Infinite'
              : 'value' in life
                ? 'Fixed'
                : 'Random range'
          }
          options={['Fixed', 'Random range', 'Infinite']}
          onChange={(v) =>
            actions.particle({
              lifeTime: v === 'Infinite' ? {value: Infinity} : v === 'Fixed' ? {value: 1000} : {min: 900, max: 1800},
            })
          }
        />
        {life && 'value' in life && life.value !== Infinity && (
          <NumberField
            label="Lifetime"
            suffix="ms"
            value={life.value}
            min={0}
            onChange={(value) => actions.particle({lifeTime: {value}})}
          />
        )}
        {life && 'min' in life && (
          <div className="field-grid">
            <NumberField
              label="Lifetime min"
              suffix="ms"
              value={life.min}
              min={0}
              onChange={(min) => actions.particle({lifeTime: {...life, min}})}
            />
            <NumberField
              label="Lifetime max"
              suffix="ms"
              value={life.max}
              min={0}
              onChange={(max) => actions.particle({lifeTime: {...life, max}})}
            />
          </div>
        )}
      </Section>
      <Section
        title="Direction"
        hint="degrees"
        enabled={!!d}
        onToggle={(v) => actions.particle({direction: v ? {minAngle: 0, maxAngle: 360} : undefined})}
      >
        <Select
          label="Direction mode"
          value={directionMode}
          options={['Fixed', 'Random range', 'Wave burst']}
          onChange={(v) =>
            actions.particle({
              direction: {
                ...(v === 'Fixed'
                  ? {angle: 270}
                  : v === 'Wave burst'
                    ? {startAngle: 0, deltaAngle: 15}
                    : {minAngle: 0, maxAngle: 360}),
                isRotateByDirection: d?.isRotateByDirection,
              },
            })
          }
        />
        {d && 'angle' in d && (
          <NumberField label="Angle" suffix="°" value={d.angle} onChange={(angle) => direction({angle})} />
        )}
        {d && 'minAngle' in d && (
          <div className="field-grid">
            <NumberField
              label="Angle min"
              suffix="°"
              value={d.minAngle}
              onChange={(minAngle) => direction({minAngle})}
            />
            <NumberField
              label="Angle max"
              suffix="°"
              value={d.maxAngle}
              onChange={(maxAngle) => direction({maxAngle})}
            />
          </div>
        )}
        {d && 'startAngle' in d && (
          <div className="field-grid">
            <NumberField
              label="Start angle"
              suffix="°"
              value={d.startAngle}
              onChange={(startAngle) => direction({startAngle})}
            />
            <NumberField
              label="Angle per particle"
              suffix="°"
              value={d.deltaAngle}
              onChange={(deltaAngle) => direction({deltaAngle})}
            />
          </div>
        )}
        <Toggle
          label="Rotate with direction"
          checked={!!d?.isRotateByDirection}
          onChange={(isRotateByDirection) => direction({isRotateByDirection})}
        />
      </Section>
      {curves.map(({key, title, hint, initial}) => (
        <Section
          key={key}
          title={title}
          hint={hint}
          enabled={!!c[key]}
          onToggle={(v) => actions.particle({[key]: v ? curve(initial) : undefined})}
          defaultOpen={key === 'speed' || key === 'alpha'}
        >
          {c[key] && <CurveEditor value={c[key]!} onChange={(value) => actions.particle({[key]: value})} />}
        </Section>
      ))}
      <Section
        title="Scale"
        hint="multiplier"
        enabled={!!c.scale}
        onToggle={(v) => actions.particle({scale: v ? curve(1) : undefined})}
      >
        <Toggle
          label="Independent X / Y"
          checked={!!c.scale && 'x' in c.scale}
          onChange={(v) => {
            const current =
              c.scale && 'timelapses' in c.scale ? c.scale : c.scale && 'x' in c.scale ? c.scale.x : curve(1);
            actions.particle({scale: v ? {x: current, y: structuredClone(current)} : current});
          }}
        />
        {c.scale &&
          ('x' in c.scale ? (
            <>
              <div className="subheading">X AXIS</div>
              <CurveEditor
                value={c.scale.x}
                onChange={(x) =>
                  actions.particle({
                    scale: {
                      ...(c.scale as {x: NumberTimelapsesConfig; y: NumberTimelapsesConfig}),
                      x: x as NumberTimelapsesConfig,
                    },
                  })
                }
              />
              <div className="subheading">Y AXIS</div>
              <CurveEditor
                value={c.scale.y}
                onChange={(y) =>
                  actions.particle({
                    scale: {
                      ...(c.scale as {x: NumberTimelapsesConfig; y: NumberTimelapsesConfig}),
                      y: y as NumberTimelapsesConfig,
                    },
                  })
                }
              />
            </>
          ) : (
            <CurveEditor
              value={c.scale}
              onChange={(scale) => actions.particle({scale: scale as NumberTimelapsesConfig})}
            />
          ))}
      </Section>
      <Section
        title="Color"
        hint="tint over life"
        enabled={!!c.color}
        onToggle={(v) => actions.particle({color: v ? {timelapses: [{time: 0, value: '#ffffff'}]} : undefined})}
      >
        {c.color && (
          <CurveEditor
            color
            value={c.color}
            onChange={(color) => actions.particle({color: color as ParticleConfig['color']})}
          />
        )}
      </Section>
      <Section
        title="Path expression"
        enabled={!!c.path}
        onToggle={(v) => actions.particle({path: v ? {path: '35*sin(x/35)'} : undefined})}
        defaultOpen={!!c.path}
      >
        <TextField label="y = f(x)" value={c.path?.path || ''} onChange={(path) => actions.particle({path: {path}})} />
        <p className="help">Use sin, cos, PI, sqrt and x. A path takes precedence over gravity.</p>
      </Section>
    </>
  );
}
const newShape = (type: SpawnShapeType): SpawnShape =>
  type === 'Chain'
    ? {
        type,
        chain: [
          {x: -70, y: 0},
          {x: 0, y: -60},
          {x: 70, y: 0},
        ],
      }
    : type === 'Rectangle'
      ? {type, x: -50, y: -50, width: 100, height: 100}
      : type === 'Torus'
        ? {type, x: 0, y: 0, innerRadius: 0, outerRadius: 50, startAngle: 0, endAngle: 360}
        : {type, x: 0, y: 0};
function ShapeInspector() {
  const {store, actions} = useEditor();
  const {config, scene} = useStore(store).project;
  const c = config.particleConfig,
    behavior = c.spawnShape;
  const shapes = behavior ? (Array.isArray(behavior.shape) ? behavior.shape : [behavior.shape]) : [];
  const setShapes = (next: SpawnShape[]) =>
    actions.particle({spawnShape: next.length ? {...behavior, shape: next.length === 1 ? next[0] : next} : undefined});
  const update = (index: number, shape: SpawnShape) => setShapes(shapes.map((s, i) => (i === index ? shape : s)));
  const pos = c.spawnPosition || {x: 0, y: 0};
  return (
    <>
      <div className="inspector-intro">
        <h2>Spawn geometry</h2>
        <p>Define where each particle begins.</p>
      </div>
      <Section title="Origin">
        <div className="field-grid">
          <NumberField
            label="Position X"
            value={pos.x}
            onChange={(x) => actions.particle({spawnPosition: {...pos, x}})}
          />
          <NumberField
            label="Position Y"
            value={pos.y}
            onChange={(y) => actions.particle({spawnPosition: {...pos, y}})}
          />
        </div>
        <p className="help">
          Preview coordinates are relative to the canvas center. Exported coordinates keep these exact values.
        </p>
        <Toggle label="Show spawn guides" checked={scene.guides} onChange={(guides) => actions.scene({guides})} />
        <Toggle
          label="Follow pointer"
          checked={scene.followPointer}
          onChange={(followPointer) => actions.scene({followPointer})}
        />
      </Section>
      <Section title="Spawn shapes" hint={`${shapes.length} active`}>
        <Toggle
          label="Share position within wave"
          checked={!!behavior?.isGroupWave}
          onChange={(isGroupWave) =>
            actions.particle({spawnShape: {shape: behavior?.shape || newShape('Point'), isGroupWave}})
          }
        />
        <p className="help">Multiple shapes are sampled with equal probability.</p>
      </Section>
      {shapes.map((shape, index) => (
        <Section key={index} title={`Shape ${index + 1}`} hint={shape.type}>
          <Select
            label="Geometry"
            value={shape.type}
            options={['Point', 'Rectangle', 'Torus', 'Chain']}
            onChange={(v) => update(index, newShape(v as SpawnShapeType))}
          />
          {shape.type !== 'Chain' && (
            <div className="field-grid">
              <NumberField label="Offset X" value={shape.x} onChange={(x) => update(index, {...shape, x})} />
              <NumberField label="Offset Y" value={shape.y} onChange={(y) => update(index, {...shape, y})} />
            </div>
          )}
          {shape.type === 'Rectangle' && (
            <div className="field-grid">
              <NumberField label="Width" value={shape.width} onChange={(width) => update(index, {...shape, width})} />
              <NumberField
                label="Height"
                value={shape.height}
                onChange={(height) => update(index, {...shape, height})}
              />
            </div>
          )}
          {shape.type === 'Torus' && (
            <>
              <div className="field-grid">
                <NumberField
                  label="Outer radius"
                  min={0}
                  value={shape.outerRadius}
                  onChange={(outerRadius) => update(index, {...shape, outerRadius})}
                />
                <NumberField
                  label="Inner radius"
                  min={0}
                  value={shape.innerRadius ?? 0}
                  onChange={(innerRadius) => update(index, {...shape, innerRadius})}
                />
              </div>
              <div className="field-grid">
                <NumberField
                  label="Sector start"
                  suffix="°"
                  value={shape.startAngle ?? 0}
                  onChange={(startAngle) => update(index, {...shape, startAngle})}
                />
                <NumberField
                  label="Sector end"
                  suffix="°"
                  value={shape.endAngle ?? 360}
                  onChange={(endAngle) => update(index, {...shape, endAngle})}
                />
              </div>
            </>
          )}
          {shape.type === 'Chain' && (
            <>
              {shape.chain.map((point, p) => (
                <div className="point-row" key={p}>
                  <NumberField
                    label={`Point ${p + 1} X`}
                    value={point.x}
                    onChange={(x) =>
                      update(index, {...shape, chain: shape.chain.map((v, i) => (i === p ? {...v, x} : v))})
                    }
                  />
                  <NumberField
                    label={`Point ${p + 1} Y`}
                    value={point.y}
                    onChange={(y) =>
                      update(index, {...shape, chain: shape.chain.map((v, i) => (i === p ? {...v, y} : v))})
                    }
                  />
                  <button
                    className="icon-button"
                    aria-label={`Remove point ${p + 1}`}
                    onClick={() => update(index, {...shape, chain: shape.chain.filter((_, i) => i !== p)})}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                className="add-button"
                onClick={() => update(index, {...shape, chain: [...shape.chain, {x: 0, y: 0}]})}
              >
                + Add point
              </button>
            </>
          )}
          <button className="text-button danger" onClick={() => setShapes(shapes.filter((_, i) => i !== index))}>
            Remove shape
          </button>
        </Section>
      ))}
      <div className="panel-padding">
        <button className="add-button" onClick={() => setShapes([...shapes, newShape('Point')])}>
          + Add spawn shape
        </button>
      </div>
    </>
  );
}
function TextureInspector() {
  const {store, actions} = useEditor();
  const {textures} = useStore(store).project;
  const custom = textures.filter((t) => !TEXTURES.some((b) => b.id === t.id));
  return (
    <>
      <div className="inspector-intro">
        <h2>Texture library</h2>
        <p>Choose one or mix several particle views.</p>
      </div>
      <div className="panel-padding">
        <div className="texture-grid">
          {[...TEXTURES, ...custom].map((t) => (
            <button
              className={`texture-card ${textures.some((s) => s.id === t.id) ? 'selected' : ''}`}
              key={t.id}
              aria-pressed={textures.some((s) => s.id === t.id)}
              onClick={() => actions.texture(t)}
            >
              <div>
                <img src={t.url} alt="" />
                {textures.some((s) => s.id === t.id) && <b>✓</b>}
              </div>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
        <label className="button upload-button">
          ↑ Upload texture
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void actions.upload(file);
              e.target.value = '';
            }}
          />
        </label>
        <p className="help">
          PNG, JPEG or WebP · up to 4 MB. Selected textures are embedded in project exports. Configuration exports
          contain emitter settings only.
        </p>
      </div>
      <Section title="Rendering">
        <Select
          label="Blend mode"
          value={useStore(store).project.scene.blend}
          options={['normal', 'add', 'screen']}
          onChange={(blend) => actions.scene({blend: blend as 'normal' | 'add' | 'screen'})}
        />
      </Section>
    </>
  );
}
function SceneInspector() {
  const {store, actions} = useEditor();
  const {project, storage} = useStore(store);
  const s = project.scene;
  return (
    <>
      <div className="inspector-intro">
        <h2>Preview scene</h2>
        <p>Set the stage for your effect.</p>
      </div>
      <Section title="Canvas">
        <ColorField
          label="Background"
          value={s.background}
          onChange={(background) => {
            if (/^#[0-9a-f]{6}$/i.test(background)) actions.scene({background});
          }}
        />
        <Toggle label="Grid" checked={s.grid} onChange={(grid) => actions.scene({grid})} />
        <Toggle label="Spawn guides" checked={s.guides} onChange={(guides) => actions.scene({guides})} />
        <Toggle
          label="Follow pointer"
          checked={s.followPointer}
          onChange={(followPointer) => actions.scene({followPointer})}
        />
        <Select
          label="Blend mode"
          value={s.blend}
          options={['normal', 'add', 'screen']}
          onChange={(blend) => actions.scene({blend: blend as typeof s.blend})}
        />
        <Toggle label="Bloom" checked={s.bloom} onChange={(bloom) => actions.scene({bloom})} />
        <NumberField
          label="Zoom"
          suffix="×"
          value={s.zoom}
          min={0.1}
          max={4}
          step={0.1}
          onChange={(zoom) => actions.scene({zoom})}
        />
      </Section>
      <Section title="Simulation">
        <NumberField
          label="Playback speed"
          suffix="×"
          value={s.timeScale}
          min={0.1}
          max={4}
          step={0.1}
          onChange={(timeScale) => actions.scene({timeScale})}
        />
        <NumberField
          label="Random seed"
          value={s.seed}
          onChange={(seed) => {
            if (Number.isSafeInteger(seed) && seed !== 0 && seed % 2147483647 !== 0) actions.scene({seed});
            else actions.fail(new Error('Choose a nonzero integer seed, not a multiple of 2147483647.'));
          }}
        />
        <p className="help">
          Fixed 60 Hz simulation. Restart replays the same random sequence for the same settings and commands.
        </p>
      </Section>
      <Section title="Workspace">
        <Toggle label="Save in this browser" checked={storage} onChange={(v) => actions.autosave(v)} />
        <button className="button full-width" onClick={() => actions.export(true)}>
          ↓ Export complete project
        </button>
        <button className="text-button" onClick={() => actions.reset()}>
          Reset to Violet nebula
        </button>
        <p className="help">
          Scene settings are preview-only. Use a project export to save textures, seed and scene alongside the emitter
          configuration.
        </p>
      </Section>
    </>
  );
}
