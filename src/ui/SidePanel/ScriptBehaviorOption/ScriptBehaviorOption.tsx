import { TimeScriptConfig } from "particle-flux";
import React from "react";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { SymbolButton } from "src/ui/kit/SymbolButton/SymbolButton";
import "./ScriptBehaviorOption.style.scss";

interface Props {
  script: TimeScriptConfig<number>;
  onChange(options: TimeScriptConfig<number>): void;
}

export function ScriptBehaviorOption({ script, onChange }: Props) {
  return (
    <div className="script-behavior">
      <div className="script-behavior__steps-list">
        {script.map((item, key) => (
          <div key={key} className="script-behavior__item">
            <NumberOption
              value={item.time}
              text={"Time"}
              onChange={(v) => {
                item.time = v;
                onChange([...script]);
              }}
            />
            <NumberOption
              value={item.value}
              text={"Value"}
              onChange={(v) => {
                item.value = v;
                onChange([...script]);
              }}
            />
            <SymbolButton
              onClick={() => onChange(script.filter((item, n) => key !== n))}
              disabled={key === script.length - 1 || key === 0}
            >
              -
            </SymbolButton>
          </div>
        ))}
      </div>

      <SymbolButton onClick={() => onChange([...script, { ...script[script.length - 1] }])}>+</SymbolButton>
    </div>
  );
}
