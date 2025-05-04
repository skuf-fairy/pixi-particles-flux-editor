import React from 'react';

import cn from 'classnames';

import s from './Divider.module.css';

interface Props {
  className?: string;
}

export function Divider({className}: Props) {
  return <div className={cn(s.divider, className)} />;
}
