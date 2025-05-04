import {useToggleLocalStorageSaveUseCaseToken} from 'src/di/di.hooks';

import React from 'react';

import {useAppConfigStore} from 'src/hooks/connectors';
import {Button, ButtonSize, ButtonStyleType} from 'src/ui/kit/Button/Button';
import {ColorPicker} from 'src/ui/kit/ColorPicker/ColorPicker';
import {Divider} from 'src/ui/kit/Divider/Divider';
import {Modal} from 'src/ui/kit/Modal/Modal';
import {Switch} from 'src/ui/kit/Switch/Switch';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import s from './AppSettingsModal.module.css';

interface Props {
  onClose: VoidFunction;
}

export function AppSettingsModal({onClose}: Props) {
  const appConfigStore = useAppConfigStore();
  const toggleLocalStorageSaveUseCase = useToggleLocalStorageSaveUseCaseToken();

  return (
    <Modal onClose={onClose}>
      <div className={s.menuModal}>
        <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H2} className={s.title}>
          Menu
        </Typography>

        <Divider className={s.divider} />

        <div className={s.topBar}>
          <Button styleType={ButtonStyleType.Primary} size={ButtonSize.Medium} onClick={() => appConfigStore.reset()}>
            Reset to default
          </Button>
        </div>

        <div className={s.optionContainer}>
          <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.P} className={s.optionTitle}>
            Background color
          </Typography>

          <ColorPicker
            color={appConfigStore.getBackgroundColor()}
            onChange={(color) => appConfigStore.setBackgroundColor(color)}
            className={s.colorPicker}
          />
        </div>

        <div className={s.optionContainer}>
          <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.P} className={s.optionTitle}>
            Autosave
          </Typography>

          <Switch
            checked={appConfigStore.isLocalStorageSaveEnabled()}
            onChange={toggleLocalStorageSaveUseCase.toggle}
          />
        </div>

        <div className={s.optionContainer}>
          <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.P} className={s.optionTitle}>
            Follow Pointer
          </Typography>

          <Switch
            checked={appConfigStore.isFollowPointer()}
            onChange={(checked) => {
              appConfigStore.setFollowPointer(checked);
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
