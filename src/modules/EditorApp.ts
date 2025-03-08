// import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";
import { injected } from "brandi";
import { ParticleFlux } from "particle-flux";
import {
  Application,
  Assets,
  Container,
  ContainerChild,
  FederatedPointerEvent,
  Graphics,
  Sprite,
  Texture,
} from "pixi.js";
import { DI_TOKENS } from "src/di/di.tokens";
// import { AdvancedBloomFilterConfig, AdvancedBloomFilterConfigOptions } from "src/services/AdvancedBloomFilterConfig";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";

export class EditorApp {
  private app: Application;
  private rootContainer: Container;
  // private bloomFilter: AdvancedBloomFilter;
  private particlesEmitter: ParticleFlux;

  constructor(
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly texturesStore: TexturesStore // private readonly advancedBloomFilterConfig: AdvancedBloomFilterConfig
  ) {
    this.particleFluxConfigStore.subscribe((config) => {
      if (!this.particlesEmitter) return;

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

    this.particleFluxConfigStore.setSpawnPosition({
      x: widthContainer / 2,
      y: heightContainer / 2,
    });

    this.particlesEmitter = new ParticleFlux<ContainerChild>(
      this.rootContainer,
      this.texturesStore.getTextureList().map((t) => () => this.createParticle(Texture.from(t.url))),
      this.particleFluxConfigStore.getState()
    );
    console.log(this.particleFluxConfigStore.getState());

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

  public reset(): void {
    this.texturesStore.reset();
    this.particleFluxConfigStore.reset();
  }
}

injected(EditorApp, DI_TOKENS.particleFluxConfigStore, DI_TOKENS.texturesStore);
