import React, {useEffect, useState} from 'react';

import cn from 'classnames';

import {Button, ButtonStyleType} from '../Button/Button';

import s from './DropDown.module.css';

type DropDownItem = {key: string; value: string};

export enum DropDownSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface Props {
  options: DropDownItem[];
  value: DropDownItem;
  onChange(v: DropDownItem): void;
  size?: DropDownSize;
  className?: string;
}

export function DropDown({options, value, onChange, size = DropDownSize.Medium, className}: Props) {
  const [isOptionsShown, setIsOptionsShown] = useState(false);

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      const dropDownOptionNodeList = Array.from(document.querySelectorAll('.drop-down-option'));
      if (e.target !== null && !dropDownOptionNodeList.includes(e.target as HTMLElement)) {
        setIsOptionsShown(false);
      }
    };

    window.addEventListener('pointerdown', handleClick);

    return () => window.removeEventListener('pointerdown', handleClick);
  }, []);

  return (
    <div className={cn(s.dropDown, className)}>
      <Button
        styleType={ButtonStyleType.Common}
        onClick={() => setIsOptionsShown((v) => !v)}
        className={cn(s.button, {
          [s.buttonSmall]: size === DropDownSize.Small,
          [s.buttonMedium]: size === DropDownSize.Medium,
          [s.buttonLarge]: size === DropDownSize.Large,
        })}
      >
        {value.value}
      </Button>

      {isOptionsShown && (
        <div
          id="drop-down-options"
          className={cn(s.list, {
            [s.listSmall]: size === DropDownSize.Small,
            [s.listMedium]: size === DropDownSize.Medium,
            [s.listLarge]: size === DropDownSize.Large,
          })}
        >
          {options.map((item) => {
            return (
              <Button
                key={item.key}
                styleType={ButtonStyleType.Common}
                onClick={() => {
                  onChange(item);
                  setIsOptionsShown(false);
                }}
                className={cn(s.item, 'drop-down-option')}
              >
                {item.value}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
