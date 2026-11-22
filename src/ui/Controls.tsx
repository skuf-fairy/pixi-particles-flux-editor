import React, {useEffect, useId, useRef, useState} from 'react';

import {FieldLabel, SettingHelp} from './SettingHelp';
import {getSettingHelp} from './settingDescriptions';

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  const [draft, setDraft] = useState(String(value));
  const id = useId();
  const descriptionId = `${id}-help`;
  const cancelled = useRef(false);
  useEffect(() => setDraft(String(value)), [value]);
  function commit() {
    if (cancelled.current) {
      cancelled.current = false;
      setDraft(String(value));
      return;
    }
    const next = Number(draft);
    if (
      draft.trim() &&
      Number.isFinite(next) &&
      (min === undefined || next >= min) &&
      (max === undefined || next <= max) &&
      next !== value
    )
      onChange(next);
    setDraft(String(value));
  }
  return (
    <div className="field">
      <FieldLabel label={label} inputId={id} descriptionId={descriptionId} />
      <span className="number-wrap">
        <input
          aria-label={label}
          id={id}
          aria-describedby={getSettingHelp(label) ? descriptionId : undefined}
          type="number"
          value={draft}
          min={min}
          max={max}
          step={step}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
            if (e.key === 'Escape') {
              cancelled.current = true;
              setDraft(String(value));
              e.currentTarget.blur();
            }
          }}
        />
        {suffix && <small>{suffix}</small>}
      </span>
    </div>
  );
}
export function TextField({
  label,
  value,
  onChange,
  placeholder,
  showFullValue = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showFullValue?: boolean;
}) {
  const [draft, setDraft] = useState(value);
  const [showValueHint, setShowValueHint] = useState(false);
  const id = useId();
  const descriptionId = `${id}-help`;
  const valueHintId = `${id}-value`;
  const describedBy = [getSettingHelp(label) ? descriptionId : '', showValueHint ? valueHintId : '']
    .filter(Boolean)
    .join(' ');
  useEffect(() => setDraft(value), [value]);
  return (
    <div
      className={`field${showFullValue ? ' full-value-field' : ''}`}
      onMouseEnter={() => showFullValue && setShowValueHint(true)}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) setShowValueHint(false);
      }}
    >
      <FieldLabel label={label} inputId={id} descriptionId={descriptionId} />
      <input
        aria-label={label}
        id={id}
        aria-describedby={describedBy || undefined}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={() => showFullValue && setShowValueHint(true)}
        onClick={() => showFullValue && setShowValueHint(true)}
        onBlur={() => {
          setShowValueHint(false);
          if (draft !== value) onChange(draft);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.currentTarget.blur();
          if (e.key === 'Escape') setShowValueHint(false);
        }}
      />
      {showValueHint && (
        <span className="value-tooltip" id={valueHintId} role="tooltip">
          {draft}
        </span>
      )}
    </div>
  );
}
export function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[] | {value: string; label: string}[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  const descriptionId = `${id}-help`;
  return (
    <div className="field">
      <FieldLabel label={label} inputId={id} descriptionId={descriptionId} />
      <select
        id={id}
        aria-label={label}
        aria-describedby={getSettingHelp(label) ? descriptionId : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) =>
          typeof o === 'string' ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ),
        )}
      </select>
    </div>
  );
}
export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();
  const descriptionId = `${id}-help`;
  return (
    <div className="toggle-row">
      <FieldLabel label={label} inputId={id} descriptionId={descriptionId} />
      <input
        id={id}
        aria-label={label}
        aria-describedby={getSettingHelp(label) ? descriptionId : undefined}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className="toggle-track" aria-hidden="true" />
    </div>
  );
}
export function Section({
  title,
  hint,
  enabled,
  onToggle,
  children,
  defaultOpen = true,
}: {
  title: string;
  hint?: string;
  enabled?: boolean;
  onToggle?: (checked: boolean) => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="section" open={defaultOpen}>
      <summary>
        <span className="chevron">›</span>
        <strong>{title}</strong>
        <SettingHelp label={title} />
        {hint && <small>{hint}</small>}
        {onToggle && (
          <input
            aria-label={`Enable ${title}`}
            title={`Enable ${title}`}
            type="checkbox"
            checked={enabled}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onToggle(e.target.checked)}
          />
        )}
      </summary>
      {enabled !== false && <div className="section-body">{children}</div>}
    </details>
  );
}
export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="color-field">
      <input
        aria-label={`${label} picker`}
        type="color"
        value={/^#[0-9a-f]{6}$/i.test(value) ? value : '#ffffff'}
        onChange={(e) => onChange(e.target.value)}
      />
      <TextField label={label} value={value} onChange={onChange} />
    </div>
  );
}
