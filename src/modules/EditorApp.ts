// import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";
import { injected } from "brandi";
import {
  AlphaBehaviorConfig,
  ParticleBehaviorConfig,
  ParticleFlux,
  RotationBehaviorConfig,
  ScaleBehaviorConfig,
  SpeedBehaviorConfig,
} from "particle-flux";
import {
  Application,
  Assets,
  Container,
  ContainerChild,
  FederatedPointerEvent,
  Graphics,
  Point,
  Sprite,
  Texture,
} from "pixi.js";
import { DI_TOKENS } from "src/di/di.tokens";
import { BehaviorStore } from "src/stores/BehaviorStore";
import { ColorBehaviorStore } from "src/stores/ColorBehaviorStore/ColorBehaviorStore";
import { DirectionBehaviorStore } from "src/stores/DirectionBehaviorStore/DirectionBehaviorStore";
// import { AdvancedBloomFilterConfig, AdvancedBloomFilterConfigOptions } from "src/services/AdvancedBloomFilterConfig";
import { EmitterConfigStore } from "src/stores/EmitterConfigStore";
import { GravityBehaviorStore } from "src/stores/GravityBehaviorStore/GravityBehaviorStore";
import { LifetimeBehaviorStore } from "src/stores/LifetimeBehaviorStore/LifetimeBehaviorStore";
import { PathBehaviorStore } from "src/stores/PathBehaviorStore/PathBehaviorStore";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";

export class EditorApp {
  private app: Application;
  private rootContainer: Container;
  // private bloomFilter: AdvancedBloomFilter;
  private particlesEmitter: ParticleFlux;
  private behaviorConfig: ParticleBehaviorConfig;

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
    private readonly pathBehaviorStore: PathBehaviorStore,
    private readonly texturesStore: TexturesStore // private readonly advancedBloomFilterConfig: AdvancedBloomFilterConfig
  ) {
    this.behaviorConfig = {
      lifeTime: {
        value: 1000,
      },
    };
  }

  private initBehaviorConfig(): void {
    this.behaviorConfig.alpha = this.alphaBehaviorStore.getActiveConfig() as AlphaBehaviorConfig;
    this.behaviorConfig.speed = this.speedBehaviorStore.getActiveConfig() as SpeedBehaviorConfig;
    this.behaviorConfig.scale = this.scaleBehaviorStore.getActiveConfig() as ScaleBehaviorConfig;
    this.behaviorConfig.spawnShape = this.spawnShapeBehaviorStore.getActiveConfig();
    this.behaviorConfig.color = this.colorBehaviorStore.getActiveConfig();
    this.behaviorConfig.lifeTime = this.lifetimeBehaviorStore.getState();
    this.behaviorConfig.direction = this.directionBehaviorStore.getActiveConfig();
    this.behaviorConfig.rotation = this.rotationBehaviorStore.getActiveConfig() as RotationBehaviorConfig;
    this.behaviorConfig.gravity = this.gravityBehaviorStore.getActiveConfig();
    this.behaviorConfig.path = this.pathBehaviorStore.getActiveConfig();
  }

  public subscribe(): void {
    this.alphaBehaviorStore.subscribe(() => {
      this.particlesEmitter.config.alpha = this.alphaBehaviorStore.getActiveConfig() as AlphaBehaviorConfig;
    });
    this.speedBehaviorStore.subscribe(() => {
      this.particlesEmitter.config.speed = this.alphaBehaviorStore.getActiveConfig() as SpeedBehaviorConfig;
    });
    this.scaleBehaviorStore.subscribe(() => {
      this.particlesEmitter.config.scale = this.alphaBehaviorStore.getActiveConfig();
    });
    this.spawnShapeBehaviorStore.subscribe(() => {
      this.particlesEmitter.config.spawnShape = this.spawnShapeBehaviorStore.getActiveConfig();
    });
    this.colorBehaviorStore.subscribe(() => {
      this.particlesEmitter.config.color = this.colorBehaviorStore.getActiveConfig();
    });
    this.lifetimeBehaviorStore.subscribe(() => {
      this.particlesEmitter.config.lifeTime = this.lifetimeBehaviorStore.getState();
    });
    this.directionBehaviorStore.subscribe(() => {
      this.particlesEmitter.config.direction = this.directionBehaviorStore.getActiveConfig();
    });
    this.rotationBehaviorStore.subscribe(() => {
      this.particlesEmitter.config.rotation = this.rotationBehaviorStore.getActiveConfig() as RotationBehaviorConfig;
    });
    this.gravityBehaviorStore.subscribe(() => {
      this.particlesEmitter.config.gravity = this.gravityBehaviorStore.getActiveConfig();
    });
    this.emitterConfigStore.subscribe(() => {
      const config = this.emitterConfigStore.getState();
      this.particlesEmitter.config.spawnInterval = config.spawnInterval;
      this.particlesEmitter.config.spawnParticlesPerWave = config.spawnParticlesPerWave;
      this.particlesEmitter.config.maxParticles = config.maxParticles;
      this.particlesEmitter.config.spawnChance = config.spawnChance;
    });
    this.texturesStore.subscribe(() => {
      this.particlesEmitter.config.view = this.texturesStore
        .getTextureList()
        .map((t) => () => this.createParticle(Texture.from(t.url)));
    });
  }

  public async init(containerNode: HTMLElement) {
    const { width: widthContainer, height: heightContainer } = containerNode.getBoundingClientRect();

    this.app = new Application();

    await Assets.load(TexturesStore.defaultParticle.url);

    await this.app.init({
      background: "#475b60",
      width: widthContainer,
      height: heightContainer,
    });

    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;

    containerNode.appendChild(this.app.canvas);

    this.rootContainer = this.app.stage;
    const background = new Graphics().rect(0, 0, widthContainer, heightContainer).fill({ color: 0x465760 });

    background.interactive = true;
    background.cursor = "pointer";

    this.rootContainer.addChild(background);

    background.on("pointermove", this.handlePointerMove);
    background.on("pointerleave", this.handlePointerLeave);

    this.behaviorConfig.spawnPosition = {
      x: widthContainer / 2,
      y: heightContainer / 2,
    };

    this.initBehaviorConfig();

    this.particlesEmitter = new ParticleFlux<ContainerChild>(
      this.rootContainer,
      this.texturesStore.getTextureList().map((t) => () => this.createParticle(Texture.from(t.url))),
      {
        emitterConfig: this.emitterConfigStore.getState(),
        particleBehaviorsConfig: this.behaviorConfig,
      }
    );
    console.log(this.emitterConfigStore.getState());
    console.log(this.behaviorConfig);

    this.subscribe();

    // this.bloomFilter = new AdvancedBloomFilter();

    // this.advancedBloomFilterConfig.subscribeOnConfigChange(this.applyBloomFilterOptions, true);

    // todo
    // emitterContainer.filters = [this.bloomFilter];
  }

  private createParticle(texture: Texture): Sprite {
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);

    return sprite;
  }

  private handlePointerMove = (e: FederatedPointerEvent) => {
    this.particlesEmitter.config.spawnPosition = {
      x: e.globalX,
      y: e.globalY,
    };
  };

  private handlePointerLeave = (e: FederatedPointerEvent) => {
    this.setEmitterPosByCenter();
  };

  private setEmitterPosByCenter() {
    this.particlesEmitter.config.spawnPosition = {
      x: this.app.renderer.width / 2,
      y: this.app.renderer.height / 2,
    };
  }

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
