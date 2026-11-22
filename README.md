# Flux Studio

A visual editor for **particle-flux 2.0.0**, React 19 and PixiJS 8.

Requires Node.js 20.19+ or 22.12+ (including newer releases).

```sh
npm ci
npm start
```

Open http://localhost:8080. The editor includes eight starter effects, a live
preview, fixed / random / manual emission, all four spawn geometries (including
multiple shapes), lifetime and direction modes, expression paths, and keyframe
editors for speed, opacity, scale, rotation, gravity and color. Numeric curves
support easing and per-particle random multipliers; scale can use separate axes.
Textures can be mixed from the library or uploaded as PNG / JPEG / WebP.

## Build and preview

Development uses Vite with React Fast Refresh. `npm run dev` is an alias for
`npm start`.

```sh
npm run build
npm run preview
```

The production build is written to `build/`, including source maps. Preview
runs at http://localhost:4173. `npm run build_prod` remains an alias for the
production build, and `npm run deploy` builds and publishes `build/` to GitHub
Pages. Relative asset URLs support deployment under a repository subpath.

## Project and configuration files

- **Export JSON** produces the exact `{emitterConfig, particleConfig}` object for
  particle-flux 2.0.0. Textures, renderer settings and seed are separate from this
  library configuration.
- **Config → Complete project** (or Scene → Export complete project) includes the
  configuration, embedded textures, name and preview scene. Import accepts both
  formats. The v2 project schema has `version: 2`.
- Config exports omit infinite lifetime, duration and capacity properties,
  preserving particle-flux's unlimited defaults and producing directly usable
  JSON. Complete projects preserve explicit Infinity as the string `"Infinity"`;
  the editor restores it on import. Infinity is not a JSON number.
- Browser autosave uses the new `particle-flux-studio:v2` key. Old v1 local
  storage is untouched. Legacy behavior configurations must be converted to
  `timelapses`; the editor reports validation errors rather than guessing.
- Positions are previewed relative to the canvas center. Export preserves the
  configured coordinates. Pointer following, bloom, zoom and grid affect only
  the preview. The scene seed is passed as the emitter's extra `seed` option.

## Architecture

- `src/stores`: observable state snapshots with React `useSyncExternalStore`.
- `src/use-cases`: editing commands, validation boundaries, undo / redo, imports,
  exports and autosave orchestration.
- `src/services`: public-API config validation, persistence / file operations,
  and the Pixi renderer's lifecycle.
- `src/domain`: project types, built-in assets and native v2 presets.
- `src/ui`: React components and styles. The composition root is `src/context.tsx`.

The preview disables Flux's internal ticker and updates it at a fixed 60 Hz from
the Pixi ticker. Pause freezes simulation; Step advances 1/60 s; Restart rewinds
the seeded sequence. Burst emits a wave even when playback is paused. Long
browser stalls are capped to 100 ms per rendered frame. Renderer teardown
detaches and destroys sprites, filters, observers and event subscriptions;
shared cached textures remain available to other previews.

Shortcuts: **Space** play/pause, **R** restart, **Ctrl/Cmd+Z** undo,
**Ctrl/Cmd+Shift+Z** redo, **Ctrl/Cmd+S** export project.

## Verification

```sh
npm run typecheck
npm test
npm run build_prod
```
