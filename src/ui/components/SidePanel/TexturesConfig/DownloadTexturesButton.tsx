import React from "react";
import { useDownloadTexturesUseCaseToken } from "src/di/di.hooks";
import { Button, ButtonSize, ButtonStyleType } from "src/ui/kit/Button/Button";

export function DownloadTexturesButton() {
  const downloadTexturesUseCase = useDownloadTexturesUseCaseToken();

  return (
    <Button styleType={ButtonStyleType.Primary} size={ButtonSize.Medium} onClick={downloadTexturesUseCase.download}>
      Download Textures
    </Button>
  );
}
