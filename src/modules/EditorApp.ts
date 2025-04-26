import { injected } from "brandi";
import { ParticleEmitter, Point2d, SpawnShapeBehavior, SpawnShapeType, isSinglePolygonalChain } from "particle-flux";
import { AdvancedBloomFilter } from "pixi-filters";
import {
  Application,
  Assets,
  Container,
  FederatedPointerEvent,
  Graphics,
  Particle,
  Point,
  Sprite,
  Texture,
} from "pixi.js";
import { DI_TOKENS } from "src/di/di.tokens";
import { AppConfigStore } from "src/stores/AppConfigStore/AppConfigStore";
import { BloomFilterConfigStore } from "src/stores/BloomFilterConfigStore/BloomFilterConfigStore";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { PerformanceStore } from "src/stores/PerfomanceStore/PerformanceStore";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { SPAWN_SHAPE_STROKE, UPDATE_PARTICLE_COUNT_INTERVAL } from "./EditorApp.constants";
import { ParticleAdapter } from "./ParticleAdapter";

export class EditorApp {
  private app: Application;
  private bloomFilter: AdvancedBloomFilter;
  private particlesEmitter: ParticleEmitter;
  private background: Graphics;
  private particlesContainer: Container;
  private spawnShape: Graphics;
  private updateInterval: number;

  constructor(
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly appConfigStore: AppConfigStore,
    private readonly texturesStore: TexturesStore,
    private readonly spawnShapeStore: SpawnShapeBehaviorStore,
    private readonly bloomFilterConfigStore: BloomFilterConfigStore,
    private readonly performanceStore: PerformanceStore
  ) {
    this.updateInterval = -1;
  }

  public async init(containerNode: HTMLElement) {
    const { width: widthContainer, height: heightContainer } = containerNode.getBoundingClientRect();

    this.app = new Application();

    // todo init use case
    await Assets.load(this.texturesStore.getTextureList().map((t) => t.url));

    await this.app.init({
      background: this.appConfigStore.getBackgroundColor(),
      width: widthContainer,
      height: heightContainer,
    });

    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;

    containerNode.appendChild(this.app.canvas);

    const rootContainer = this.app.stage;

    this.background = new Graphics()
      .rect(0, 0, widthContainer, heightContainer)
      .fill({ color: this.appConfigStore.getBackgroundColor() });

    this.appConfigStore.subscribe((state) => {
      this.background.clear().rect(0, 0, widthContainer, heightContainer).fill({ color: state.backgroundColor });

      if (this.appConfigStore.isFollowPointer()) {
        this.enableFollowPointer();
      } else {
        this.disableFollowPointer();
        this.handlePointerLeave();
      }
    });

    rootContainer.addChild(this.background);

    if (this.appConfigStore.isFollowPointer()) {
      this.enableFollowPointer();
    }

    // this.particlesContainer = new ParticleContainer({
    //   dynamicProperties: {
    //     position: true,
    //     scale: false,
    //     rotation: false,
    //     tint: false,
    //   },
    // });

    this.particlesContainer = new Container();

    rootContainer.addChild(this.particlesContainer);

    // падает при reset
    // this.particlesEmitter = new ParticleEmitter<ParticleAdapter>(
    //   new ContainerAdapter(this.particlesContainer as any),
    //   this.texturesStore.getTextureList().map((t) => () => this.createParticle(Texture.from(t.url))),
    //   {
    //     emitterConfig: {
    //       spawnInterval: 250,
    //       spawnParticlesPerWave: 1000,
    //       autoStart: true,
    //     },
    //     particleConfig: {
    //       lifeTime: {
    //         value: 600000,
    //       },
    //       speed: {
    //         value: 3,
    //       },
    //       direction: {
    //         minAngle: 0,
    //         maxAngle: 360,
    //       },
    //     },
    //   }
    // );
    // this.particlesEmitter.fillPool(50000);

    this.particlesEmitter = new ParticleEmitter(
      //@ts-ignore
      this.particlesContainer,
      this.texturesStore.getTextureList().map((t) => () => this.createParticleSprite(Texture.from(t.url))),
      this.particleFluxConfigStore.getConfig()
      // {
      //   emitterConfig: {
      //     spawnInterval: 250,
      //     spawnParticlesPerWave: 1000,
      //     autoStart: true,
      //   },
      //   particleConfig: {
      //     lifeTime: {
      //       value: 600000,
      //     },
      //     speed: {
      //       value: 3,
      //     },
      //     direction: {
      //       minAngle: 0,
      //       maxAngle: 360,
      //     },
      //   },
      // }
    );

    this.setEmitterPosByCenter();

    this.bloomFilter = new AdvancedBloomFilter(this.bloomFilterConfigStore.getOptions());

    this.bloomFilter.enabled = this.bloomFilterConfigStore.isEnabled();

    this.particlesContainer.filters = [this.bloomFilter];

    console.log(this.particleFluxConfigStore.getConfig());

    this.particleFluxConfigStore.subscribe((config) => {
      this.particlesEmitter.config.fullConfig = config;
      this.setEmitterPosByCenter();

      this.particlesEmitter.restart();
    });

    this.texturesStore.subscribe(() => {
      const textures = this.texturesStore.getTextureList();

      this.particlesEmitter.config.view = textures.map((t) => () => this.createParticleSprite(Texture.from(t.url)));
    });

    this.bloomFilterConfigStore.subscribe((state) => {
      this.bloomFilter.enabled = state.enabled;
      this.bloomFilter.quality = state.options.quality || 1;
      this.bloomFilter.brightness = state.options.brightness || 1;
      this.bloomFilter.blur = state.options.blur || 1;
      this.bloomFilter.quality = state.options.quality || 1;
      this.bloomFilter.threshold = state.options.threshold || 1;
    });

    this.spawnShape = new Graphics();
    rootContainer.addChild(this.spawnShape);

    this.renderSpawnShape(
      this.particlesEmitter.config.spawnPosition || new Point(),
      this.spawnShapeStore.getActiveConfig(),
      this.spawnShapeStore.isDisplayShape()
    );

    this.spawnShapeStore.subscribe((state) => {
      this.renderSpawnShape(
        this.particlesEmitter.config.spawnPosition || new Point(),
        this.spawnShapeStore.getActiveConfig(),
        state.isDisplayShape
      );
    });

    this.updateParticleCount();
  }

