import React, { useEffect, useState } from "react";
import "./DropDown.style.scss";

type DropDownItem = { key: string; value: string };

interface Props {
  options: DropDownItem[];
  value: DropDownItem;
  onChange(v: DropDownItem): void;
}

export function DropDown({ options, value, onChange }: Props) {
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
      <button onClick={() => setIsOptionsShown((v) => !v)} className="drop-down__button">
        {value.value}
      </button>

      {isOptionsShown && (
        <div id="drop-down-options" className="drop-down__list">
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
