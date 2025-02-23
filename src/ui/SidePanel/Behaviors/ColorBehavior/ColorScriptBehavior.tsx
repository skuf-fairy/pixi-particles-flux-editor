import { Space } from "antd";
import React from "react";
import { useColorBehaviorStore } from "src/hooks/useColorBehaviorStore";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";
import { Button, ButtonSize } from "src/ui/kit/Button/Button";
import { ColorPicker } from "src/ui/kit/ColorPicker/ColorPicker";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";

export function ColorScriptBehavior() {
  const store = useColorBehaviorStore();
  const config = store.getState().scriptConfig;

  return (
    <Space direction="vertical" align="start">
      {config.script.map((option, key) => (
        <Space key={key} direction="horizontal" align="end">
          <ColorPicker
            color={option.value}
            onChange={(v) => {
              option.value = v;
              store.setScriptBehaviorConfig({ script: [...config.script] });
            }}
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
          />
          <Button
            size={ButtonSize.Small}
            onClick={() =>
              store.setScriptBehaviorConfig({
                script: config.script.filter((item, n) => key !== n),
              })
            }
            disabled={key === config.script.length - 1 || key === 0}
          >
            <Typography variant={TypographyVariant.P}>-</Typography>
          </Button>
        </Space>
      ))}

      <Button
        size={ButtonSize.Small}
        onClick={() =>
          store.setScriptBehaviorConfig({ script: [...config.script, { ...config.script[config.script.length - 1] }] })
        }
      >
        <Typography variant={TypographyVariant.P}>+</Typography>
      </Button>
    </Space>
  );
}
