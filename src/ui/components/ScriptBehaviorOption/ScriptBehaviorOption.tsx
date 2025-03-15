import { TimeScriptConfig } from "particle-flux";
import React from "react";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { SymbolButton } from "src/ui/kit/SymbolButton/SymbolButton";
import "./ScriptBehaviorOption.style.scss";

interface Props {
  script: TimeScriptConfig<number>;
  onChange(options: TimeScriptConfig<number>): void;
  min?: number;
  max?: number;
}

export function ScriptBehaviorOption({ script, onChange, min, max }: Props) {
  const handlePushItemClick = () => onChange([...script, { ...script[script.length - 1] }]);

  return (
    <div className="script-behavior">
      <div className="script-behavior__steps-list">
        {script.map((item, scriptIndex) => {
          const isDisabled = scriptIndex === script.length - 1 || scriptIndex === 0;

          const handleTimeChange = (time: number) => {
            const newScript = script.reduce<TimeScriptConfig<number>>((result, item, i) => {
              if (scriptIndex === i) {
                result.push({ time, value: item.value });
              } else {
                result.push(item);
              }

              return result;
            }, []);

            onChange(newScript);
          };

          const handleValueChange = (v: number) => {
            const newScript = script.reduce<TimeScriptConfig<number>>((result, item, i) => {
              if (scriptIndex === i) {
                result.push({ time: item.time, value: v });
              } else {
                result.push(item);
              }

              return result;
            }, []);

            onChange(newScript);
          };

          const handleDropItemClick = () => onChange(script.filter((_, n) => scriptIndex !== n));

          return (
            <div key={scriptIndex} className="script-behavior__item">
              <NumberOption value={item.time} max={1} min={0} text="Time" onBlur={handleTimeChange} />
              <NumberOption value={item.value} min={min} max={max} text="Value" onBlur={handleValueChange} />
              <SymbolButton onClick={handleDropItemClick} disabled={isDisabled}>
                -
              </SymbolButton>
            </div>
          );
        })}
      </div>

      <SymbolButton onClick={handlePushItemClick}>+</SymbolButton>
    </div>
  );
}
