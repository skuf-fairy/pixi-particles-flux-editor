import React from "react";
import { useLocalConfigStorageService } from "src/di/di.hooks";
import { useAppConfigStore } from "src/hooks/connectors";
import { ColorPicker } from "src/ui/kit/ColorPicker/ColorPicker";
import { Modal } from "src/ui/kit/Modal/Modal";
import { Switch } from "src/ui/kit/Switch/Switch";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./MenuModal.style.scss";

interface Props {
  onClose: VoidFunction;
}

export function MenuModal({ onClose }: Props) {
  const localStorageService = useLocalConfigStorageService();
  const appConfigStore = useAppConfigStore();

  return (
    <Modal onClose={onClose}>
      <div className="menu-modal">
        <Typography variant={TypographyVariant.H2} className="menu-modal__title">
          Menu
        </Typography>

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
            checked={appConfigStore.getState().isLocalStorageSaveEnabled}
            onChange={(checked) => {
              if (checked) {
                localStorageService.enableAutoSave();
                appConfigStore.setValue("isLocalStorageSaveEnabled", true);
              } else {
                localStorageService.disableAutoSave();
                appConfigStore.setValue("isLocalStorageSaveEnabled", false);
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
