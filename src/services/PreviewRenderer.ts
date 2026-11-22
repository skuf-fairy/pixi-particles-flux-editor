import {Application, Assets, Container, Graphics, Sprite, Texture} from 'pixi.js';

import {ParticleEmitter} from 'particle-flux';
import type {SpawnShape} from 'particle-flux';
import type {AdvancedBloomFilter} from 'pixi-filters';

import type {Project} from '../domain/types';
import {EditorStore, PreviewStore} from '../stores/EditorStore';

/** Owns all renderer resources and drives Flux with one fixed-step Pixi ticker. */
export class PreviewRenderer {
  private app?: Application;
  private world = new Container();
  private particles = new Container();
  private guides = new Graphics();
  private emitter?: ParticleEmitter<Sprite>;
  private filter?: AdvancedBloomFilter;
  private unsubscribe?: () => void;
  private resize?: ResizeObserver;
  private disposed = false;
  private revision = 0;
  private elapsed = 0;
  private accumulator = 0;
  private reportTime = 0;
  private textures: Texture[] = [];
  private last?: Project;
  private pointer?: {x: number; y: number};
  constructor(
    private editor: EditorStore,
    private stats: PreviewStore,
  ) {}
  async mount(host: HTMLElement): Promise<void> {
    const app = new Application();
    try {
      await app.init({
        resizeTo: host,
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        preference: 'webgl',
      });
      if (this.disposed) {
        app.destroy(true);
        return;
      }
      this.app = app;
      host.appendChild(app.canvas);
      app.canvas.setAttribute('aria-label', 'Live particle preview');
      this.world.addChild(this.particles, this.guides);
      app.stage.addChild(this.world);
      this.resize = new ResizeObserver(() => this.layout());
      this.resize.observe(host);
      host.addEventListener('pointermove', this.onPointerMove);
      host.addEventListener('pointerleave', this.onPointerLeave);
      this.unsubscribe = this.editor.subscribe(() => {
        void this.sync();
      });
      app.ticker.add((ticker) => {
        const {playing, project} = this.editor.getState();
        if (playing && this.emitter) {
          this.accumulator += Math.min(ticker.deltaMS, 100) * project.scene.timeScale;
          for (let i = 0; i < 24 && this.accumulator >= 1000 / 60; i++) {
            this.emitter.update(1000 / 60);
            this.elapsed += 1000 / 60;
            this.accumulator -= 1000 / 60;
          }
        }
        this.reportTime += ticker.deltaMS;
        if (this.reportTime >= 150) {
          this.reportTime = 0;
          this.report(ticker.FPS);
        }
      });
      await this.sync();
      this.stats.patch({ready: true});
    } catch (error) {
      if (!this.disposed)
        this.editor.patch({error: `Preview: ${error instanceof Error ? error.message : String(error)}`});
    }
  }
  private async sync(): Promise<void> {
    const project = this.editor.getState().project;
    if (this.last === project || !this.app || this.disposed) return;
    const previous = this.last;
    this.last = project;
    const rebuild =
      !previous ||
      previous.config !== project.config ||
      previous.textures !== project.textures ||
      previous.scene.seed !== project.scene.seed;
    const revision = ++this.revision;
    if (rebuild) {
      try {
        const textures = await Promise.all(project.textures.map((t) => Assets.load<Texture>(t.url)));
        if (this.disposed || revision !== this.revision) {
          this.last = undefined;
          if (!this.disposed) void this.sync();
          return;
        }
        this.textures = textures;
        this.emitter?.destroy();
        this.particles.removeChildren().forEach((child) => child.destroy());
        this.emitter = new ParticleEmitter<Sprite>(
          {
            addChild: (sprite) => {
              this.particles.addChild(sprite);
            },
            removeChild: (sprite) => {
              this.particles.removeChild(sprite);
              sprite.destroy();
            },
          },
          this.textures.map((texture) => () => {
            const sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            return sprite;
          }),
          project.config,
          {autoUpdate: false, seed: project.scene.seed},
        );
        if (
          project.config.emitterConfig.spawnInterval === undefined &&
          project.config.emitterConfig.autoStart !== false
        )
          this.emitter.emitWave();
        this.elapsed = 0;
        this.accumulator = 0;
      } catch (error) {
        this.editor.patch({error: `Preview: ${error instanceof Error ? error.message : String(error)}`});
      }
    }
    if (!project.scene.followPointer) this.pointer = undefined;
    if (this.emitter) this.emitter.config.spawnPosition = this.pointer || project.config.particleConfig.spawnPosition;
    this.particles.blendMode = project.scene.blend;
    if (project.scene.bloom && !this.filter) {
      try {
        const {AdvancedBloomFilter} = await import('pixi-filters');
        if (this.disposed || revision !== this.revision) return;
        this.filter = new AdvancedBloomFilter({threshold: 0.3, bloomScale: 0.8, brightness: 1, blur: 4, quality: 4});
      } catch (error) {
        if (!this.disposed && revision === this.revision)
          this.editor.patch({error: `Bloom: ${error instanceof Error ? error.message : String(error)}`});
      }
    }
    this.particles.filters = project.scene.bloom && this.filter ? [this.filter] : [];
    this.layout();
  }
  private layout(): void {
    if (!this.app) return;
    const {scene} = this.editor.getState().project;
    this.world.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    this.world.scale.set(scene.zoom);
    this.drawGuides();
  }
  private drawGuides(): void {
    const {config, scene} = this.editor.getState().project;
    this.guides.clear();
    this.guides.visible = scene.guides;
    const pos =
      this.pointer && scene.followPointer ? this.pointer : config.particleConfig.spawnPosition || {x: 0, y: 0};
    this.guides.position.set(pos.x, pos.y);
    this.guides
      .moveTo(-9, 0)
      .lineTo(9, 0)
      .moveTo(0, -9)
      .lineTo(0, 9)
      .stroke({width: 1 / scene.zoom, color: 0xb6a5ed, alpha: 0.75});
    const shape = config.particleConfig.spawnShape?.shape;
    if (shape) (Array.isArray(shape) ? shape : [shape]).forEach((s) => this.drawShape(s));
  }
  private drawShape(shape: SpawnShape): void {
    if (shape.type === 'Point') this.guides.circle(shape.x, shape.y, 3);
    if (shape.type === 'Rectangle') this.guides.rect(shape.x, shape.y, shape.width, shape.height);
    if (shape.type === 'Torus') {
      const start = ((shape.startAngle ?? 0) * Math.PI) / 180,
        end = ((shape.endAngle ?? 360) * Math.PI) / 180;
      this.guides
        .moveTo(shape.x + Math.cos(start) * shape.outerRadius, shape.y + Math.sin(start) * shape.outerRadius)
        .arc(shape.x, shape.y, shape.outerRadius, start, end);
      if (shape.innerRadius)
        this.guides
          .moveTo(shape.x + Math.cos(start) * shape.innerRadius, shape.y + Math.sin(start) * shape.innerRadius)
          .arc(shape.x, shape.y, shape.innerRadius, start, end);
    }
    if (shape.type === 'Chain' && shape.chain.length)
      this.guides.poly(
        shape.chain.flatMap((p) => [p.x, p.y]),
        false,
      );
    this.guides.stroke({width: 1 / this.editor.getState().project.scene.zoom, color: 0xb6a5ed, alpha: 0.45});
  }
  private onPointerMove = (event: PointerEvent): void => {
    if (!this.app || !this.emitter || !this.editor.getState().project.scene.followPointer) return;
    const rect = this.app.canvas.getBoundingClientRect();
    const zoom = this.editor.getState().project.scene.zoom;
    this.pointer = {
      x: (event.clientX - rect.left - rect.width / 2) / zoom,
      y: (event.clientY - rect.top - rect.height / 2) / zoom,
    };
    this.emitter.config.spawnPosition = this.pointer;
    this.drawGuides();
  };
  private onPointerLeave = (): void => {
    this.pointer = undefined;
    if (this.emitter)
      this.emitter.config.spawnPosition = this.editor.getState().project.config.particleConfig.spawnPosition;
    this.drawGuides();
  };
  play(): void {
    if (this.emitter && !this.emitter.isEmitActive()) this.emitter.startEmit();
    this.editor.patch({playing: true});
  }
  pause(): void {
    this.editor.patch({playing: false});
  }
  restart(): void {
    this.emitter?.restart();
    if (this.editor.getState().project.config.emitterConfig.spawnInterval === undefined) this.emitter?.emitWave();
    this.elapsed = 0;
    this.accumulator = 0;
    this.report();
  }
  burst(): void {
    this.emitter?.emitWave();
    this.report();
  }
  step(): void {
    this.pause();
    this.emitter?.update(1000 / 60);
    this.elapsed += 1000 / 60;
    this.report();
  }
  private report(fps = this.stats.getState().fps): void {
    this.stats.patch({fps: Math.round(fps), count: this.emitter?.getParticlesCount() || 0, elapsed: this.elapsed});
  }
  destroy(): void {
    this.disposed = true;
    this.revision++;
    this.unsubscribe?.();
    this.resize?.disconnect();
    const host = this.app?.canvas.parentElement;
    host?.removeEventListener('pointermove', this.onPointerMove);
    host?.removeEventListener('pointerleave', this.onPointerLeave);
    this.emitter?.destroy();
    this.filter?.destroy();
    this.app?.destroy(true, {children: true});
    this.app = undefined;
    this.stats.patch({ready: false});
  }
}
