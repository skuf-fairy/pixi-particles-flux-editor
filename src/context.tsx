import {EditorUseCases} from './use-cases/EditorUseCases';

import React, {createContext, useContext, useSyncExternalStore} from 'react';

import {ConfigService} from './services/ConfigService';
import {PreviewService} from './services/PreviewService';
import {ProjectService} from './services/ProjectService';
import {EditorStore, PreviewStore} from './stores/EditorStore';
import {Store} from './stores/Store';

export function createEditor() {
  const store = new EditorStore();
  const stats = new PreviewStore();
  const config = new ConfigService();
  const projects = new ProjectService(config);
  const actions = new EditorUseCases(store, config, projects);
  const preview = new PreviewService(store, stats);
  return {store, stats, actions, preview};
}
export type EditorContextValue = ReturnType<typeof createEditor>;
const Context = createContext<EditorContextValue | null>(null);
export const EditorProvider = Context.Provider;
export function useEditor(): EditorContextValue {
  const value = useContext(Context);
  if (!value) throw new Error('Missing editor provider');
  return value;
}
export function useStore<S>(store: Store<S>): S {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
}
