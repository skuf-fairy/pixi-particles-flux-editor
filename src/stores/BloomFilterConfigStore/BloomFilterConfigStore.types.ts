import {BLEND_MODES} from 'pixi.js';

import {AdvancedBloomFilterOptions} from 'pixi-filters';

export interface BloomFilterConfigStoreState {
  enabled: boolean;
  blendMode: BLEND_MODES;
  options: Omit<AdvancedBloomFilterOptions, 'kernels' | 'pixelSize'>;
}
