import React from "react";
import { useApplyExampleEmitterConfigUseCaseToken } from "src/di/di.hooks";
import { PARTICLE_EMITTER_EXAMPLES } from "src/examples/examples";
import { Modal } from "src/ui/kit/Modal/Modal";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./ExamplesModal.style.scss";

interface Props {
  onClose: VoidFunction;
}

export function ExamplesModal({ onClose }: Props) {
  const applyExampleEmitterConfigUseCase = useApplyExampleEmitterConfigUseCaseToken();

  return (
    <Modal onClose={onClose}>
      <div className="examples-modal">
        <Typography
          color={TypographyColor.PrimaryTitle}
          variant={TypographyVariant.H2}
          className="textures-gallery-modal__title"
        >
          Particle Emitter Examples
        </Typography>

        <div className="examples-modal__list">
          {PARTICLE_EMITTER_EXAMPLES.map((item) => (
            <button
              key={item.name}
              className="examples-modal__item"
              onClick={async () => {
                await applyExampleEmitterConfigUseCase.applyExample(item);
                onClose();
              }}
            >
              <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P}>
                {item.name}
              </Typography>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
