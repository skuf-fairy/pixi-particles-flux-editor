import React from "react";
import { usePathBehaviorStore } from "src/hooks/usePathBehaviorStore";
import { InputString } from "src/ui/kit/Input/InputString";
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

      <InputString value={path} onChange={(v) => store.setPath(v)} />
    </ItemContainer>
  );
}
