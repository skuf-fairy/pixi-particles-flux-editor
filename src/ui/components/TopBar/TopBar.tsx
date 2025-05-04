import React, {useState} from 'react';

import {Button, ButtonStyleType} from 'src/ui/kit/Button/Button';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import {ExamplesModal} from '../ExamplesModal/ExamplesModal';
import {AppSettingsModal} from '../MenuModal/AppSettingsModal';

import s from './TopBar.module.css';

export function TopBar() {
  const [isAppSettingsModalOpened, setAppSettingsModalOpened] = useState(false);
  const [isExamplesModalOpened, setExamplesModalOpened] = useState(false);

  return (
    <>
      <header className={s.root}>
        <Button styleType={ButtonStyleType.Common} onClick={() => setAppSettingsModalOpened(true)} className={s.item}>
          <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className={s.text}>
            Settings
          </Typography>
        </Button>

        <Button styleType={ButtonStyleType.Common} onClick={() => setExamplesModalOpened(true)} className={s.item}>
          <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className={s.text}>
            Examples
          </Typography>
        </Button>

        <Button
          styleType={ButtonStyleType.Common}
          className={s.item}
          onClick={() => window.open('https://www.npmjs.com/package/particle-flux', '_blank')}
        >
          <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className={s.text}>
            NPM
          </Typography>
        </Button>
      </header>
      {isAppSettingsModalOpened && <AppSettingsModal onClose={() => setAppSettingsModalOpened(false)} />}
      {isExamplesModalOpened && <ExamplesModal onClose={() => setExamplesModalOpened(false)} />}
    </>
  );
}
