import { injected } from "brandi";
import { ParticleFlux, Point2d, SpawnShapeBehavior, SpawnShapeType, isSinglePolygonalChain } from "particle-flux";
import { AdvancedBloomFilter } from "pixi-filters";
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
import { AppConfigStore } from "src/stores/AppConfigStore/AppConfigStore";
import { BloomFilterConfigStore } from "src/stores/BloomFilterConfigStore/BloomFilterConfigStore";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { SpawnShapeBehaviorStore } from "src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";
import { SPAWN_SHAPE_STROKE } from "./EditorApp.constants";

export class EditorApp {
  private app: Application;
  private bloomFilter: AdvancedBloomFilter;
  private particlesEmitter: ParticleFlux;
  private background: Graphics;
  private particlesContainer: Container;
  private spawnShape: Graphics;

  constructor(
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly appConfigStore: AppConfigStore,
    private readonly texturesStore: TexturesStore,
    private readonly spawnShapeStore: SpawnShapeBehaviorStore,
    private readonly bloomFilterConfigStore: BloomFilterConfigStore
  ) {}

  public async init(containerNode: HTMLElement) {
    const { width: widthContainer, height: heightContainer } = containerNode.getBoundingClientRect();

    this.app = new Application();

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

    this.particlesContainer = new Container();
    rootContainer.addChild(this.particlesContainer);

    this.particlesEmitter = new ParticleFlux<ContainerChild>(
      this.particlesContainer,
      this.texturesStore.getTextureList().map((t) => () => this.createParticle(Texture.from(t.url))),
      this.particleFluxConfigStore.getState()
    );

    this.setEmitterPosByCenter();

    this.bloomFilter = new AdvancedBloomFilter(this.bloomFilterConfigStore.getOptions());

    this.bloomFilter.enabled = this.bloomFilterConfigStore.isEnabled();

    this.particlesContainer.filters = [this.bloomFilter];

    this.particleFluxConfigStore.subscribe((config) => {
      this.particlesEmitter.config.spawnInterval = config.emitterConfig.spawnInterval;
      this.particlesEmitter.config.spawnParticlesPerWave = config.emitterConfig.spawnParticlesPerWave;
      this.particlesEmitter.config.maxParticles = config.emitterConfig.maxParticles;
      this.particlesEmitter.config.spawnChance = config.emitterConfig.spawnChance;

      this.particlesEmitter.config.alpha = config.particleBehaviorsConfig.alpha;
      this.particlesEmitter.config.color = config.particleBehaviorsConfig.color;
      this.particlesEmitter.config.direction = config.particleBehaviorsConfig.direction;
      this.particlesEmitter.config.gravity = config.particleBehaviorsConfig.gravity;
      this.particlesEmitter.config.lifeTime = config.particleBehaviorsConfig.lifeTime;
      this.particlesEmitter.config.path = config.particleBehaviorsConfig.path;
      this.particlesEmitter.config.rotation = config.particleBehaviorsConfig.rotation;
      this.particlesEmitter.config.scale = config.particleBehaviorsConfig.scale;
      this.particlesEmitter.config.spawnShape = config.particleBehaviorsConfig.spawnShape;
      this.particlesEmitter.config.speed = config.particleBehaviorsConfig.speed;
    });

    this.texturesStore.subscribe(() => {
      const textures = this.texturesStore.getTextureList();

      this.particlesEmitter.config.view = textures.map((t) => () => this.createParticle(Texture.from(t.url)));
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
  }
}

injected(
  EditorApp,
  DI_TOKENS.particleFluxConfigStore,
  DI_TOKENS.appConfigStore,
  DI_TOKENS.texturesStore,
  DI_TOKENS.spawnShapeBehaviorStore,
  DI_TOKENS.bloomFilterConfigStore
);
