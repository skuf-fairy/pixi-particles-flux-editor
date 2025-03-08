import { injected } from "brandi";
import {
  AlphaBehaviorConfig,
  ParticleFluxConfig,
  RotationBehaviorConfig,
  ScaleBehaviorConfig,
  SpeedBehaviorConfig,
} from "particle-flux";
import { SpawnPositionBehaviorConfig } from "particle-flux/lib/behaviors/SpawnPositionBehavior/SpawnPositionBehavior.types";
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

export class ParticleFluxConfigStore extends Store<ParticleFluxConfig> {
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
      particleBehaviorsConfig: {
        lifeTime: {
          value: 1000,
        },
      },
    });

    const emitterConfig = this.emitterConfigStore.getState();
    this.state.emitterConfig.spawnInterval = emitterConfig.spawnInterval;
    this.state.emitterConfig.spawnParticlesPerWave = emitterConfig.spawnParticlesPerWave;
    this.state.emitterConfig.maxParticles = emitterConfig.maxParticles;
    this.state.emitterConfig.spawnChance = emitterConfig.spawnChance;

    this.state.particleBehaviorsConfig.alpha = this.alphaBehaviorStore.getActiveConfig() as AlphaBehaviorConfig;
    this.state.particleBehaviorsConfig.speed = this.speedBehaviorStore.getActiveConfig() as SpeedBehaviorConfig;
    this.state.particleBehaviorsConfig.scale = this.scaleBehaviorStore.getActiveConfig() as ScaleBehaviorConfig;
    this.state.particleBehaviorsConfig.spawnShape = this.spawnShapeBehaviorStore.getActiveConfig();
    this.state.particleBehaviorsConfig.color = this.colorBehaviorStore.getActiveConfig();
    this.state.particleBehaviorsConfig.lifeTime = this.lifetimeBehaviorStore.getActiveConfig();
    this.state.particleBehaviorsConfig.direction = this.directionBehaviorStore.getActiveConfig();
    this.state.particleBehaviorsConfig.rotation =
      this.rotationBehaviorStore.getActiveConfig() as RotationBehaviorConfig;
    this.state.particleBehaviorsConfig.gravity = this.gravityBehaviorStore.getActiveConfig();
    this.state.particleBehaviorsConfig.path = this.pathBehaviorStore.getActiveConfig();

    this.alphaBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleBehaviorsConfig: {
          ...this.state.particleBehaviorsConfig,
          alpha: this.alphaBehaviorStore.getActiveConfig() as AlphaBehaviorConfig,
        },
      });
    });
    this.speedBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleBehaviorsConfig: {
          ...this.state.particleBehaviorsConfig,
          speed: this.speedBehaviorStore.getActiveConfig() as AlphaBehaviorConfig,
        },
      });
    });
    this.scaleBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleBehaviorsConfig: {
          ...this.state.particleBehaviorsConfig,
          scale: this.scaleBehaviorStore.getActiveConfig() as AlphaBehaviorConfig,
        },
      });
    });
    this.spawnShapeBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleBehaviorsConfig: {
          ...this.state.particleBehaviorsConfig,
          spawnShape: this.spawnShapeBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.colorBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleBehaviorsConfig: {
          ...this.state.particleBehaviorsConfig,
          color: this.colorBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.lifetimeBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleBehaviorsConfig: {
          ...this.state.particleBehaviorsConfig,
          lifeTime: this.lifetimeBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.directionBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleBehaviorsConfig: {
          ...this.state.particleBehaviorsConfig,
          direction: this.directionBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.rotationBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleBehaviorsConfig: {
          ...this.state.particleBehaviorsConfig,
          rotation: this.rotationBehaviorStore.getActiveConfig() as RotationBehaviorConfig,
        },
      });
    });
    this.gravityBehaviorStore.subscribe(() => {
      this.setState({
        ...this.state,
        particleBehaviorsConfig: {
          ...this.state.particleBehaviorsConfig,
          gravity: this.gravityBehaviorStore.getActiveConfig(),
        },
      });
    });
    this.emitterConfigStore.subscribe(() => {
      this.setState({
        ...this.state,
        emitterConfig: this.emitterConfigStore.getState(),
      });
    });
  }

  public setSpawnPosition(position: SpawnPositionBehaviorConfig): void {
    this.setState({
      ...this.state,
      particleBehaviorsConfig: {
        ...this.state.particleBehaviorsConfig,
        spawnPosition: position,
      },
    });
  }

  public reset(): void {
    super.reset();

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

  public restore(config: ParticleFluxConfig): void {
    this.emitterConfigStore.restore(config.emitterConfig);

    const { alpha, color, direction, gravity, lifeTime, path, rotation, scale, spawnPosition, spawnShape, speed } =
      config.particleBehaviorsConfig;

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
    }

    if (spawnPosition) {
      // todo
      // this.spawnShapeBehaviorStore.restore(config.particleBehaviorsConfig.scale);
    }

    if (spawnShape) {
      this.spawnShapeBehaviorStore.restore(spawnShape);
    }

    if (speed) {
      this.speedBehaviorStore.restore(speed);
    }
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
