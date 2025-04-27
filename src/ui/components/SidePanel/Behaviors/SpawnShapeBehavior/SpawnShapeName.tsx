import React from "react";
import { useDropSpawnShapeItemToken } from "src/di/di.hooks";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { DeleteIcon } from "src/ui/kit/icons/DeleteIcon";
import "./SpawnShapeName.style.scss";

interface Props {
  title: string;
  spawnShapeIndex: number;
}

export function SpawnShapeName({ title, spawnShapeIndex }: Props) {
  const dropSpawnShapeItem = useDropSpawnShapeItemToken();

  return (
    <div className="behavior-shape-name">
      <Typography
        color={TypographyColor.PrimaryTitle}
        variant={TypographyVariant.H5}
        className="behavior-shape-name__name"
      >
        {title}
      </Typography>
      <button onClick={() => dropSpawnShapeItem.drop(spawnShapeIndex)}>
        <DeleteIcon className="behavior-shape-name__delete-icon" />
      </button>
    </div>
  );
}
