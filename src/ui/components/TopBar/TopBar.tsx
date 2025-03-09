import React, { useState } from "react";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { AppSettingsModal } from "../MenuModal/AppSettingsModal";
import "./TopBar.style.scss";

export function TopBar() {
  const [isAppSettingsModalOpened, setAppSettingsModalOpened] = useState(false);

  return (
    <>
      <header className="top-bar">
        <button onClick={() => setAppSettingsModalOpened(true)} className="top-bar__item">
          <Typography variant={TypographyVariant.P} className="top-bar__item-text">
            Settings
          </Typography>
        </button>

        <button className="top-bar__item">
          <Typography variant={TypographyVariant.P} className="top-bar__item-text">
            Examples
          </Typography>
        </button>

        <button className="top-bar__item">
          <Typography variant={TypographyVariant.P} className="top-bar__item-text">
            Documentation
          </Typography>
        </button>
      </header>
      {isAppSettingsModalOpened && <AppSettingsModal onClose={() => setAppSettingsModalOpened(false)} />}
    </>
  );
}
