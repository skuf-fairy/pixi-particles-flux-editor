import React, {PropsWithChildren} from 'react';

import cn from 'classnames';

import {Button, ButtonStyleType} from '../Button/Button';
import {Typography, TypographyColor, TypographyVariant} from '../Typography/Typography';

import s from './SymbolButton.module.css';

interface Props {
  onClick: VoidFunction;
  disabled?: boolean;
  className?: string;
}

export function SymbolButton({onClick, disabled, className, children}: PropsWithChildren<Props>) {
  return (
    <Button styleType={ButtonStyleType.Primary} className={cn(s.root, className)} onClick={onClick} disabled={disabled}>
      <Typography color={TypographyColor.SecondaryText} variant={TypographyVariant.H3} className={s.text}>
        {children}
      </Typography>
    </Button>
  );
}
