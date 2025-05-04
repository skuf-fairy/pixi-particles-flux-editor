import {useEditorAppToken} from 'src/di/di.hooks';

import React from 'react';

import {Button, ButtonStyleType} from 'src/ui/kit/Button/Button';
import {RepeatIcon} from 'src/ui/kit/icons/RepeatIcon';

import s from './RestartButton.module.css';

export function RestartButton() {
  const app = useEditorAppToken();

  return (
    <Button styleType={ButtonStyleType.Common} className={s.root} onClick={() => app.restart()}>
      <RepeatIcon />
    </Button>
  );
}
