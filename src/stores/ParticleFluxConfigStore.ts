import { injected } from "brandi";
import {
  AlphaBehaviorConfig,
  ParticleEmitterConfig,
  RotationBehaviorConfig,
  ScaleBehaviorConfig,
  SpawnPositionConfig,
  SpeedBehaviorConfig,
} from "particle-flux";
import { DI_TOKENS } from "src/di/di.tokens";
import { BehaviorStore } from "./BehaviorStore";
import { ColorBehaviorStore } from "./ColorBehaviorStore/ColorBehaviorStore";
import { DirectionBehaviorStore } from "./DirectionBehaviorStore/DirectionBehaviorStore";
import { EmitterConfigStore } from "./EmitterConfigStore";
import { GravityBehaviorStore } from "./GravityBehaviorStore/GravityBehaviorStore";
import { LifetimeBehaviorStore } from "./LifetimeBehaviorStore/LifetimeBehaviorStore";
import { PathBehaviorStore } from "./PathBehaviorStore/PathBehaviorStore";
import { SpawnShapeBehaviorStore } from "./SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { Store } from "./Store";

export class ParticleFluxConfigStore extends Store<ParticleEmitterConfig> {
  constructor(
    private readonly emitterConfigStore: EmitterConfigStore,
    private readonly alphaBehaviorStore: BehaviorStore,
    private readonly scaleBehaviorStore: BehaviorStore,
    private readonly speedBehaviorStore: BehaviorStore,
    private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore,
    private readonly colorBehaviorStore: ColorBehaviorStore,
    private readonly lifetimeBehaviorStore: LifetimeBehaviorStore,
    private readonly directionBehaviorStore: DirectionBehaviorStore,
    private readonly rotationBehaviorStore: BehaviorStore,
    private readonly gravityBehaviorStore: GravityBehaviorStore,
    private readonly pathBehaviorStore: PathBehaviorStore
  ) {
    super({
      emitterConfig: {
        autoStart: true,
      },
      particleConfig: {
        lifeTime: {
          value: 1000,
        },
      },
    });

    const emitterConfig = this.emitterConfigStore.getConfig();
    this.state.emitterConfig.spawnInterval = emitterConfig.spawnInterval;
    this.state.emitterConfig.spawnParticlesPerWave = emitterConfig.spawnParticlesPerWave;
    this.state.emitterConfig.maxParticles = emitterConfig.maxParticles;
    this.state.emitterConfig.spawnChance = emitterConfig.spawnChance;

    this.state.particleConfig.alpha = this.alphaBehaviorStore.getActiveConfig() as AlphaBehaviorConfig;
    this.state.particleConfig.speed = this.speedBehaviorStore.getActiveConfig() as SpeedBehaviorConfig;
    this.state.particleConfig.scale = this.scaleBehaviorStore.getActiveConfig() as ScaleBehaviorConfig;
    this.state.particleConfig.spawnShape = this.spawnShapeBehaviorStore.getActiveConfig();
    this.state.particleConfig.color = this.colorBehaviorStore.getActiveConfig();
    this.state.particleConfig.lifeTime = this.lifetimeBehaviorStore.getActiveConfig();
    this.state.particleConfig.direction = this.directionBehaviorStore.getActiveConfig();
    this.state.particleConfig.rotation = this.rotationBehaviorStore.getActiveConfig() as RotationBehaviorConfig;
    this.state.particleConfig.gravity = this.gravityBehaviorStore.getActiveConfig();
    this.state.particleConfig.path = this.pathBehaviorStore.getActiveConfig();

    this.alphaBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleConfig: {
          ...this.state.particleConfig,
          alpha: this.alphaBehaviorStore.getActiveConfig() as AlphaBehaviorConfig,
        },
      });
    });
    this.speedBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleConfig: {
          ...this.state.particleConfig,
          speed: this.speedBehaviorStore.getActiveConfig() as AlphaBehaviorConfig,
        },
      });
    });
    this.scaleBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleConfig: {
          ...this.state.particleConfig,
          scale: this.scaleBehaviorStore.getActiveConfig() as AlphaBehaviorConfig,
        },
      });
    });
    this.spawnShapeBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleConfig: {
          ...this.state.particleConfig,
          spawnShape: this.spawnShapeBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.colorBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleConfig: {
          ...this.state.particleConfig,
          color: this.colorBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.lifetimeBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleConfig: {
          ...this.state.particleConfig,
          lifeTime: this.lifetimeBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.directionBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleConfig: {
          ...this.state.particleConfig,
          direction: this.directionBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.rotationBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleConfig: {
          ...this.state.particleConfig,
          rotation: this.rotationBehaviorStore.getActiveConfig() as RotationBehaviorConfig,
        },
      });
    });
    this.gravityBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleConfig: {
          ...this.state.particleConfig,
          gravity: this.gravityBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.emitterConfigStore.subscribe(() => {
      this.setState({
        ...this.state,
        emitterConfig: this.emitterConfigStore.getConfig(),
      });
    });
  }

  public setSpawnPosition(position: SpawnPositionConfig): void {
    this.setState({
      ...this.state,
      particleConfig: {
        ...this.state.particleConfig,
        spawnPosition: position,
      },
    });
  }

  public reset(): void {
    this.emitterConfigStore.reset();
    this.alphaBehaviorStore.reset();
    this.scaleBehaviorStore.reset();
    this.speedBehaviorStore.reset();
    this.spawnShapeBehaviorStore.reset();
    this.colorBehaviorStore.reset();
    this.lifetimeBehaviorStore.reset();
    this.directionBehaviorStore.reset();
    this.rotationBehaviorStore.reset();
    this.gravityBehaviorStore.reset();
    this.pathBehaviorStore.reset();
  }

  public restore(config: ParticleEmitterConfig): void {
    this.emitterConfigStore.restore(config.emitterConfig);

    const { alpha, color, direction, gravity, lifeTime, path, rotation, scale, spawnPosition, spawnShape, speed } =
      config.particleConfig;

    this.lifetimeBehaviorStore.restore(lifeTime);

    if (alpha) {
      this.alphaBehaviorStore.restore(alpha);
    }

    if (color) {
      this.colorBehaviorStore.restore(color);
    }

    if (direction) {
      this.directionBehaviorStore.restore(direction);
    }

    if (gravity) {
      this.gravityBehaviorStore.restore(gravity);
    }

    if (path) {
      this.pathBehaviorStore.restore(path);
    }

    if (rotation) {
      this.rotationBehaviorStore.restore(rotation);
    }

    if (scale) {
      this.scaleBehaviorStore.restore(scale);
      // todo
      // this.spawnShapeBehaviorStore.restore(config.particleConfig.scale);
    }

    if (spawnShape) {
      this.spawnShapeBehaviorStore.restore(spawnShape);
    }

    if (speed) {
      this.speedBehaviorStore.restore(speed);
    }
  }

  public getConfig(): ParticleEmitterConfig {
    return this.state;
  }
}

injected(
  ParticleFluxConfigStore,
  DI_TOKENS.emitterConfigStore,
  DI_TOKENS.alphaBehaviorStore,
  DI_TOKENS.scaleBehaviorStore,
  DI_TOKENS.speedBehaviorStore,
  DI_TOKENS.spawnShapeBehaviorStore,
  DI_TOKENS.colorBehaviorStore,
  DI_TOKENS.lifetimeBehaviorStore,
  DI_TOKENS.directionBehaviorStore,
  DI_TOKENS.rotationBehaviorStore,
  DI_TOKENS.gravityBehaviorStore,
  DI_TOKENS.pathBehaviorStore
);
