import { Select } from "antd";
import React from "react";
import { useColorBehaviorStore } from "src/hooks/useColorBehaviorStore";
import { BehaviorType } from "src/services/types";

export function ColorBehaviorTypeSelect() {
  const store = useColorBehaviorStore();
  const activeType = store.getState().activeConfig;

  return (
    <Select value={activeType} onChange={(v) => store.setActiveType(v)}>
      <Select.Option value={BehaviorType.ScalarStatic}>{BehaviorType.ScalarStatic}</Select.Option>
      <Select.Option value={BehaviorType.ScalarDynamic}>{BehaviorType.ScalarDynamic}</Select.Option>
      <Select.Option value={BehaviorType.Script}>{BehaviorType.Script}</Select.Option>
    </Select>
  );
}
