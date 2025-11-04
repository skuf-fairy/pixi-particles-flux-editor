import React from 'react';

import {ColorTransitionBehaviorConfig} from 'particle-flux';
import {EasingOption} from 'src/ui/components/EasingOption/EasingOption';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {ColorPicker} from 'src/ui/kit/ColorPicker/ColorPicker';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import s from './ColorTransitionBehavior.module.css';

interface Props {
  config: ColorTransitionBehaviorConfig;
  onChange(config: ColorTransitionBehaviorConfig): void;
}

export function ColorTransitionBehavior({config, onChange}: Props) {
  return (
    <FieldsGrid>
      <div>
        <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className={s.title}>
          Start Color
        </Typography>
        <ColorPicker
          color={config.start}
          onChange={(v) => {
            onChange({...config, start: v});
          }}
        />
      </div>

      <div>
        <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className={s.title}>
          End Color
        </Typography>
        <ColorPicker
          color={config.end}
          onChange={(v) => {
            onChange({...config, end: v});
          }}
        />
      </div>

      <EasingOption easing={config.easing || 'linear'} onChange={(v) => onChange({...config, easing: v})} />
    </FieldsGrid>
  );
}
