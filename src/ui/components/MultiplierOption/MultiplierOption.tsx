import { Multiplier, isRangeValue } from "particle-flux";
import React from "react";
import { NumberValueType } from "src/stores/EmitterConfigStore";
import { DropDown, DropDownSize } from "src/ui/kit/DropDown/DropDown";
import { Typography, TypographyColor, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { NumberOption } from "../NumberOption/NumberOption";
import "./MultiplierOption.style.scss";

interface Props {
  multiplier: Multiplier;
  onChange(multiplier: Multiplier): void;
}

export function MultiplierOption({ multiplier, onChange }: Props) {
  if (isRangeValue(multiplier)) {
    return (
      <div className="multiplier-option">
        <div className="multiplier-option__header">
          <Typography
            color={TypographyColor.PrimaryTitle}
            variant={TypographyVariant.H5}
            className="multiplier-option__title"
          >
            Multiplier
          </Typography>

          <DropDown
            value={{ value: NumberValueType.Range, key: NumberValueType.Range }}
            options={[
              { value: NumberValueType.Static, key: NumberValueType.Static },
              { value: NumberValueType.Range, key: NumberValueType.Range },
            ]}
            onChange={(v) => {
              const type = v as any as NumberValueType;
              if (type === NumberValueType.Range) {
                onChange({ min: 1, max: 1 });
              } else {
                onChange(1);
              }
            }}
            size={DropDownSize.Small}
          />
        </div>

        <div className="multiplier-option__content">
          <NumberOption value={multiplier.min} text="Min" onBlur={(v) => onChange({ ...multiplier, min: v })} />
          <NumberOption value={multiplier.max} text="Max" onBlur={(v) => onChange({ ...multiplier, max: v })} />
        </div>
      </div>
    );
  }

  return (
    <div className="multiplier-option">
      <div className="multiplier-option__header">
        <Typography
          color={TypographyColor.PrimaryTitle}
          variant={TypographyVariant.H5}
          className="multiplier-option__title"
        >
          Multiplier
        </Typography>

        <DropDown
          value={{ value: NumberValueType.Static, key: NumberValueType.Static }}
          options={[
            { value: NumberValueType.Static, key: NumberValueType.Static },
            { value: NumberValueType.Range, key: NumberValueType.Range },
          ]}
          onChange={(v) => {
            const type = v.value as NumberValueType;
            if (type === NumberValueType.Range) {
              onChange({ min: 1, max: 1 });
            } else {
              onChange(1);
            }
          }}
          size={DropDownSize.Small}
        />
      </div>

      <div className="multiplier-option__content">
        <NumberOption value={multiplier} text="Multiplier" onBlur={(v) => onChange(v)} />
      </div>
    </div>
  );
}
