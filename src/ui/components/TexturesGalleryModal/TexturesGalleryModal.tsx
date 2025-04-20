import React from "react";
import { useSelectTextureFromCollectionUseCaseToken } from "src/di/di.hooks";
import { CollectionTexture } from "src/stores/TexturesStore/TextureStore.types";
import { AVAILABLE_TEXTURES } from "src/stores/TexturesStore/TexturesStore.constants";
import { Modal } from "src/ui/kit/Modal/Modal";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import "./TexturesGalleryModal.style.scss";

interface Props {
  onClose: VoidFunction;
}

export function TexturesGalleryModal({ onClose }: Props) {
  const selectTextureFromCollectionUseCase = useSelectTextureFromCollectionUseCaseToken();

  return (
    <Modal onClose={onClose}>
      <div className="textures-gallery-modal">
        <Typography
          color={TypographyColor.PrimaryTitle}
          variant={TypographyVariant.H2}
          className="textures-gallery-modal__title"
        >
          Textures Gallery
        </Typography>

        <ul className="textures-gallery-modal__list">
          {AVAILABLE_TEXTURES.map((item) => (
            <li key={item.name}>
              <button
                className="textures-gallery-modal__item"
                onClick={() => selectTextureFromCollectionUseCase.select(item.name as CollectionTexture)}
              >
                <img src={item.url} alt={item.name} className="textures-gallery-modal__image" />
                <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P}>
                  {item.name}
                </Typography>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
