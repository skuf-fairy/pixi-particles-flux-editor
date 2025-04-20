import { NumberScriptBehaviorConfig, ScriptTimeConfig } from "particle-flux";
import React from "react";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { SymbolButton } from "src/ui/kit/SymbolButton/SymbolButton";
import { BooleanValue } from "../BooleanValue/BooleanValue";
import "./NumberScriptBehaviorOption.style.scss";

interface Props {
  config: NumberScriptBehaviorConfig;
  onChange(config: NumberScriptBehaviorConfig): void;
  min?: number;
  max?: number;
}

export function NumberScriptBehaviorOption({ config, onChange, min, max }: Props) {
  const handlePushItemClick = () =>
    onChange({ ...config, script: [...config.script, { ...config.script[config.script.length - 1] }] });
  console.log(config);

  return (
    <div className="script-behavior">
      <div className="script-behavior__steps-list">
        {config.script.map((item, scriptIndex) => {
          const isDisabled = scriptIndex === config.script.length - 1 || scriptIndex === 0;

          const handleTimeChange = (time: number) => {
            const newScript = config.script.reduce<ScriptTimeConfig<number>>((result, item, i) => {
              if (scriptIndex === i) {
                result.push({ time, value: item.value });
              } else {
                result.push(item);
              }

              return result;
            }, []);

            onChange({ ...config, script: newScript });
          };

          const handleValueChange = (v: number) => {
            const newScript = config.script.reduce<ScriptTimeConfig<number>>((result, item, i) => {
              if (scriptIndex === i) {
                result.push({ time: item.time, value: v });
              } else {
                result.push(item);
              }

              return result;
            }, []);

            onChange({ ...config, script: newScript });
          };

          const handleDropItemClick = () =>
            onChange({ ...config, script: config.script.filter((_, n) => scriptIndex !== n) });

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

      <SymbolButton onClick={handlePushItemClick} className="script-behavior__add-button">
        +
      </SymbolButton>

      {config.isInterpolate !== undefined && (
        <BooleanValue
          label="Interpolate"
          checked={config.isInterpolate}
          onChange={(v) => onChange({ ...config, isInterpolate: v })}
        />
      )}
    </div>
  );
}
