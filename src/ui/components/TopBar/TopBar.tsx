import React, { useState } from "react";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { ExamplesModal } from "../ExamplesModal/ExamplesModal";
import { AppSettingsModal } from "../MenuModal/AppSettingsModal";
import "./TopBar.style.scss";

export function TopBar() {
  const [isAppSettingsModalOpened, setAppSettingsModalOpened] = useState(false);
  const [isExamplesModalOpened, setExamplesModalOpened] = useState(false);

  return (
    <>
      <header className="top-bar">
        <button onClick={() => setAppSettingsModalOpened(true)} className="top-bar__item">
          <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className="top-bar__item-text">
            Settings
          </Typography>
        </button>

        <button onClick={() => setExamplesModalOpened(true)} className="top-bar__item">
          <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className="top-bar__item-text">
            Examples
          </Typography>
        </button>

        <button
          className="top-bar__item"
          onClick={() => window.open("https://www.npmjs.com/package/particle-flux", "_blank")}
        >
          <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className="top-bar__item-text">
            NPM
          </Typography>
        </button>
      </header>
      {isAppSettingsModalOpened && <AppSettingsModal onClose={() => setAppSettingsModalOpened(false)} />}
      {isExamplesModalOpened && <ExamplesModal onClose={() => setExamplesModalOpened(false)} />}
    </>
  );
}
