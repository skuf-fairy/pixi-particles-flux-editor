import React from 'react';

import {Multiplier, isRangeValue} from 'particle-flux';
import {PropertyType} from 'src/stores/types';
import {DropDown, DropDownSize} from 'src/ui/kit/DropDown/DropDown';
import {Typography, TypographyColor, TypographyVariant} from 'src/ui/kit/Typography/Typography';

import {NumberOption} from '../NumberOption/NumberOption';

import s from './MultiplierOption.module.css';

interface Props {
  multiplier: Multiplier;
  onChange(multiplier: Multiplier): void;
}

export function MultiplierOption({multiplier, onChange}: Props) {
  if (isRangeValue(multiplier)) {
    return (
      <div className={s.multiplierOption}>
        <div className={s.header}>
          <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H5} className={s.title}>
            Multiplier
          </Typography>

          <DropDown
            value={{value: PropertyType.Range, key: PropertyType.Range}}
            options={[
              {value: PropertyType.Static, key: PropertyType.Static},
              {value: PropertyType.Range, key: PropertyType.Range},
            ]}
            onChange={(v) => {
              const type = v as any as PropertyType;
              if (type === PropertyType.Range) {
                onChange({min: 1, max: 1});
              } else {
                onChange(1);
              }
            }}
            size={DropDownSize.Small}
          />
        </div>

        <div className={s.content}>
          <NumberOption value={multiplier.min} text="Min" onBlur={(v) => onChange({...multiplier, min: v})} />
          <NumberOption value={multiplier.max} text="Max" onBlur={(v) => onChange({...multiplier, max: v})} />
        </div>
      </div>
    );
  }

  return (
    <div className={s.root}>
      <div className={s.header}>
        <Typography color={TypographyColor.PrimaryTitle} variant={TypographyVariant.H5} className={s.title}>
          Multiplier
        </Typography>

        <DropDown
          value={{value: PropertyType.Static, key: PropertyType.Static}}
          options={[
            {value: PropertyType.Static, key: PropertyType.Static},
            {value: PropertyType.Range, key: PropertyType.Range},
          ]}
          onChange={(v) => {
            const type = v.value as PropertyType;
            if (type === PropertyType.Range) {
              onChange({min: 1, max: 1});
            } else {
              onChange(1);
            }
          }}
          size={DropDownSize.Small}
        />
      </div>

      <div className={s.content}>
        <NumberOption value={multiplier} text="Multiplier" onBlur={(v) => onChange(v)} />
      </div>
    </div>
  );
}
