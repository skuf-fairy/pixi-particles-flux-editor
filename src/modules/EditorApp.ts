// import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";
import { injected } from "brandi";
import { ParticleBehaviorConfig, ParticleFlux, ParticleLifeTimeBehaviorConfig, SpawnShapeType } from "particle-flux";
import { Application, Assets, Container, FederatedPointerEvent, Graphics, Point, Sprite, Texture } from "pixi.js";
import { DI_TOKENS } from "src/di/di.tokens";
import { AlphaBehaviorStore } from "src/services/AlphaBehaviorStore/AlphaBehaviorStore";
import { ColorBehaviorStore } from "src/services/ColorBehaviorStore/ColorBehaviorStore";
import { DirectionBehaviorStore } from "src/services/DirectionBehaviorStore/DirectionBehaviorStore";
// import { AdvancedBloomFilterConfig, AdvancedBloomFilterConfigOptions } from "src/services/AdvancedBloomFilterConfig";
import { EmitterConfigStore } from "src/services/EmitterConfigStore";
import { GravityBehaviorStore } from "src/services/GravityBehaviorStore/GravityBehaviorStore";
import { LifetimeBehaviorStore } from "src/services/LifetimeBehaviorStore/LifetimeBehaviorStore";
import { PathBehaviorStore } from "src/services/PathBehaviorStore/PathBehaviorStore";
import { RotationBehaviorStore } from "src/services/RotationBehaviorStore/RotationBehaviorStore";
import { ScaleBehaviorStore } from "src/services/ScaleBehaviorStore/ScaleBehaviorStore";
import { SpawnShapeBehaviorStore } from "src/services/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { SpeedBehaviorStore } from "src/services/SpeedBehaviorStore/SpeedBehaviorStore";
import { TexturesStore } from "src/services/TexturesStore/TexturesStore";

export class EditorApp {
  private app: Application;
  private rootContainer: Container;
  // private bloomFilter: AdvancedBloomFilter;
  private particlesEmitter: ParticleFlux;
  private behaviorConfig: ParticleLifeTimeBehaviorConfig;

  constructor(
    private readonly emitterConfigStore: EmitterConfigStore,
    private readonly alphaBehaviorStore: AlphaBehaviorStore,
    private readonly scaleBehaviorStore: ScaleBehaviorStore,
    private readonly speedBehaviorStore: SpeedBehaviorStore,
    private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore,
    private readonly colorBehaviorStore: ColorBehaviorStore,
    private readonly lifetimeBehaviorStore: LifetimeBehaviorStore,
    private readonly directionBehaviorStore: DirectionBehaviorStore,
    private readonly rotationBehaviorStore: RotationBehaviorStore,
    private readonly gravityBehaviorStore: GravityBehaviorStore,
    private readonly pathBehaviorStore: PathBehaviorStore,
    private readonly texturesStore: TexturesStore // private readonly advancedBloomFilterConfig: AdvancedBloomFilterConfig
  ) {
    this.behaviorConfig = {
      lifeTime: {
        value: 1000,
      },
    };

    this.behaviorConfig.alpha = this.alphaBehaviorStore.getActiveConfig();
    this.behaviorConfig.speed = this.speedBehaviorStore.getActiveConfig();
    // this.behaviorConfig.scale = this.scaleBehaviorStore.getActiveConfig();
    this.behaviorConfig.spawnShape = this.spawnShapeBehaviorStore.getActiveConfig();
    this.behaviorConfig.color = this.colorBehaviorStore.getActiveConfig();
    this.behaviorConfig.lifeTime = this.lifetimeBehaviorStore.getState();
    this.behaviorConfig.direction = this.directionBehaviorStore.getActiveConfig();
    this.behaviorConfig.rotation = this.rotationBehaviorStore.getActiveConfig();
    this.behaviorConfig.gravity = this.gravityBehaviorStore.getActiveConfig();
    // todo
    // this.state.path = this.pathBehaviorStore.getState()

    this.alphaBehaviorStore.subscribe(() => {
      this.behaviorConfig = {
        ...this.behaviorConfig,
        alpha: this.alphaBehaviorStore.getActiveConfig(),
      };

      this.updateParticleFlux();
    });

    this.speedBehaviorStore.subscribe(() => {
      this.behaviorConfig = {
        ...this.behaviorConfig,
        speed: this.speedBehaviorStore.getActiveConfig(),
      };

      this.updateParticleFlux();
    });
    this.scaleBehaviorStore.subscribe(() => {
      this.behaviorConfig = {
        ...this.behaviorConfig,
        scale: this.scaleBehaviorStore.getActiveConfig(),
      };

      this.updateParticleFlux();
    });
    this.spawnShapeBehaviorStore.subscribe(() => {
      this.behaviorConfig = {
        ...this.behaviorConfig,
        spawnShape: this.spawnShapeBehaviorStore.getActiveConfig(),
      };

      this.updateParticleFlux();
    });
    this.colorBehaviorStore.subscribe(() => {
      this.behaviorConfig = {
        ...this.behaviorConfig,
        color: this.colorBehaviorStore.getActiveConfig(),
      };

      this.updateParticleFlux();
    });
    this.lifetimeBehaviorStore.subscribe(() => {
      this.behaviorConfig = {
        ...this.behaviorConfig,
        lifeTime: this.lifetimeBehaviorStore.getState(),
      };

      this.updateParticleFlux();
    });
    this.directionBehaviorStore.subscribe(() => {
      this.behaviorConfig = {
        ...this.behaviorConfig,
        direction: this.directionBehaviorStore.getActiveConfig(),
      };

      this.updateParticleFlux();
    });
    this.rotationBehaviorStore.subscribe(() => {
      this.behaviorConfig = {
        ...this.behaviorConfig,
        rotation: this.rotationBehaviorStore.getActiveConfig(),
      };
    });
    this.gravityBehaviorStore.subscribe(() => {
      this.behaviorConfig = {
        ...this.behaviorConfig,
        gravity: this.gravityBehaviorStore.getActiveConfig(),
      };

      this.updateParticleFlux();
    });
  }

