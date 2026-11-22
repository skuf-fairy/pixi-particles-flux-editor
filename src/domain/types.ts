import type {ParticleEmitterConfig} from 'particle-flux';

export interface TextureAsset {
  id: string;
  name: string;
  url: string;
}
export interface SceneSettings {
  background: string;
  grid: boolean;
  guides: boolean;
  followPointer: boolean;
  blend: 'normal' | 'add' | 'screen';
  zoom: number;
  timeScale: number;
  seed: number;
  bloom: boolean;
}
export interface Project {
  version: 2;
  name: string;
  config: ParticleEmitterConfig;
  textures: TextureAsset[];
  scene: SceneSettings;
}
export interface Preset {
  id: string;
  name: string;
  description: string;
  color: string;
  project: Project;
}
export type InspectorTab = 'emitter' | 'particle' | 'shape' | 'texture' | 'scene';
export interface EditorState {
  project: Project;
  playing: boolean;
  tab: InspectorTab;
  modal: 'config' | null;
  notice: string;
  error: string;
  canUndo: boolean;
  canRedo: boolean;
  storage: boolean;
}
