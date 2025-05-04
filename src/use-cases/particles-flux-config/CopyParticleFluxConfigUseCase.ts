import {DI_TOKENS} from 'src/di/di.tokens';

import {injected} from 'brandi';
import {ParticleFluxConfigStore} from 'src/stores/ParticleFluxConfigStore';
import {CopyUtils} from 'src/utils/CopyUtils';
import {JSONUtils} from 'src/utils/JSONUtils';

export class CopyParticleFluxConfigUseCase {
  constructor(private readonly particleFluxConfigStore: ParticleFluxConfigStore) {}

  public copy = (): void => {
    const stringifiedConfig = JSONUtils.formatStringify(this.particleFluxConfigStore.getConfig());

    CopyUtils.copyTextToClipboard(stringifiedConfig);
  };
}

injected(CopyParticleFluxConfigUseCase, DI_TOKENS.particleFluxConfigStore);
