import React, { useRef } from "react";
import {
  useCopyParticleFluxConfigUseCaseToken,
  useResetParticleFluxConfigUseCaseToken,
  useRestoreParticleFluxConfigUseCaseToken,
  useSaveParticleFluxConfigUseCaseToken,
} from "src/di/di.hooks";
import { Button, ButtonSize } from "src/ui/kit/Button/Button";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import "./AppOptions.style.scss";

export function AppOptions() {
  const inputRef = useRef<HTMLInputElement>(null);

  const saveParticleFluxConfigUseCase = useSaveParticleFluxConfigUseCaseToken();
  const copyParticleFluxConfigUseCase = useCopyParticleFluxConfigUseCaseToken();
  const restoreParticleFluxConfigUseCase = useRestoreParticleFluxConfigUseCaseToken();
  const resetParticleFluxConfigUseCase = useResetParticleFluxConfigUseCaseToken();

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
            onChange={restoreParticleFluxConfigUseCase.restore}
          />
        </Button>
        <Button
          size={ButtonSize.Medium}
          onClick={saveParticleFluxConfigUseCase.save}
          className="config-options__button"
        >
          Download
        </Button>
        <Button
          size={ButtonSize.Medium}
          onClick={copyParticleFluxConfigUseCase.copy}
          className="config-options__button"
        >
          Copy
        </Button>
        <Button
          size={ButtonSize.Medium}
          onClick={resetParticleFluxConfigUseCase.reset}
          className="config-options__button"
        >
          Reset
        </Button>
      </div>
    </ItemContainer>
  );
}
