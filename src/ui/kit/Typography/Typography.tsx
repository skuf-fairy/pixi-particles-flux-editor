import React, {PropsWithChildren} from 'react';

import cn from 'classnames';

import s from './Typography.module.css';

export enum TypographyVariant {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  P = 'p',
}

export enum TypographyColor {
  PrimaryTitle = 'PrimaryTitle',
  PrimaryText = 'PrimaryText',
  SecondaryText = 'SecondaryText',
}

interface Props {
  color: TypographyColor;
  variant: TypographyVariant;
  className?: string;
}

export function Typography({variant, color, children, className}: PropsWithChildren<Props>) {
  const colorClassName = s[`typographyColor_${color}`];

  switch (variant) {
    case TypographyVariant.H1:
      return <h1 className={cn(className, colorClassName)}>{children}</h1>;

    case TypographyVariant.H2:
      return <h2 className={cn(s.h2, className, colorClassName)}>{children}</h2>;

    case TypographyVariant.H3:
      return <h3 className={cn(s.h3, className, colorClassName)}>{children}</h3>;

    case TypographyVariant.H4:
      return <h4 className={cn(className, colorClassName)}>{children}</h4>;

    case TypographyVariant.H5:
      return <h5 className={cn(s.h5, className, colorClassName)}>{children}</h5>;

    case TypographyVariant.H6:
      return <h6 className={cn(className, colorClassName)}>{children}</h6>;

    case TypographyVariant.P:
      return <p className={cn(s.paragraph, className, colorClassName)}>{children}</p>;

    default:
      return null;
  }
}
