import React from "react";
import { Button } from "src/ui/kit/Button/Button";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import "./ConfigOptions.style.scss";

export function ConfigOptions() {
  return (
    <ItemContainer>
      <div className="config-options">
        <Button onClick={() => {}} className="config-options__button">
          Restore
        </Button>
        <Button onClick={() => {}}>Download</Button>
      </div>
    </ItemContainer>
  );
}
