import React, {useEffect, useRef, useState} from 'react';

import {useEditor, useStore} from '../context';
import {Icon} from './Icons';

export function ConfigDialog() {
  const {store, actions} = useEditor();
  const state = useStore(store);
  const [mode, setMode] = useState<'config' | 'project'>('config');
  const [text, setText] = useState(() => actions.config.stringifyConfig(state.project.config));
  const close = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    close.current?.focus();
    return () => previous?.focus();
  }, []);
  const dismiss = () => store.patch({modal: null});
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        className="config-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="config-title"
        ref={dialog}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation();
            dismiss();
          }
          if (e.key === 'Tab') {
            const items = dialog.current?.querySelectorAll<HTMLElement>(
              'button:not([disabled]), textarea, [href], input',
            );
            if (items?.length) {
              const first = items[0],
                last = items[items.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }
        }}
      >
        <div className="dialog-header">
          <div>
            <span className="eyebrow">PARTICLE-FLUX 2.0.0</span>
            <h2 id="config-title">Your effect, as code.</h2>
          </div>
          <button className="icon-button" ref={close} onClick={dismiss} aria-label="Close configuration">
            <Icon name="close" />
          </button>
        </div>
        <div className="dialog-options">
          <div className="segmented">
            <button
              aria-pressed={mode === 'config'}
              onClick={() => {
                setMode('config');
                setText(actions.config.stringifyConfig(state.project.config));
              }}
            >
              Emitter config
            </button>
            <button
              aria-pressed={mode === 'project'}
              onClick={() => {
                setMode('project');
                setText(actions.config.stringify(state.project));
              }}
            >
              Complete project
            </button>
          </div>
          <span className="muted">JSON · editable</span>
        </div>
        <textarea
          className="json-editor"
          aria-label="Configuration JSON"
          spellCheck={false}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="help dialog-help">
          Apply validates the full configuration before changing your effect. Config exports omit unlimited defaults;
          project files preserve “Infinity” values.
        </p>
        {state.error && (
          <div role="alert" className="dialog-error">
            {state.error}
          </div>
        )}
        <div className="dialog-footer">
          <button className="button" onClick={() => void actions.copy()}>
            Copy config
          </button>
          <button className="button" onClick={() => actions.export(mode === 'project')}>
            <Icon name="download" /> Export {mode}
          </button>
          <button
            className="button primary"
            onClick={() => {
              if (actions.import(text)) dismiss();
            }}
          >
            Apply JSON
          </button>
        </div>
      </div>
    </div>
  );
}
