import React from 'react';

import {useErrorsStore} from 'src/hooks/connectors';

import s from './ErrorNotification.module.css';

export function ErrorNotification() {
  const errorsStore = useErrorsStore();
  const errorData = errorsStore.getErrorData();

  if (errorData === null) return null;

  return (
    <div className={s.root}>
      <h3 className={s.title}>{errorData.title}</h3>
      <p className={s.text}>{errorData.text}</p>
    </div>
  );
}
