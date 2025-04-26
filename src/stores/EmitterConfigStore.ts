import { EmitterConfig, RangeValue, isRangeValue } from "particle-flux";
import { Store } from "./Store";

export enum NumberValueType {
  Static = "Static",
  Range = "Range",
}

interface EmitterConfigStoreState {
  spawnIntervalStatic: number;
  spawnIntervalRange: RangeValue;
  spawnIntervalType: NumberValueType;
  spawnTime: number;
  spawnTimeout: number;
  maxParticles: number;
  spawnParticlesPerWave: number;
  spawnChance: number;
}

export class EmitterConfigStore extends Store<EmitterConfigStoreState> {
  constructor() {
    super({
      spawnIntervalStatic: 250,
      spawnIntervalRange: {
        min: 250,
        max: 500,
      },
      spawnIntervalType: NumberValueType.Static,
      spawnParticlesPerWave: 1,
      maxParticles: 500,
      spawnChance: 100,
      spawnTimeout: 0,
      spawnTime: 0,
    });
  }

  public restore(config: EmitterConfig): void {
    this.reset();

    const { spawnChance, spawnParticlesPerWave, maxParticles, spawnInterval, spawnTime, spawnTimeout } = config;

    if (spawnInterval) {
      if (isRangeValue(spawnInterval)) {
        this.setValue("spawnIntervalRange", spawnInterval);
        this.setValue("spawnIntervalType", NumberValueType.Range);
      } else {
        this.setValue("spawnIntervalStatic", spawnInterval);
        this.setValue("spawnIntervalType", NumberValueType.Static);
      }
    }

    if (spawnChance !== undefined) {
      this.setValue("spawnChance", spawnChance);
    }

    if (spawnParticlesPerWave !== undefined) {
      this.setValue("spawnParticlesPerWave", spawnParticlesPerWave);
    }

    if (maxParticles !== undefined) {
      this.setValue("maxParticles", maxParticles);
    }

    if (spawnTime !== undefined) {
      this.setValue("spawnTime", spawnTime);
    }

    if (spawnTimeout !== undefined) {
      this.setValue("spawnTimeout", spawnTimeout);
    }
  }

  public setActiveSpawnType(type: NumberValueType): void {
    this.setValue("spawnIntervalType", type);
  }

  public getSpawnIntervalType(): NumberValueType {
    return this.state.spawnIntervalType;
  }

  public getSpawnIntervalRange(): RangeValue {
    return this.state.spawnIntervalRange;
  }

  public getSpawnIntervalStatic(): number {
    return this.state.spawnIntervalStatic;
  }

  public setSpawnInterval(spawnInterval: RangeValue | number): void {
    if (isRangeValue(spawnInterval)) {
      this.setState({
        ...this.state,
        spawnIntervalRange: spawnInterval,
      });
    } else {
      this.setState({
        ...this.state,
        spawnIntervalStatic: spawnInterval,
      });
    }
  }

  public getConfig(): EmitterConfig {
    const { spawnIntervalStatic, spawnIntervalRange, spawnIntervalType, ...rest } = this.state;

    if (spawnIntervalType === NumberValueType.Static) {
      return {
        ...rest,
        spawnInterval: spawnIntervalStatic,
      };
    }
    return {
      ...rest,
      spawnInterval: spawnIntervalRange,
    };
  }
}
