import { Button, ColorPicker, Space, Typography } from "antd";
import React from "react";
import { useColorBehaviorStore } from "src/hooks/useColorBehaviorStore";
import { NumberOption } from "src/ui/components/NumberOption/NumberOption";

export function ColorScriptBehavior() {
  const store = useColorBehaviorStore();
  const config = store.getState().scriptConfig;

  return (
    <Space direction="vertical" align="start">
      {config.script.map((option, key) => (
        <Space key={key} direction="horizontal" align="end">
          <ColorPicker
            value={option.value}
            size="large"
            onChange={(v) => {
              option.value = v.toHexString();
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
            type="default"
            onClick={() =>
              store.setScriptBehaviorConfig({
                script: config.script.filter((item, n) => key !== n),
              })
            }
            disabled={key === config.script.length - 1 || key === 0}
          >
            <Typography.Text>-</Typography.Text>
          </Button>
        </Space>
      ))}

      <Button
        type="primary"
        onClick={() =>
          store.setScriptBehaviorConfig({ script: [...config.script, { ...config.script[config.script.length - 1] }] })
        }
      >
        <Typography.Text>+</Typography.Text>
      </Button>
    </Space>
  );
}
