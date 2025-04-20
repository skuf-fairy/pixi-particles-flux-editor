import React from "react";
import { ParticleTexture } from "src/stores/TexturesStore/TextureStore.types";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { DeleteIcon } from "src/ui/kit/icons/DeleteIcon";
import "./TextureList.style.scss";

interface Props {
  textureList: ParticleTexture[];
  onRemove(texture: ParticleTexture): void;
}

export function TextureList({ textureList, onRemove }: Props) {
  return (
    <ul className="texture-list">
      {textureList.map((texture) => (
        <li key={texture.name} className="texture-list__item">
          <img src={texture.url} alt={texture.name} className="texture-list__image" />

          <Typography color={TypographyColor.PrimaryText} variant={TypographyVariant.P} className="texture-list__name">
            {texture.name}
          </Typography>
          <button className="texture-list__delete" onClick={() => onRemove(texture)}>
            <DeleteIcon className="texture-list__delete-icon" />
          </button>
        </li>
      ))}
    </ul>
  );
}
