import cn from "classnames";
import React, { useEffect, useState } from "react";
import "./DropDown.style.scss";

type DropDownItem = { key: string; value: string };

export enum DropDownSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface Props {
  options: DropDownItem[];
  value: DropDownItem;
  onChange(v: DropDownItem): void;
  size?: DropDownSize;
}

export function DropDown({ options, value, onChange, size = DropDownSize.Medium }: Props) {
  const [isOptionsShown, setIsOptionsShown] = useState(false);

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      const dropDownOptionNodeList = Array.from(document.querySelectorAll(".drop-down__item"));

      if (e.target !== null && !dropDownOptionNodeList.includes(e.target as HTMLElement)) {
        setIsOptionsShown(false);
      }
    };

    window.addEventListener("pointerdown", handleClick);

    return () => window.removeEventListener("pointerdown", handleClick);
  }, []);

  return (
    <div className="drop-down">
      <button
        onClick={() => setIsOptionsShown((v) => !v)}
        className={cn("drop-down__button", {
          ["drop-down__button--small"]: size === DropDownSize.Small,
          ["drop-down__button--medium"]: size === DropDownSize.Medium,
          ["drop-down__button--large"]: size === DropDownSize.Large,
        })}
      >
        {value.value}
      </button>

      {isOptionsShown && (
        <div
          id="drop-down-options"
          className={cn("drop-down__list", {
            ["drop-down__list--small"]: size === DropDownSize.Small,
            ["drop-down__list--medium"]: size === DropDownSize.Medium,
            ["drop-down__list--large"]: size === DropDownSize.Large,
          })}
        >
          {options.map((item) => {
            return (
              <button
                key={item.key}
                onClick={() => {
                  onChange(item);
                  setIsOptionsShown(false);
                }}
                className="drop-down__item"
              >
                {item.value}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
