import React from "react";
import { useToggleLocalStorageSaveUseCaseToken } from "src/di/di.hooks";
import { useAppConfigStore } from "src/hooks/connectors";
import { Button, ButtonSize } from "src/ui/kit/Button/Button";
import { ColorPicker } from "src/ui/kit/ColorPicker/ColorPicker";
import { Divider } from "src/ui/kit/Divider/Divider";
import { Modal } from "src/ui/kit/Modal/Modal";
import { Switch } from "src/ui/kit/Switch/Switch";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./AppSettingsModal.style.scss";

interface Props {
  onClose: VoidFunction;
}

export function AppSettingsModal({ onClose }: Props) {
  const appConfigStore = useAppConfigStore();
  const toggleLocalStorageSaveUseCase = useToggleLocalStorageSaveUseCaseToken();

  return (
    <Modal onClose={onClose}>
      <div className="menu-modal">
        <Typography variant={TypographyVariant.H2} className="menu-modal__title">
          Menu
        </Typography>

        <Divider className="menu-modal__divider" />

        <div className="menu-modal__top-bar">
          <Button size={ButtonSize.Medium} onClick={() => appConfigStore.reset()} className="menu-modal__button">
            Reset to default
          </Button>
        </div>

        <div className="menu-modal__option-container">
          <Typography variant={TypographyVariant.P} className="menu-modal__option-title">
            Background color
          </Typography>

          <ColorPicker
            color={appConfigStore.getBackgroundColor()}
            onChange={(color) => appConfigStore.setBackgroundColor(color)}
            className="menu-modal__color-picker"
          />
        </div>

        <div className="menu-modal__option-container">
          <Typography variant={TypographyVariant.P} className="menu-modal__option-title">
            Autosave
          </Typography>

          <Switch
            checked={appConfigStore.isLocalStorageSaveEnabled()}
            onChange={toggleLocalStorageSaveUseCase.toggle}
          />
        </div>

        <div className="menu-modal__option-container">
          <Typography variant={TypographyVariant.P} className="menu-modal__option-title">
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
