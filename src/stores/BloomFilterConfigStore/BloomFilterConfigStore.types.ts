import { AdvancedBloomFilterOptions } from "pixi-filters";
import { BLEND_MODES } from "pixi.js";

export interface BloomFilterConfigStoreState {
  enabled: boolean;
  blendMode: BLEND_MODES;
  options: Omit<AdvancedBloomFilterOptions, "kernels" | "pixelSize">;
}
