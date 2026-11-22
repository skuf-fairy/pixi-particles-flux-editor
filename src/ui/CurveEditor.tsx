import React from 'react';

import {EASING_FUNCTIONS, EASING_NAME_LIST} from 'particle-flux';
import type {ColorTimelapsesConfig, EasingName, NumberTimelapsesConfig} from 'particle-flux';

import {ColorField, NumberField, Select, Toggle} from './Controls';
import {SettingHelp} from './SettingHelp';

type Curve = NumberTimelapsesConfig | ColorTimelapsesConfig;
export function CurveEditor({
  value,
  onChange,
  color = false,
}: {
  value: Curve;
  onChange: (value: Curve) => void;
  color?: boolean;
}) {
  const keys = [...value.timelapses].sort((a, b) => a.time - b.time);
  function update(index: number, patch: {time?: number; value?: number | string}) {
    onChange({...value, timelapses: keys.map((k, i) => (i === index ? {...k, ...patch} : k))} as Curve);
  }
  function add() {
    const occupied = new Set(keys.map((k) => k.time));
    const boundaries = [0, ...keys.map((k) => k.time), 100];
    let gap = -1,
      time = 50;
    for (let i = 1; i < boundaries.length; i++) {
      const size = boundaries[i] - boundaries[i - 1];
      if (size > gap) {
        gap = size;
        time = Math.round((boundaries[i] + boundaries[i - 1]) / 2);
      }
    }
    if (occupied.has(time)) time = Array.from({length: 101}, (_, i) => i).find((t) => !occupied.has(t)) ?? -1;
    if (time < 0) return;
    onChange({...value, timelapses: [...keys, {time, value: keys[0].value}].sort((a, b) => a.time - b.time)} as Curve);
  }
  const numeric = keys.map((k) => Number(k.value));
  const lo = Math.min(0, ...numeric),
    hi = Math.max(1, ...numeric);
  const y = (v: number) => 58 - ((v - lo) / (hi - lo)) * 48;
  const easing = EASING_FUNCTIONS[value.easing || 'linear'];
  const points = color
    ? ''
    : Array.from({length: 101}, (_, time) => {
        let result = Number(keys[0].value);
        if (time >= keys[keys.length - 1].time) result = Number(keys[keys.length - 1].value);
        else
          for (let i = 1; i < keys.length; i++)
            if (time >= keys[i - 1].time && time <= keys[i].time) {
              const t = easing((time - keys[i - 1].time) / (keys[i].time - keys[i - 1].time));
              result = Number(keys[i - 1].value) + (Number(keys[i].value) - Number(keys[i - 1].value)) * t;
              break;
            }
        return `${10 + time * 2.7},${y(result)}`;
      }).join(' ');
  return (
    <div className="curve-editor">
      {color ? (
        <div
          className="color-gradient"
          style={{
            background:
              keys.length === 1
                ? String(keys[0].value)
                : `linear-gradient(90deg, ${keys.map((k) => `${k.value} ${k.time}%`).join(', ')})`,
          }}
        />
      ) : (
        <svg className="curve-chart" viewBox="0 0 290 70" role="img" aria-label="Value over particle lifetime">
          <path d="M10 10H280M10 34H280M10 58H280M10 10V58M145 10V58M280 10V58" className="chart-grid" />
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" />
          {keys.map((k, i) => (
            <circle key={i} cx={10 + k.time * 2.7} cy={y(Number(k.value))} r="3.5" />
          ))}
        </svg>
      )}
      <div className="chart-labels">
        <span>Birth · 0%</span>
        <span>Lifetime · 100%</span>
      </div>
      <div className="keyframe-head">
        <span className="field-label">
          TIME % <SettingHelp label="Keyframe time" />
        </span>
        <span className="field-label">
          VALUE <SettingHelp label={color ? 'Keyframe color' : 'Keyframe value'} />
        </span>
        <span />
      </div>
      {keys.map((key, index) => (
        <div className="keyframe-row" key={index}>
          <NumberField
            label={`Key ${index + 1} time`}
            value={key.time}
            min={0}
            max={100}
            onChange={(time) => update(index, {time})}
          />
          {color ? (
            <ColorField
              label={`Key ${index + 1} color`}
              value={String(key.value)}
              onChange={(value) => update(index, {value})}
            />
          ) : (
            <NumberField
              label={`Key ${index + 1} value`}
              value={Number(key.value)}
              step={0.05}
              onChange={(value) => update(index, {value})}
            />
          )}
          <button
            className="icon-button remove-key"
            aria-label={`Remove key ${index + 1}`}
            disabled={keys.length === 1}
            onClick={() => onChange({...value, timelapses: keys.filter((_, i) => i !== index)} as Curve)}
          >
            ×
          </button>
        </div>
      ))}
      <button className="add-button" onClick={add} disabled={keys.length >= 101}>
        + Add keyframe
      </button>
      <Select
        label="Easing"
        value={value.easing || 'linear'}
        options={EASING_NAME_LIST}
        onChange={(easing) => onChange({...value, easing: easing as EasingName})}
      />
      {!color && (
        <>
          <Toggle
            label="Random multiplier"
            checked={!!(value as NumberTimelapsesConfig).randomRange}
            onChange={(checked) =>
              onChange({...value, randomRange: checked ? {min: 0.8, max: 1.2} : undefined} as NumberTimelapsesConfig)
            }
          />
          {(value as NumberTimelapsesConfig).randomRange && (
            <div className="field-grid">
              <NumberField
                label="Multiplier min"
                value={(value as NumberTimelapsesConfig).randomRange!.min}
                step={0.1}
                onChange={(min) =>
                  onChange({
                    ...value,
                    randomRange: {...(value as NumberTimelapsesConfig).randomRange!, min},
                  } as NumberTimelapsesConfig)
                }
              />
              <NumberField
                label="Multiplier max"
                value={(value as NumberTimelapsesConfig).randomRange!.max}
                step={0.1}
                onChange={(max) =>
                  onChange({
                    ...value,
                    randomRange: {...(value as NumberTimelapsesConfig).randomRange!, max},
                  } as NumberTimelapsesConfig)
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
