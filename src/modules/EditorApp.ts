import { injected } from "brandi";
import { ParticleFlux } from "particle-flux";
import { AdvancedBloomFilter } from "pixi-filters";
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
import { LocalConfigStorageService } from "src/services/LocalConfigStorageService";
import { AppConfigStore } from "src/stores/AppConfigStore/AppConfigStore";
import { BloomFilterConfigStore } from "src/stores/BloomFilterConfigStore/BloomFilterConfigStore";
import { ParticleFluxConfigStore } from "src/stores/ParticleFluxConfigStore";
import { TexturesStore } from "src/stores/TexturesStore/TexturesStore";

export class EditorApp {
  private app: Application;
  private rootContainer: Container;
  private bloomFilter: AdvancedBloomFilter;
  private particlesEmitter: ParticleFlux;

  constructor(
    private readonly particleFluxConfigStore: ParticleFluxConfigStore,
    private readonly localStorage: LocalConfigStorageService,
    private readonly appConfigStore: AppConfigStore,
    private readonly texturesStore: TexturesStore,
    private readonly bloomFilterConfigStore: BloomFilterConfigStore
  ) {
    this.appConfigStore.setValue("isLocalStorageSaveEnabled", this.localStorage.isAutoSaveEnabled());

    this.particleFluxConfigStore.subscribe((config) => {
      if (!this.particlesEmitter) return;

      this.localStorage.setParticleFluxConfig(config);

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

      this.localStorage.setTexturesConfig(textures);

      if (this.particlesEmitter) {
        this.particlesEmitter.config.view = textures.map((t) => () => this.createParticle(Texture.from(t.url)));
      }
    });

    this.bloomFilterConfigStore.subscribe((state) => {
      if (this.bloomFilter) {
        this.bloomFilter.enabled = state.enabled;
        this.bloomFilter.quality = state.options.quality || 1;
        this.bloomFilter.brightness = state.options.brightness || 1;
        this.bloomFilter.blur = state.options.blur || 1;
        this.bloomFilter.quality = state.options.quality || 1;
        this.bloomFilter.threshold = state.options.threshold || 1;
      }
    });

    const config = this.localStorage.getParticleFluxConfig();

    if (config) {
      this.particleFluxConfigStore.restore(config);
    } else {
      this.localStorage.setParticleFluxConfig(this.particleFluxConfigStore.getState());
    }

    const textures = this.localStorage.getTexturesConfig();

    if (textures) {
      this.texturesStore.setTextures(textures);
    } else {
      this.localStorage.setTexturesConfig(this.texturesStore.getTextureList());
    }
  }

  public async init(containerNode: HTMLElement) {
    const { width: widthContainer, height: heightContainer } = containerNode.getBoundingClientRect();

    this.app = new Application();

    await Assets.load(TexturesStore.defaultParticle.url);

    await this.app.init({
      background: this.appConfigStore.getState().backgroundColor,
      width: widthContainer,
      height: heightContainer,
    });

    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;

    containerNode.appendChild(this.app.canvas);

    this.rootContainer = this.app.stage;
    const background = new Graphics()
      .rect(0, 0, widthContainer, heightContainer)
      .fill({ color: this.appConfigStore.getState().backgroundColor });

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

    this.bloomFilter = new AdvancedBloomFilter(this.bloomFilterConfigStore.getOptions());

    this.bloomFilter.enabled = this.bloomFilterConfigStore.isEnabled();

    this.rootContainer.filters = [this.bloomFilter];
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

  public destroy() {
    this.app.destroy();
  }

  public reset(): void {
    this.texturesStore.reset();
    this.particleFluxConfigStore.reset();
  }
}

injected(
  EditorApp,
  DI_TOKENS.particleFluxConfigStore,
  DI_TOKENS.localConfigStorageService,
  DI_TOKENS.appConfigStore,
  DI_TOKENS.texturesStore,
  DI_TOKENS.bloomFilterConfigStore
);
