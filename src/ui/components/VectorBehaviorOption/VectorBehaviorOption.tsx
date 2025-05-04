import React from 'react';

import {VectorBehaviorConfig, isScalarTransitionBehaviorConfig} from 'particle-flux';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import {ScalarStaticBehaviorOption} from '../ScalarStaticBehavior/ScalarStaticBehaviorOption';
import {ScalarTransitionBehaviorOption} from '../ScalarTransitionBehaviorOption/ScalarTransitionBehaviorOption';

import s from './VectorBehaviorOption.module.css';

interface Props {
  config: VectorBehaviorConfig;
  onChange(v: VectorBehaviorConfig): void;
}

export function VectorBehaviorOption({config, onChange}: Props) {
  return (
    <div className={s.root}>
      <div className={s.item}>
        <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H3} className={s.coordinate}>
          X
        </Typography>

        {isScalarTransitionBehaviorConfig(config.x) ? (
          <ScalarTransitionBehaviorOption config={config.x} onChange={(v) => onChange({...config, x: v})} />
        ) : (
          <ScalarStaticBehaviorOption config={config.x} onChange={(v) => onChange({...config, x: v})} />
        )}
      </div>
      <div className={s.item}>
        <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H3} className={s.coordinate}>
          Y
        </Typography>

        {isScalarTransitionBehaviorConfig(config.y) ? (
          <ScalarTransitionBehaviorOption config={config.y} onChange={(v) => onChange({...config, y: v})} />
        ) : (
          <ScalarStaticBehaviorOption config={config.y} onChange={(v) => onChange({...config, y: v})} />
        )}
      </div>
    </div>
  );
}
