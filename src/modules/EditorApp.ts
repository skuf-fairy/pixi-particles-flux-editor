import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";
import { Emitter, EmitterConfigV3 } from "@pixi/particle-emitter";
import { Application, Container, FederatedPointerEvent, Graphics } from "pixi.js";
import { AdvancedBloomFilterConfig, AdvancedBloomFilterConfigOptions } from "src/services/AdvancedBloomFilterConfig";
import { EmitterConfig } from "src/services/EmitterConfig";

export class EditorApp {
  private app: Application;
  private rootContainer: Container;
  private bloomFilter: AdvancedBloomFilter;
  private particlesEmitter: Emitter;

  constructor(
    private readonly emitterConfig: EmitterConfig,
    private readonly advancedBloomFilterConfig: AdvancedBloomFilterConfig
  ) {}

  public init(containerNode: HTMLElement) {
    const { width: widthContainer, height: heightContainer } = containerNode.getBoundingClientRect();

    this.app = new Application({
      background: "#465760",
      width: widthContainer,
      height: heightContainer,
    });

    globalThis.__PIXI_APP__ = this.app;

    containerNode.appendChild(this.app.view as HTMLCanvasElement);

    this.rootContainer = new Container();
    this.app.stage.addChild(this.rootContainer);

    this.particlesEmitter = new Emitter(this.rootContainer, this.emitterConfig.config);
    this.particlesEmitter.autoUpdate = true;

    this.particlesEmitter.spawnPos.x = this.app.renderer.width / 2;
    this.particlesEmitter.spawnPos.y = this.app.renderer.height / 2;

    this.emitterConfig.subscribeOnConfigChange(this.applyEmitterConfig);

    this.bloomFilter = new AdvancedBloomFilter();

    this.advancedBloomFilterConfig.subscribeOnConfigChange(this.applyBloomFilterOptions, true);

    this.rootContainer.filters = [this.bloomFilter];

    const background = new Graphics()
      .beginFill(0x465760)
      .drawRect(0, 0, this.app.renderer.width, this.app.renderer.height);
    this.rootContainer.addChild(background);

    background.interactive = true;
    background.cursor = "pointer";

    background.on("pointermove", this.handlePointerMove);
    background.on("pointerleave", this.handlePointerLeave);
  }

  private handlePointerMove = (e: FederatedPointerEvent) => {
    this.particlesEmitter.spawnPos.x = e.globalX;
    this.particlesEmitter.spawnPos.y = e.globalY;
  };

  private handlePointerLeave = (e: FederatedPointerEvent) => {
    this.particlesEmitter.spawnPos.x = this.app.renderer.width / 2;
    this.particlesEmitter.spawnPos.y = this.app.renderer.height / 2;
  };

  private applyEmitterConfig = (config: EmitterConfigV3) => {
    this.particlesEmitter.init(config);
    this.particlesEmitter.autoUpdate = true;
  };

  private applyBloomFilterOptions = (options: AdvancedBloomFilterConfigOptions) => {
    this.bloomFilter.enabled = options.enabled;
    this.bloomFilter.blur = options.blur;
    this.bloomFilter.brightness = options.brightness;
    this.bloomFilter.threshold = options.threshold;
    this.bloomFilter.bloomScale = options.bloomScale;
    this.bloomFilter.kernels = options.kernels;
    this.bloomFilter.quality = options.quality;
    this.bloomFilter.blendMode = options.blendMode;
  };

  public destroy() {
    this.app.destroy();
  }
}
