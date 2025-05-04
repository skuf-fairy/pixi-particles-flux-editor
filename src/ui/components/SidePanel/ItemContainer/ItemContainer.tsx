import {PropsWithChildren} from 'react';
import React from 'react';

import cn from 'classnames';

import s from './ItemContainer.module.css';

interface Props {
  className?: string;
}

export function ItemContainer({className, children}: PropsWithChildren<Props>) {
  return <div className={cn(s.root, className)}>{children}</div>;
}
