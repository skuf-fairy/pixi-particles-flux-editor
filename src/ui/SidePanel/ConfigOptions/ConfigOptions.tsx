import { Button, Space, Typography } from "antd";
import React from "react";
import { ItemContainer } from "../ItemContainer/ItemContainer";

export function ConfigOptions() {
  return (
    <ItemContainer>
      <Space direction="horizontal">
        <Button type="default" onClick={() => {}}>
          <Typography.Text>Restore</Typography.Text>
        </Button>
        <Button type="default" onClick={() => {}}>
          <Typography.Text>Download</Typography.Text>
        </Button>
      </Space>
    </ItemContainer>
  );
}
