import { Space } from "antd";
import React from "react";
import { Button } from "src/ui/kit/Button/Button";
import { ItemContainer } from "../ItemContainer/ItemContainer";

export function ConfigOptions() {
  return (
    <ItemContainer>
      <Space direction="horizontal">
        <Button onClick={() => {}}>Restore</Button>
        <Button onClick={() => {}}>Download</Button>
      </Space>
    </ItemContainer>
  );
}