  public async init(containerNode: HTMLElement) {
    const { width: widthContainer, height: heightContainer } = containerNode.getBoundingClientRect();

    this.app = new Application();

    await Assets.load(TexturesStore.defaultParticle.url);
    this.texturesStore.add(TexturesStore.defaultParticle);

    await this.app.init({
      background: "#465760",
      width: widthContainer,
      height: heightContainer,
    });

    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;

    containerNode.appendChild(this.app.canvas);

    this.rootContainer = this.app.stage;

    // background.interactive = true;
    // background.cursor = "pointer";

    // todo
    // background.on("pointermove", this.handlePointerMove);
    // background.on("pointerleave", this.handlePointerLeave);

    this.behaviorConfig.spawnPosition = {
      x: widthContainer / 2,
      y: heightContainer / 2,
    };

    this.particlesEmitter = new ParticleFlux(
      this.rootContainer,
      this.texturesStore.getTextureList().map((t) => () => this.createParticle(Texture.from(t.url))),
      {
        emitterConfig: this.emitterConfigStore.getState(),
        particleBehaviorsConfig: this.behaviorConfig,
      }
    );

    // this.bloomFilter = new AdvancedBloomFilter();

    // this.advancedBloomFilterConfig.subscribeOnConfigChange(this.applyBloomFilterOptions, true);

    // todo
    // emitterContainer.filters = [this.bloomFilter];
  }

  private createParticle(texture: Texture): Sprite {
    const sprite = new Sprite(texture);

    return sprite;
  }

  private updateParticleFlux(): void {
    this.particlesEmitter.stopEmit();

    this.particlesEmitter = new ParticleFlux(
      this.rootContainer,
      this.texturesStore.getTextureList().map((t) => () => this.createParticle(Texture.from(t.url))),
      {
        emitterConfig: this.emitterConfigStore.getState(),
        particleBehaviorsConfig: this.behaviorConfig,
      }
    );
  }

  // private handlePointerMove = (e: FederatedPointerEvent) => {
  //   this.particlesEmitter.spawnPos.x = e.globalX;
  //   this.particlesEmitter.spawnPos.y = e.globalY;
  // };

  // private handlePointerLeave = (e: FederatedPointerEvent) => {
  //   this.setEmitterPosByCenter();
  // };

  // private setEmitterPosByCenter() {
  //   this.particlesEmitter.spawnPos.x = this.app.renderer.width / 2;
  //   this.particlesEmitter.spawnPos.y = this.app.renderer.height / 2;
  // }

  // private applyEmitterConfig = (config: EmitterConfigV3) => {
  //   this.particlesEmitter.init(config);
  //   this.particlesEmitter.autoUpdate = true;
  //   this.setEmitterPosByCenter();
  // };

  ///todo
  // private applyBloomFilterOptions = (options: AdvancedBloomFilterConfigOptions) => {
  //   console.log(options);
  //   // this.bloomFilter.enabled = options.enabled;
  //   this.bloomFilter.blur = options.blur;
  //   this.bloomFilter.brightness = options.brightness;
  //   this.bloomFilter.threshold = options.threshold;
  //   this.bloomFilter.bloomScale = options.bloomScale;
  //   // this.bloomFilter.kernels = options.kernels;
  //   this.bloomFilter.quality = options.quality;
  //   // todo
  //   // this.bloomFilter.blendMode = options.blendMode;
  // };

  public destroy() {
    this.app.destroy();
  }
}

injected(
  EditorApp,
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
  DI_TOKENS.pathBehaviorStore,
  DI_TOKENS.texturesStore
);
