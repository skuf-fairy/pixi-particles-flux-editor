import { isRangeValue } from "particle-flux";
import React from "react";
import { useEmitterConfigStore } from "src/hooks/connectors";
import { FieldsGrid } from "src/ui/components/FieldsGrid/FieldsGrid";
import { NumberOption } from "../../NumberOption/NumberOption";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { IntervalRangeValue } from "./IntervalRangeValue";

export function Properties() {
  const emitterConfigStore = useEmitterConfigStore();
  const state = emitterConfigStore.getState();

  return (
    <ItemContainer>
      <FieldsGrid>
        {state.spawnInterval !== undefined && typeof state.spawnInterval === "number" && (
          <NumberOption
            value={state.spawnInterval}
            text="Spawn interval"
            onBlur={(v) => emitterConfigStore.setState({ ...state, spawnInterval: v })}
          />
        )}
        {state.spawnInterval !== undefined && isRangeValue(state.spawnInterval) && (
          <IntervalRangeValue
            interval={state.spawnInterval}
            onChange={(v) => emitterConfigStore.setState({ ...state, spawnInterval: v })}
          />
        )}
        {state.spawnTime !== undefined && (
          <NumberOption
            value={state.spawnTime}
            text="Spawn time"
            onBlur={(v) => emitterConfigStore.setState({ ...state, spawnTime: v })}
          />
        )}
        {state.spawnTimeout !== undefined && (
          <NumberOption
            value={state.spawnTimeout}
            text="Spawn timeout"
            onBlur={(v) => emitterConfigStore.setState({ ...state, spawnTimeout: v })}
          />
        )}
        {state.spawnParticlesPerWave !== undefined && (
          <NumberOption
            value={state.spawnParticlesPerWave}
            text="Particles per wave"
            onBlur={(v) => emitterConfigStore.setState({ ...state, spawnParticlesPerWave: v })}
          />
        )}
        {state.maxParticles !== undefined && (
          <NumberOption
            value={state.maxParticles}
            text="Max particles"
            onBlur={(v) => emitterConfigStore.setState({ ...state, maxParticles: v })}
          />
        )}
        {state.spawnChance !== undefined && (
          <NumberOption
            value={state.spawnChance}
            text="Spawn chance"
            onBlur={(v) => emitterConfigStore.setState({ ...state, spawnChance: v })}
          />
        )}
      </FieldsGrid>
    </ItemContainer>
  );
}
