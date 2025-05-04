import React, {PropsWithChildren} from 'react';

import cn from 'classnames';

import s from './Button.module.css';

export enum ButtonStyleType {
  Common = 'common',
  Primary = 'primary', // зеленая кнопка
}

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface Props {
  onClick(): void;
  styleType: ButtonStyleType;
  disabled?: boolean;
  size?: ButtonSize;
  className?: string;
}

export function Button({children, disabled, size, onClick, styleType, className}: PropsWithChildren<Props>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(s.button, {[s.disabled]: disabled}, s[`${size}Size`], s[`${styleType}Type`], className)}
    >
      {children}
    </button>
  );
}
