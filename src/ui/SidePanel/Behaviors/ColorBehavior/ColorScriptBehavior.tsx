import React from "react";
import { useColorBehaviorStore } from "src/hooks/useColorBehaviorStore";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { ColorPicker } from "src/ui/kit/ColorPicker/ColorPicker";
import { SymbolButton } from "src/ui/kit/SymbolButton/SymbolButton";
import "./ColorScriptBehavior.style.scss";

export function ColorScriptBehavior() {
  const store = useColorBehaviorStore();
  const config = store.getState().scriptConfig;

  return (
    <div className="color-script-behavior">
      {config.script.map((option, key) => (
        <div key={key} className="color-script-behavior__option">
          <ColorPicker
            color={option.value}
            onChange={(v) => {
              option.value = v;
              store.setScriptBehaviorConfig({ script: [...config.script] });
            }}
            className="color-script-behavior__color-picker"
          />
          <NumberOption
            value={option.time}
            text="Time"
            min={0}
            max={1}
            onChange={(v) => {
              option.time = v;
              store.setScriptBehaviorConfig({ script: [...config.script] });
            }}
            className="color-script-behavior__number-option"
          />
          <SymbolButton
            onClick={() =>
              store.setScriptBehaviorConfig({
                script: config.script.filter((item, n) => key !== n),
              })
            }
            disabled={key === config.script.length - 1 || key === 0}
          >
            -
          </SymbolButton>
        </div>
      ))}

      <SymbolButton
        onClick={() =>
          store.setScriptBehaviorConfig({ script: [...config.script, { ...config.script[config.script.length - 1] }] })
        }
      >
        +
      </SymbolButton>
    </div>
  );
}
