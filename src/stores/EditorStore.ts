import {defaultProject} from '../domain/presets';
import type {EditorState} from '../domain/types';
import {Store} from './Store';

export class EditorStore extends Store<EditorState> {
  constructor() {
    super({
      project: defaultProject(),
      playing: true,
      tab: 'particle',
      modal: null,
      notice: '',
      error: '',
      canUndo: false,
      canRedo: false,
      storage: true,
    });
  }
}
export class PreviewStore extends Store<{fps: number; count: number; elapsed: number; ready: boolean}> {
  constructor() {
    super({fps: 0, count: 0, elapsed: 0, ready: false});
  }
}
