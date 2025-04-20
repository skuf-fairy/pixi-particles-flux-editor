import React from "react";
import { useEmitterConfigStore } from "src/hooks/connectors";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "../../NumberOption/NumberOption";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { SpawnIntervalProperty } from "./SpawnIntervalProperty";

export function Properties() {
  const emitterConfigStore = useEmitterConfigStore();
  const state = emitterConfigStore.getState();

  return (
    <>
      <SpawnIntervalProperty />

      <br />

      <ItemContainer>
        <FieldsGrid>
          <NumberOption
            value={state.spawnTime}
            text="Spawn time"
            onBlur={(v) => emitterConfigStore.setState({ ...state, spawnTime: v })}
          />

          <NumberOption
            value={state.spawnTimeout}
            text="Spawn timeout"
            onBlur={(v) => emitterConfigStore.setState({ ...state, spawnTimeout: v })}
          />

          <NumberOption
            value={state.spawnParticlesPerWave}
            text="Particles per wave"
            onBlur={(v) => emitterConfigStore.setState({ ...state, spawnParticlesPerWave: v })}
          />

          <NumberOption
            value={state.maxParticles}
            text="Max particles"
            onBlur={(v) => emitterConfigStore.setState({ ...state, maxParticles: v })}
          />

          <NumberOption
            value={state.spawnChance}
            text="Spawn chance"
            onBlur={(v) => emitterConfigStore.setState({ ...state, spawnChance: v })}
          />
        </FieldsGrid>
      </ItemContainer>
    </>
  );
}
