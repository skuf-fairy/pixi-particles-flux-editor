import React from "react";
import { useEditorAppToken } from "src/di/di.hooks";
import { RepeatIcon } from "src/ui/kit/icons/RepeatIcon";
import "./RestartButton.style.scss";

export function RestartButton() {
  const app = useEditorAppToken();

  return (
    <button className="repeat-button" onClick={() => app.restart()}>
      <RepeatIcon />
    </button>
  );
}
