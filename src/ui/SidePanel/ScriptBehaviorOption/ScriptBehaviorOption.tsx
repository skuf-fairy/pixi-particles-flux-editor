import { Space } from "antd";
import { TimeScriptConfig } from "particle-flux";
import React from "react";
import { Button, ButtonSize } from "src/ui/kit/Button/Button";
import { Typography, TypographyVariant } from "src/ui/kit/Typography/Typography";
import { NumberOption } from "../../components/NumberOption/NumberOption";
import "./ScriptBehaviorOption.style.scss";

interface Props {
  script: TimeScriptConfig<number>;
  onChange(options: TimeScriptConfig<number>): void;
}

export function ScriptBehaviorOption({ script, onChange }: Props) {
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
            size={ButtonSize.Small}
            onClick={() => onChange(script.filter((item, n) => key !== n))}
            disabled={key === script.length - 1 || key === 0}
          >
            <Typography variant={TypographyVariant.P}>-</Typography>
          </Button>
        </Space>
      ))}

      <Button size={ButtonSize.Small} onClick={() => onChange([...script, { ...script[script.length - 1] }])}>
        <Typography variant={TypographyVariant.P}>+</Typography>
      </Button>
    </Space>
  );
}
