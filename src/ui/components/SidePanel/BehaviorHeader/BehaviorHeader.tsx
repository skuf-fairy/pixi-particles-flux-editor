import React, {ReactNode} from 'react';

import s from './BehaviorHeader.module.css';

interface Props {
  left: ReactNode;
  right: ReactNode;
}

export function BehaviorHeader({left, right}: Props) {
  return (
    <div className={s.root}>
      <div className={s.left}>{left}</div>
      <div className={s.right}>{right}</div>
    </div>
  );
}
