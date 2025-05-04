import React from 'react';

import cn from 'classnames';
import {Switch} from 'src/ui/kit/Switch/Switch';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import s from './BooleanValue.module.css';

interface Props {
  label: string;
  checked: boolean;
  onChange(v: boolean): void;
  className?: string;
}

export function BooleanValue({checked, label, onChange, className}: Props) {
  return (
    <div className={cn(s.root, className)}>
      <Switch checked={checked} onChange={onChange} className={s.switch} />
      <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P}>
        {label}
      </Typography>
    </div>
  );
}
