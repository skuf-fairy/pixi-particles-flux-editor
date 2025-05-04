import {BloomFilterConfigStoreState} from './BloomFilterConfigStore.types';

import {AdvancedBloomFilterOptions} from 'pixi-filters';

import {Store} from '../Store';

export class BloomFilterConfigStore extends Store<BloomFilterConfigStoreState> {
  constructor() {
    super({
      enabled: false,
      blendMode: 'normal',
      options: {
        bloomScale: 1,
        brightness: 1,
        blur: 8,
        quality: 4,
        threshold: 0.5,
      },
    });
  }

  public isEnabled(): boolean {
    return this.state.enabled;
  }

  public enable(): void {
    this.setValue('enabled', true);
  }

  public disable(): void {
    this.setValue('enabled', false);
  }

  public getOptions(): AdvancedBloomFilterOptions {
    return this.state.options;
  }

  public setOptions(options: AdvancedBloomFilterOptions) {
    return this.setValue('options', options);
  }
}
