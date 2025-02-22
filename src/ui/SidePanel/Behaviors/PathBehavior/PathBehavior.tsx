import { Input } from "antd";
import React from "react";
import { usePathBehaviorStore } from "src/hooks/usePathBehaviorStore";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function PathBehavior() {
  const store = usePathBehaviorStore();
  const path = store.getPath();

  return (
    <ItemContainer>
      <BehaviorName
        name="Path"
        isEnabled={store.isEnabled()}
        onEnabledChange={(isEnabled: boolean) => {
          if (isEnabled) {
            store.enable();
          } else {
            store.disable();
          }
        }}
      />

      <Input value={path} onChange={(v) => store.setPath(v.target.value)} />
    </ItemContainer>
  );
}
