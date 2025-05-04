import React from 'react';

import {ScriptTimeConfig} from 'particle-flux';
import {useColorBehaviorStore} from 'src/hooks/connectors';
import {NumberOption} from 'src/ui/components/NumberOption/NumberOption';
import {ColorPicker} from 'src/ui/kit/ColorPicker/ColorPicker';
import {SymbolButton} from 'src/ui/kit/SymbolButton/SymbolButton';

import s from './ColorScriptBehavior.module.css';

export function ColorScriptBehavior() {
  const store = useColorBehaviorStore();
  const config = store.getState().scriptConfig;

  return (
    <div className={s.root}>
      {config.script.map((option, key) => (
        <div key={key} className={s.option}>
          <ColorPicker
            color={option.value as string}
            onChange={(v) => {
              option.value = v;
              const script = config.script as ScriptTimeConfig<string>;
              store.setScriptConfig({script: [...script]});
            }}
            className={s.colorPicker}
          />
          <NumberOption
            value={option.time}
            text="Time"
            min={0}
            max={1}
            onBlur={(v) => {
              option.time = v;
              const script = config.script as ScriptTimeConfig<string>;
              store.setScriptConfig({script: [...script]});
            }}
            className={s.numberOption}
          />
          <SymbolButton
            onClick={() =>
              store.setScriptConfig({
                script: config.script.filter((item, n) => key !== n) as ScriptTimeConfig<string>,
              })
            }
            disabled={key === config.script.length - 1 || key === 0}
          >
            -
          </SymbolButton>
        </div>
      ))}

      <SymbolButton
        onClick={() => {
          const script = config.script as ScriptTimeConfig<string>;
          store.setScriptConfig({script: [...script, {...script[config.script.length - 1]}]});
        }}
      >
        +
      </SymbolButton>
    </div>
  );
}