  public restart(): void {
    this.particlesEmitter.restart();
  }

  private updateParticleCount(): void {
    this.updateInterval = window.setInterval(() => {
      this.performanceStore.setParticlesCount(this.particlesEmitter.getParticlesCount());
    }, UPDATE_PARTICLE_COUNT_INTERVAL);
  }

  private enableFollowPointer() {
    this.background.interactive = true;
    this.background.cursor = "pointer";
    this.background.on("pointermove", this.handlePointerMove);
    this.background.on("pointerleave", this.handlePointerLeave);
  }

  private disableFollowPointer() {
    this.background.interactive = false;
    this.background.cursor = "";
    this.background.off("pointermove", this.handlePointerMove);
    this.background.off("pointerleave", this.handlePointerLeave);
  }

  private createParticleSprite(texture: Texture): Sprite {
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);

    return sprite;
  }

  private createParticle(texture: Texture): ParticleAdapter {
    const particle = new Particle({ texture, anchorX: 0.5, anchorY: 0.5 });
    const particleAdapter = new ParticleAdapter(particle);

    return particleAdapter;
  }

  private handlePointerMove = (e: FederatedPointerEvent) => {
    this.particlesEmitter.config.spawnPosition = {
      x: e.globalX,
      y: e.globalY,
    };

    this.renderSpawnShape(
      this.particlesEmitter.config.spawnPosition || new Point(),
      this.spawnShapeStore.getActiveConfig(),
      this.spawnShapeStore.isDisplayShape()
    );
  };

  private handlePointerLeave = () => {
    this.setEmitterPosByCenter();

    this.renderSpawnShape(
      this.particlesEmitter.config.spawnPosition || new Point(),
      this.spawnShapeStore.getActiveConfig(),
      this.spawnShapeStore.isDisplayShape()
    );
  };

  private setEmitterPosByCenter() {
    this.particlesEmitter.config.spawnPosition = {
      x: this.app.renderer.width / 2,
      y: this.app.renderer.height / 2,
    };
  }

  private renderSpawnShape(spawnPosition: Point2d, spawnShape: SpawnShapeBehavior, isDisplay: boolean) {
    if (spawnShape.type === SpawnShapeType.Point) {
      this.spawnShape.clear().circle(spawnPosition.x, spawnPosition.y, 1).stroke(SPAWN_SHAPE_STROKE);
    } else if (spawnShape.type === SpawnShapeType.Rectangle) {
      this.spawnShape
        .clear()
        .rect(spawnPosition.x, spawnPosition.y, spawnShape.width || 1, spawnShape.height || 1)
        .stroke(SPAWN_SHAPE_STROKE);
    } else if (spawnShape.type === SpawnShapeType.Torus) {
      this.spawnShape.clear();

      if (spawnShape.innerRadius !== undefined && spawnShape.innerRadius !== 0) {
        this.spawnShape.circle(spawnPosition.x, spawnPosition.y, spawnShape.innerRadius);
      }

      this.spawnShape.circle(spawnPosition.x, spawnPosition.y, spawnShape.outerRadius || 1).stroke(SPAWN_SHAPE_STROKE);
    } else if (spawnShape.type === SpawnShapeType.Polygon) {
      if (isSinglePolygonalChain(spawnShape.chain)) {
        this.spawnShape
          .clear()
          .poly(spawnShape.chain.map((point) => [spawnPosition.x + point.x, spawnPosition.y + point.y]).flat())
          .stroke(SPAWN_SHAPE_STROKE);
      } else {
        this.spawnShape.clear();

        spawnShape.chain.forEach((chain) => {
          this.spawnShape
            .poly(chain.map((point) => [spawnPosition.x + point.x, spawnPosition.y + point.y]).flat())
            .stroke(SPAWN_SHAPE_STROKE);
        });
      }
    }

    this.spawnShape.visible = isDisplay;
  }

  public destroy() {
    this.app.destroy();
    window.clearInterval(this.updateInterval);
  }
}

injected(
  EditorApp,
  DI_TOKENS.particleFluxConfigStore,
  DI_TOKENS.appConfigStore,
  DI_TOKENS.texturesStore,
  DI_TOKENS.spawnShapeBehaviorStore,
  DI_TOKENS.bloomFilterConfigStore,
  DI_TOKENS.performanceStore
);
