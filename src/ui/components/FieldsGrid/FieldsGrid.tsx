import React, {PropsWithChildren} from 'react';

import cn from 'classnames';

import s from './FieldsGrid.module.css';

interface Props {
  className?: string;
}

export function FieldsGrid({className, children}: PropsWithChildren<Props>) {
  return <div className={cn(s.root, className)}>{children}</div>;
}
