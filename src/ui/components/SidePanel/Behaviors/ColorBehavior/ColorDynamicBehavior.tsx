import React from 'react';

import {ColorDynamicBehaviorConfig, EasingName} from 'particle-flux';
import {EasingOption} from 'src/ui/components/EasingOption/EasingOption';
import {FieldsGrid} from 'src/ui/components/FieldsGrid/FieldsGrid';
import {ColorPicker} from 'src/ui/kit/ColorPicker/ColorPicker';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import s from './ColorDynamicBehavior.module.css';

interface Props {
  config: ColorDynamicBehaviorConfig;
  onChange(config: ColorDynamicBehaviorConfig): void;
}

export function ColorDynamicBehavior({config, onChange}: Props) {
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

      <EasingOption easing={config.easing || EasingName.linear} onChange={(v) => onChange({...config, easing: v})} />
    </FieldsGrid>
  );
}
