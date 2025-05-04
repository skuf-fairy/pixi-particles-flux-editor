import React from 'react';

import {EasingName} from 'particle-flux';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import {EasingSelect} from '../EasingSelect/EasingSelect';

import s from './EasingOption.module.css';

interface Props {
  easing: EasingName;
  onChange(e: EasingName): void;
}

export function EasingOption({easing, onChange}: Props) {
  return (
    <div className={s.root}>
      <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className={s.title}>
        Easing
      </Typography>
      <EasingSelect value={easing} onChange={(v) => onChange(v)} />
    </div>
  );
}
