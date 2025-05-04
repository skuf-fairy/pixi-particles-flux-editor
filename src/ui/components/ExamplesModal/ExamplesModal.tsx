import {useApplyExampleEmitterConfigUseCaseToken} from 'src/di/di.hooks';

import React from 'react';

import {PARTICLE_EMITTER_EXAMPLES} from 'src/examples/examples';
import {Button, ButtonStyleType} from 'src/ui/kit/Button/Button';
import {Modal} from 'src/ui/kit/Modal/Modal';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import s from './ExamplesModal.module.css';

interface Props {
  onClose: VoidFunction;
}

export function ExamplesModal({onClose}: Props) {
  const applyExampleEmitterConfigUseCase = useApplyExampleEmitterConfigUseCaseToken();

  return (
    <Modal onClose={onClose}>
      <div className={s.root}>
        <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H2} className={s.title}>
          Particle Emitter Examples
        </Typography>

        <div>
          {PARTICLE_EMITTER_EXAMPLES.map((item) => (
            <Button
              key={item.name}
              styleType={ButtonStyleType.Common}
              className={s.item}
              onClick={async () => {
                await applyExampleEmitterConfigUseCase.applyExample(item);
                onClose();
              }}
            >
              <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P}>
                {item.name}
              </Typography>
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
