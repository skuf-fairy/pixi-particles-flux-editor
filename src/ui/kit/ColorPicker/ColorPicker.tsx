import React, {useEffect, useRef, useState} from 'react';

import cn from 'classnames';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import s from './ColorPicker.module.css';

interface Props {
  onChange(color: string): void;
  color: string;
  className?: string;
}

export function ColorPicker({color, onChange, className}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentColor, setCurrentColor] = useState(color);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  return (
    <div className={cn(s.colorPicker, className)}>
      <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P}>
        {color}
      </Typography>

      <input
        ref={inputRef}
        value={currentColor}
        type="color"
        className={s.input}
        onChange={(e) => {
          setCurrentColor(e.target.value);
        }}
        onBlur={() => {
          onChange(currentColor);
        }}
      />
    </div>
  );
}
