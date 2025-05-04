import React from 'react';

import cn from 'classnames';
import {InputNumber} from 'src/ui/kit/Input/InputNumber';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import s from './NumberOption.module.css';

interface Props {
  value: number;
  text: string;
  min?: number;
  max?: number;
  onBlur?(v: number): void;
  className?: string;
}

export function NumberOption({value, text, min, max, onBlur, className}: Props) {
  return (
    <div className={cn(s.numberOption, className)}>
      <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className={s.title}>
        {text}
      </Typography>
      <InputNumber value={value} min={min} max={max} onBlur={onBlur} className={s.input} />
    </div>
  );
}
