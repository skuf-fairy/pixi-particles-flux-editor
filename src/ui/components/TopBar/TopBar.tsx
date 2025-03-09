import React, { useState } from "react";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { MenuModal } from "../MenuModal/MenuModal";
import "./TopBar.style.scss";

export function TopBar() {
  const [isMenuModalOpened, setMenuModalOpened] = useState(false);

  return (
    <>
      <header className="top-bar">
        <button onClick={() => setMenuModalOpened(true)} className="top-bar__item">
          <Typography variant={TypographyVariant.P} className="top-bar__item-text">
            Main Menu
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
      {isMenuModalOpened && <MenuModal onClose={() => setMenuModalOpened(false)} />}
    </>
  );
}
