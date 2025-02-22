import cn from "classnames";
import React, { PropsWithChildren } from "react";
import "./Typography.style.scss";

export enum TypographyVariant {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  P = "p",
}

interface Props {
  variant: TypographyVariant;
  className?: string;
}

export function Typography({ variant, children, className }: PropsWithChildren<Props>) {
  switch (variant) {
    case TypographyVariant.H1:
      return <h1 className={className}>{children}</h1>;

    case TypographyVariant.H2:
      return <h2 className={cn("h2-text", className)}>{children}</h2>;

    case TypographyVariant.H3:
      return <h3 className={cn("h3-text", className)}>{children}</h3>;

    case TypographyVariant.H4:
      return <h4 className={className}>{children}</h4>;

    case TypographyVariant.H5:
      return <h5 className={className}>{children}</h5>;

    case TypographyVariant.H6:
      return <h6 className={className}>{children}</h6>;

    case TypographyVariant.P:
      return <p className={cn("paragraph", className)}>{children}</p>;

    default:
      return null;
  }
}
