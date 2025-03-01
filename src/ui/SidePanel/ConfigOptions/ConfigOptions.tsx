import React from "react";
import { Button, ButtonSize } from "src/ui/kit/Button/Button";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import "./ConfigOptions.style.scss";

export function ConfigOptions() {
  return (
    <ItemContainer>
      <div className="config-options">
        <Button size={ButtonSize.Medium} onClick={() => {}} className="config-options__button">
          Restore
        </Button>
        <Button size={ButtonSize.Medium} onClick={() => {}} className="config-options__button">
          Download
        </Button>
      </div>
    </ItemContainer>
  );
}
