import React, { ChangeEvent, useRef } from "react";
import { useConfigJSONServiceToken, useEditorAppToken } from "src/di/di.hooks";
import { ReaderContentType, useUploadFile } from "src/hooks/useUploadFile";
import { CopyService } from "src/services/CopyService";
import { DownloadService } from "src/services/DownloadService";
import { Button, ButtonSize } from "src/ui/kit/Button/Button";
import { ColorPicker } from "src/ui/kit/ColorPicker/ColorPicker";
import { Switch } from "src/ui/kit/Switch/Switch";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import "./AppOptions.style.scss";

export function AppOptions() {
  const configJSONServiceToken = useConfigJSONServiceToken();
  const editorApp = useEditorAppToken();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useUploadFile(ReaderContentType.Text);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    // todo error
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file && file.type === "application/json") {
      const content = await uploadFile(file);

      if (typeof content === "string") {
        configJSONServiceToken.fromStringifiedConfig(content);
      }
    }
  };

  return (
    <ItemContainer>
      <div className="config-options">
        <Button size={ButtonSize.Medium} onClick={() => inputRef.current?.click()} className="config-options__button">
          Restore
          <input
            ref={inputRef}
            type="file"
            accept="application/json"
            className="upload-input"
            onChange={handleUpload}
          />
        </Button>
        <Button
          size={ButtonSize.Medium}
          onClick={() => {
            DownloadService.downloadJSON(configJSONServiceToken.getStringifiedConfig());
          }}
          className="config-options__button"
        >
          Download
        </Button>
        <Button
          size={ButtonSize.Medium}
          onClick={() => {
            CopyService.copyTextToClipboard(configJSONServiceToken.getStringifiedConfig());
          }}
          className="config-options__button"
        >
          Copy
        </Button>
        <Button
          size={ButtonSize.Medium}
          onClick={() => {
            editorApp.reset();
          }}
          className="config-options__button"
        >
          Reset
        </Button>
      </div>

      <div className="config-options__color">
        <Typography variant={TypographyVariant.H3} className="config-options__color-text">
          Background color
        </Typography>

        <ColorPicker color="#ffffff" onChange={() => {}} />
      </div>

      <div>
        <Switch checked onChange={() => {}} />
        <Typography variant={TypographyVariant.P} className="config-options__color-text">
          Autosave
        </Typography>
      </div>
    </ItemContainer>
  );
}
