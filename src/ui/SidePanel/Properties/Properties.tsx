import { isRangeValue } from "particle-flux";
import React from "react";
import { useEmitterConfigStore } from "src/hooks/useEmitterConfigStore";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "../../components/NumberOption/NumberOption";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { IntervalRangeValue } from "./IntervalRangeValue";

export function Properties() {
  const emitterConfigStore = useEmitterConfigStore();
  const state = emitterConfigStore.getState();

  return (
    <ItemContainer>
      <FieldsGrid columns={3}>
        {/* {state.spawnTime !== undefined && (
          <NumberOption
            value={state.spawnTime}
            text="Spawn time"
            onChange={(v) => emitterConfigStore.setState({ ...state, spawnTime: v })}
          />
        )} */}
        {state.spawnInterval !== undefined && typeof state.spawnInterval === "number" && (
          <NumberOption
            value={state.spawnInterval}
            text="Spawn interval"
            onChange={(v) => emitterConfigStore.setState({ ...state, spawnInterval: v })}
          />
        )}
        {state.spawnInterval !== undefined && isRangeValue(state.spawnInterval) && (
          <IntervalRangeValue
            interval={state.spawnInterval}
            onChange={(v) => emitterConfigStore.setState({ ...state, spawnInterval: v })}
          />
        )}
        {state.spawnParticlesPerWave !== undefined && (
          <NumberOption
            value={state.spawnParticlesPerWave}
            text="Particles per wave"
            onChange={(v) => emitterConfigStore.setState({ ...state, spawnParticlesPerWave: v })}
          />
        )}
        {state.maxParticles !== undefined && (
          <NumberOption
            value={state.maxParticles}
            text="Max particles"
            onChange={(v) => emitterConfigStore.setState({ ...state, maxParticles: v })}
          />
        )}
        {state.spawnChance !== undefined && (
          <NumberOption
            value={state.spawnChance}
            text="Spawn chance"
            onChange={(v) => emitterConfigStore.setState({ ...state, spawnChance: v })}
          />
        )}
      </FieldsGrid>
    </ItemContainer>
  );
}
