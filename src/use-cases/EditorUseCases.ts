import type {EmitterConfig, ParticleConfig} from 'particle-flux';

import {clone, defaultProject} from '../domain/presets';
import type {Preset, Project, SceneSettings, TextureAsset} from '../domain/types';
import {ConfigService} from '../services/ConfigService';
import {ProjectService} from '../services/ProjectService';
import {EditorStore} from '../stores/EditorStore';

export class EditorUseCases {
  private past: Project[] = [];
  private future: Project[] = [];
  constructor(
    readonly store: EditorStore,
    readonly config: ConfigService,
    readonly projects: ProjectService,
  ) {}
  initialize(): void {
    try {
      const project = this.projects.restore(this.store.getState().project);
      if (project) this.store.patch({project});
    } catch (error) {
      this.store.patch({error: `Saved project could not be restored: ${this.message(error)}`});
    }
  }
  message(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
  fail(error: unknown): void {
    this.store.patch({error: this.message(error), notice: ''});
  }
  commit(project: Project): boolean {
    try {
      this.config.validate(project.config);
      this.past.push(this.store.getState().project);
      if (this.past.length > 60) this.past.shift();
      this.future = [];
      this.store.patch({project, canUndo: true, canRedo: false, error: '', notice: ''});
      this.persist();
      return true;
    } catch (error) {
      this.fail(error);
      return false;
    }
  }
  private persist(): void {
    if (this.store.getState().storage) {
      try {
        this.projects.save(this.store.getState().project);
      } catch {
        this.store.patch({error: 'Browser storage is unavailable or full. Export a project to keep your changes.'});
      }
    }
  }
  emitter(patch: Partial<EmitterConfig>): void {
    const p = this.store.getState().project;
    this.commit({...p, config: {...p.config, emitterConfig: {...p.config.emitterConfig, ...patch}}});
  }
  particle(patch: Partial<ParticleConfig>): void {
    const p = this.store.getState().project;
    this.commit({...p, config: {...p.config, particleConfig: {...p.config.particleConfig, ...patch}}});
  }
  scene(patch: Partial<SceneSettings>): void {
    const p = this.store.getState().project;
    this.commit({...p, scene: {...p.scene, ...patch}});
  }
  rename(name: string): void {
    if (name.trim()) this.commit({...this.store.getState().project, name: name.trim()});
  }
  preset(preset: Preset): void {
    this.commit(clone(preset.project));
  }
  reset(): void {
    this.commit(defaultProject());
  }
  texture(asset: TextureAsset): void {
    const p = this.store.getState().project;
    const exists = p.textures.some((t) => t.id === asset.id);
    const textures = exists ? p.textures.filter((t) => t.id !== asset.id) : [...p.textures, asset];
    if (!textures.length) {
      this.fail(new Error('Keep at least one texture selected.'));
      return;
    }
    this.commit({...p, textures});
  }
  async upload(file: File): Promise<void> {
    try {
      this.texture(await this.projects.uploadTexture(file));
    } catch (error) {
      this.fail(error);
    }
  }
  import(text: string): boolean {
    try {
      return this.commit(this.config.parseProject(text, this.store.getState().project));
    } catch (error) {
      this.fail(error);
      return false;
    }
  }
  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.config.stringifyConfig(this.store.getState().project.config));
      this.store.patch({notice: 'Configuration copied', error: ''});
    } catch {
      this.fail(new Error('Clipboard is unavailable. Select and copy the JSON in the configuration panel.'));
    }
  }
  export(project = false): void {
    const p = this.store.getState().project;
    this.projects.download(
      project ? p : this.config.parse(this.config.stringifyConfig(p.config)),
      `${p.name.replace(/[^a-z0-9-_]/gi, '-').toLowerCase()}${project ? '.project' : ''}.json`,
    );
    this.store.patch({
      notice: project
        ? 'Project exported with textures and scene settings'
        : 'particle-flux 2.0.0 configuration exported',
      error: '',
    });
  }
  undo(): void {
    const project = this.past.pop();
    if (!project) return;
    this.future.push(this.store.getState().project);
    this.store.patch({project, canUndo: !!this.past.length, canRedo: true, error: ''});
    this.persist();
  }
  redo(): void {
    const project = this.future.pop();
    if (!project) return;
    this.past.push(this.store.getState().project);
    this.store.patch({project, canUndo: true, canRedo: !!this.future.length, error: ''});
    this.persist();
  }
  autosave(enabled: boolean): void {
    this.store.patch({storage: enabled});
    if (enabled) this.persist();
    else {
      try {
        this.projects.clear();
      } catch (error) {
        this.fail(error);
      }
    }
  }
}
