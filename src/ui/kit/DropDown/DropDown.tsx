import React, { useState } from "react";
import "./DropDown.style.scss";

type DropDownItem = { key: string; value: string };

interface Props {
  options: DropDownItem[];
  value: DropDownItem;
  onChange(v: DropDownItem): void;
}

export function DropDown({ options, value, onChange }: Props) {
  const [isOptionsShown, setIsOptionsShown] = useState(false);

  return (
    <div className="drop-down">
      <button onClick={() => setIsOptionsShown((v) => !v)} className="drop-down__button">
        {value.value}
      </button>

      {isOptionsShown && (
        <div className="drop-down__list">
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
