import { Button, Space, Typography } from "antd";
import { TimeScriptConfig } from "particle-flux";
import React from "react";
import { NumberOption } from "../../components/NumberOption/NumberOption";
import "./ScriptBehaviorOption.style.scss";

interface Props {
  script: TimeScriptConfig<number>;
  onChange(options: TimeScriptConfig<number>): void;
}

export function ScriptBehaviorOption({ script, onChange }: Props) {
  console.log(script);
  return (
    <Space direction="vertical">
      {script.map((item, key) => (
        <Space key={key} direction="horizontal" align="end">
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
          <Button
            type="default"
            onClick={() => onChange(script.filter((item, n) => key !== n))}
            disabled={key === script.length - 1 || key === 0}
          >
            <Typography.Text>-</Typography.Text>
          </Button>
        </Space>
      ))}

      <Button type="primary" onClick={() => onChange([...script, { ...script[script.length - 1] }])}>
        <Typography.Text>+</Typography.Text>
      </Button>
    </Space>
  );
}
