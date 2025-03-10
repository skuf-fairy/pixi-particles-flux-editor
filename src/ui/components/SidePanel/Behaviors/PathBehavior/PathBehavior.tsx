import React from "react";
import { usePathBehaviorStore } from "src/hooks/connectors";
import { InputString } from "src/ui/kit/Input/InputString";
import { BehaviorHeader } from "../../BehaviorHeader/BehaviorHeader";
import { BehaviorName } from "../../BehaviorName/BehaviorName";
import { ItemContainer } from "../../ItemContainer/ItemContainer";

export function PathBehavior() {
  const store = usePathBehaviorStore();
  const path = store.getPath();

  return (
    <ItemContainer>
      <BehaviorHeader
        left={
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
        }
        right={null}
      />

      <InputString value={path} onChange={(v) => store.setPath(v)} />
    </ItemContainer>
  );
}
