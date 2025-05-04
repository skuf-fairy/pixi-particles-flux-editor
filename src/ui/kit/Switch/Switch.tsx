import React from 'react';

import cn from 'classnames';

import s from './Switch.module.css';

interface Props {
  checked: boolean;
  onChange(v: boolean): void;
  className?: string;
}

export function Switch({checked, onChange, className}: Props) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={cn(s.switch, className, {[s.checked]: checked, [s.unchecked]: !checked})}
    >
      <div
        className={cn(s.slider, {
          [s.sliderChecked]: checked,
          [s.sliderUnchecked]: !checked,
        })}
      />
    </div>
  );
}
