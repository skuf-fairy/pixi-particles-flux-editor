import {
  useCopyParticleFluxConfigUseCaseToken,
  useResetParticleFluxConfigUseCaseToken,
  useRestoreParticleFluxConfigUseCaseToken,
  useSaveParticleFluxConfigUseCaseToken,
} from 'src/di/di.hooks';

import React, {useRef} from 'react';

import {Button, ButtonSize, ButtonStyleType} from 'src/ui/kit/Button/Button';

import {ItemContainer} from '../ItemContainer/ItemContainer';

import s from './AppOptions.module.css';

export function AppOptions() {
  const inputRef = useRef<HTMLInputElement>(null);

  const saveParticleFluxConfigUseCase = useSaveParticleFluxConfigUseCaseToken();
  const copyParticleFluxConfigUseCase = useCopyParticleFluxConfigUseCaseToken();
  const restoreParticleFluxConfigUseCase = useRestoreParticleFluxConfigUseCaseToken();
  const resetParticleFluxConfigUseCase = useResetParticleFluxConfigUseCaseToken();

  return (
    <ItemContainer>
      <div className={s.root}>
        <Button
          styleType={ButtonStyleType.Primary}
          size={ButtonSize.Medium}
          onClick={() => inputRef.current?.click()}
          className={s.button}
        >
          Restore
          <input
            ref={inputRef}
            type="file"
            accept="application/json"
            className={s.uploadInput}
            onChange={restoreParticleFluxConfigUseCase.restore}
          />
        </Button>
        <Button
          styleType={ButtonStyleType.Primary}
          size={ButtonSize.Medium}
          onClick={saveParticleFluxConfigUseCase.save}
          className={s.button}
        >
          Download
        </Button>
        <Button
          styleType={ButtonStyleType.Primary}
          size={ButtonSize.Medium}
          onClick={copyParticleFluxConfigUseCase.copy}
          className={s.button}
        >
          Copy
        </Button>
        <Button
          styleType={ButtonStyleType.Primary}
          size={ButtonSize.Medium}
          onClick={resetParticleFluxConfigUseCase.reset}
          className={s.button}
        >
          Reset
        </Button>
      </div>
    </ItemContainer>
  );
}
