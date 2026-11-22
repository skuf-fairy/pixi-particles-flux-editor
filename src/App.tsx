import React, {useEffect, useMemo, useRef, useState} from 'react';

import {EditorProvider, createEditor, useEditor, useStore} from './context';
import {PRESETS} from './domain/presets';
import {ConfigDialog} from './ui/ConfigDialog';
import {TextField} from './ui/Controls';
import {Icon} from './ui/Icons';
import {Inspector} from './ui/Inspector';

export function App() {
  const [editor] = useState(createEditor);
  useEffect(() => {
    editor.actions.initialize();
  }, [editor]);
  return (
    <EditorProvider value={editor}>
      <Workspace />
    </EditorProvider>
  );
}
function Workspace() {
  const {store, actions, preview} = useEditor();
  const {project, playing, canUndo, canRedo, modal, error, notice, storage} = useStore(store);
  const upload = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (
        (event.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]') ||
        store.getState().modal
      )
        return;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        event.shiftKey ? actions.redo() : actions.undo();
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        actions.export(true);
      } else if (event.code === 'Space') {
        event.preventDefault();
        store.getState().playing ? preview.pause() : preview.play();
      } else if (event.key.toLowerCase() === 'r') preview.restart();
      else if (event.key === '/') {
        event.preventDefault();
        document.querySelector<HTMLInputElement>('[aria-label="Search presets"]')?.focus();
      }
    }
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [actions, preview, store]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => store.patch({notice: ''}), 4500);
    return () => clearTimeout(timer);
  }, [notice, store]);
  return (
    <div className="studio">
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => e.preventDefault()} aria-label="Particle Flux Studio">
          <span className="brand-symbol">
            <Icon name="burst" />
          </span>
          <span>
            flux<span className="brand-light">studio</span>
          </span>
          <span className="version-badge">2.0</span>
        </a>
        <div className="header-divider" />
        <div className="project-name">
          <TextField
            label="Project name"
            value={project.name}
            onChange={(name) => actions.rename(name)}
            showFullValue
          />
          <span className="save-status">
            <i />
            {storage ? 'Autosave on' : 'Local save off'}
          </span>
        </div>
        <div className="header-actions">
          <button
            className="icon-button"
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
            disabled={!canUndo}
            onClick={() => actions.undo()}
          >
            <Icon name="undo" />
          </button>
          <button
            className="icon-button"
            title="Redo (Ctrl+Shift+Z)"
            aria-label="Redo"
            disabled={!canRedo}
            onClick={() => actions.redo()}
          >
            <Icon name="redo" />
          </button>
          <span className="header-divider" />
          <button
            className="button subtle"
            aria-label="Import configuration or project"
            title="Import configuration or project"
            onClick={() => upload.current?.click()}
          >
            <Icon name="upload" />
            <span>Import</span>
          </button>
          <button className="button" onClick={() => store.patch({modal: 'config', error: ''})}>
            <Icon name="code" />
            <span>Config</span>
          </button>
          <button className="button primary" onClick={() => actions.export()}>
            <Icon name="download" />
            <span>Export JSON</span>
          </button>
        </div>
        <input
          className="hidden"
          type="file"
          ref={upload}
          accept=".json,application/json"
          aria-label="Import configuration or project"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = '';
            if (file) {
              try {
                actions.import(await file.text());
              } catch (error) {
                actions.fail(error);
              }
            }
          }}
        />
      </header>
      <div className="workspace">
        <PresetLibrary />
        <main className="main-panel">
          <div className="canvas-heading">
            <div>
              <span className="eyebrow">WORKSPACE</span>
              <h1>
                Make a little magic<span>.</span>
              </h1>
            </div>
            <span className="engine-tag">
              <i /> particle-flux 2.0.0
            </span>
          </div>
          <div className="viewport-shell">
            <div className="viewport-toolbar">
              <span className="viewport-label">
                <i /> LIVE PREVIEW
              </span>
              <div>
                <button
                  className={`icon-button ${project.scene.grid ? 'active' : ''}`}
                  aria-label="Toggle grid"
                  title="Grid"
                  aria-pressed={project.scene.grid}
                  onClick={() => actions.scene({grid: !project.scene.grid})}
                >
                  <Icon name="grid" />
                </button>
                <button
                  className={`icon-button ${project.scene.guides ? 'active' : ''}`}
                  aria-label="Toggle guides"
                  title="Spawn guides"
                  aria-pressed={project.scene.guides}
                  onClick={() => actions.scene({guides: !project.scene.guides})}
                >
                  <Icon name="target" />
                </button>
                <select
                  aria-label="Preview zoom"
                  value={project.scene.zoom}
                  onChange={(e) => actions.scene({zoom: Number(e.target.value)})}
                >
                  {Array.from(new Set([0.25, 0.5, 0.75, 1, 1.5, 2, project.scene.zoom]))
                    .sort((a, b) => a - b)
                    .map((v) => (
                      <option key={v} value={v}>
                        {Math.round(v * 100)}%
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <PreviewCanvas />
            <div className="viewport-caption">
              <span>
                {project.scene.followPointer
                  ? 'Move your pointer to guide the emitter'
                  : 'Origin at center · coordinates in pixels'}
              </span>
              <span>PIXI JS / WEBGL</span>
            </div>
          </div>
          <div className="transport">
            <div className="playback-buttons">
              <button
                className="icon-button"
                aria-label="Restart"
                title="Restart (R)"
                onClick={() => preview.restart()}
              >
                <Icon name="restart" />
              </button>
              <button
                className="play-button"
                aria-label={playing ? 'Pause' : 'Play'}
                title="Play / pause (Space)"
                onClick={() => (playing ? preview.pause() : preview.play())}
              >
                <Icon name={playing ? 'pause' : 'play'} />
              </button>
              <button
                className="icon-button"
                aria-label="Step one frame"
                title="Step one frame"
                onClick={() => preview.step()}
              >
                <Icon name="step" />
              </button>
              <div className="header-divider" />
              <button className="button subtle burst-button" onClick={() => preview.burst()}>
                <Icon name="burst" /> Burst
              </button>
            </div>
            <PreviewStats />
            <select
              aria-label="Playback speed"
              value={project.scene.timeScale}
              onChange={(e) => actions.scene({timeScale: Number(e.target.value)})}
            >
              {Array.from(new Set([0.25, 0.5, 1, 1.5, 2, project.scene.timeScale]))
                .sort((a, b) => a - b)
                .map((v) => (
                  <option key={v} value={v}>
                    {v}× speed
                  </option>
                ))}
            </select>
          </div>
          <div className="workspace-note">
            <span>
              <kbd>Space</kbd> play / pause <kbd>R</kbd> restart
            </span>
            <span>Built for experimentation.</span>
          </div>
        </main>
        <Inspector />
      </div>
      <footer className="statusbar">
        <span>
          <i /> All systems creative
        </span>
        <span>Changes appear in real time</span>
        <span>PARTICLE FLUX STUDIO</span>
      </footer>
      {(error || notice) && !modal && (
        <div className={`toast ${error ? 'error' : ''}`} role={error ? 'alert' : 'status'}>
          <span>{error || notice}</span>
          <button
            className="icon-button"
            aria-label="Dismiss notification"
            onClick={() => store.patch({error: '', notice: ''})}
          >
            <Icon name="close" />
          </button>
        </div>
      )}
      {modal === 'config' && <ConfigDialog />}
    </div>
  );
}
function PresetLibrary() {
  const {store, actions} = useEditor();
  const {project} = useStore(store);
  const [search, setSearch] = useState('');
  // Match effect content rather than its editable name. This also keeps selection
  // correct after undo, redo, imports, and restoring an autosaved project.
  const selectedPresetId = useMemo(
    () =>
      PRESETS.find(
        (preset) =>
          JSON.stringify(preset.project.config) === JSON.stringify(project.config) &&
          JSON.stringify(preset.project.textures) === JSON.stringify(project.textures),
      )?.id,
    [project.config, project.textures],
  );
  const visible = PRESETS.filter((p) => `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <aside className="library">
      <div className="panel-heading">
        <span>EXPLORER</span>
        <span className="count-badge">{PRESETS.length}</span>
      </div>
      <div className="library-intro">
        <h2>A spark of inspiration</h2>
        <p>Start somewhere. Make it yours.</p>
      </div>
      <label className="search-field">
        <Icon name="search" />
        <input
          aria-label="Search presets"
          placeholder="Find an effect…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <kbd>/</kbd>
      </label>
      <div className="library-label">
        STARTER EFFECTS <span>↓</span>
      </div>
      <div className="presets">
        {visible.map((preset, index) => (
          <button
            className={`preset-card ${selectedPresetId === preset.id ? 'selected' : ''}`}
            aria-pressed={selectedPresetId === preset.id}
            key={preset.id}
            onClick={() => actions.preset(preset)}
          >
            <span
              className={`preset-art art-${preset.id}`}
              style={{'--effect-color': preset.color} as React.CSSProperties}
            >
              <img src={preset.project.textures[0].url} alt="" />
              {Array.from({length: 9}, (_, i) => (
                <i
                  key={i}
                  style={{
                    left: `${18 + ((i * 37 + index * 11) % 65)}%`,
                    top: `${12 + ((i * 23 + index * 17) % 76)}%`,
                    width: `${2 + (i % 4)}px`,
                    height: `${2 + (i % 4)}px`,
                    opacity: 0.3 + (i % 3) * 0.25,
                  }}
                />
              ))}
            </span>
            <span className="preset-info">
              <strong>{preset.name}</strong>
              <small>{preset.description}</small>
            </span>
            <span className="preset-arrow">↗</span>
          </button>
        ))}
        {!visible.length && <p className="help">No effects match “{search}”.</p>}
      </div>
      <div className="library-bottom">
        <span className="mini-orbit">✳</span>
        <strong>
          Small particles.
          <br />
          Infinite possibilities.
        </strong>
        <p>
          Every parameter is an invitation
          <br />
          to try something different.
        </p>
        <button className="text-button" onClick={() => store.patch({modal: 'config'})}>
          Explore the configuration ↗
        </button>
      </div>
    </aside>
  );
}
function PreviewCanvas() {
  const {store, stats, preview} = useEditor();
  const {scene} = useStore(store).project;
  const {ready} = useStore(stats);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (host.current) void preview.mount(host.current);
    return () => preview.destroy();
  }, [preview]);
  return (
    <div className={`preview-canvas ${scene.grid ? 'with-grid' : ''}`} style={{backgroundColor: scene.background}}>
      <div className="canvas-host" ref={host} />
      {!ready && <div className="preview-loading">Preparing your canvas…</div>}
      <div className="canvas-corner top-left" />
      <div className="canvas-corner bottom-right" />
    </div>
  );
}
function PreviewStats() {
  const {stats} = useEditor();
  const state = useStore(stats);
  return (
    <div className="preview-stats" aria-live="off">
      <span>
        <b>{state.count.toLocaleString()}</b> particles
      </span>
      <span>
        <i />
        {state.fps} fps
      </span>
      <span className="elapsed">{(state.elapsed / 1000).toFixed(1)}s</span>
    </div>
  );
}
