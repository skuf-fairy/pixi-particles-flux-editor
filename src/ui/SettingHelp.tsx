import React, {useEffect, useId, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {getSettingHelp} from './settingDescriptions';

export function SettingHelp({label, descriptionId}: {label: string; descriptionId?: string}) {
  const generatedId = useId();
  const id = descriptionId || generatedId;
  const description = getSettingHelp(label);
  const anchor = useRef<HTMLButtonElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({left: 0, top: 0});
  useLayoutEffect(() => {
    if (!open || !anchor.current || !tooltip.current) return;
    const rect = anchor.current.getBoundingClientRect();
    const tip = tooltip.current.getBoundingClientRect();
    setPosition({
      left: Math.max(12, Math.min(rect.right - tip.width, window.innerWidth - tip.width - 12)),
      top:
        rect.bottom + tip.height + 20 <= window.innerHeight ? rect.bottom + 8 : Math.max(12, rect.top - tip.height - 8),
    });
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const dismiss = () => setOpen(false);
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        dismiss();
      }
    };
    window.addEventListener('resize', dismiss);
    window.addEventListener('scroll', dismiss, true);
    document.addEventListener('keydown', escape, true);
    return () => {
      window.removeEventListener('resize', dismiss);
      window.removeEventListener('scroll', dismiss, true);
      document.removeEventListener('keydown', escape, true);
    };
  }, [open]);
  if (!description) return null;
  return (
    <>
      <button
        ref={anchor}
        type="button"
        className="setting-help-button"
        aria-label={`About ${label}`}
        aria-describedby={id}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          if (document.activeElement !== anchor.current) setOpen(false);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
      >
        <span aria-hidden="true">?</span>
      </button>
      <span className="visually-hidden" id={id}>
        {description}
      </span>
      {open &&
        createPortal(
          <div ref={tooltip} className="setting-tooltip" role="tooltip" style={position}>
            <strong>{label}</strong>
            <p>{description}</p>
          </div>,
          document.body,
        )}
    </>
  );
}

export function FieldLabel({label, inputId, descriptionId}: {label: string; inputId: string; descriptionId: string}) {
  return (
    <span className="field-label">
      <label htmlFor={inputId}>{label}</label>
      <SettingHelp label={label} descriptionId={descriptionId} />
    </span>
  );
}
