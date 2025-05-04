import {DI_TOKENS} from 'src/di/di.tokens';

import {injected} from 'brandi';
import {CONFIG_JSON_FILE_NAME} from 'src/constants';
import {ParticleFluxConfigStore} from 'src/stores/ParticleFluxConfigStore';
import {JSONUtils} from 'src/utils/JSONUtils';
import {SaveLoadUtils} from 'src/utils/SaveLoadUtils';

export class SaveParticleFluxConfigUseCase {
  constructor(private readonly particleFluxConfigStore: ParticleFluxConfigStore) {}

  public save = (): void => {
    const stringifiedConfig = JSONUtils.formatStringify(this.particleFluxConfigStore.getConfig());

    SaveLoadUtils.downloadJSON(stringifiedConfig, CONFIG_JSON_FILE_NAME);
  };
}

injected(SaveParticleFluxConfigUseCase, DI_TOKENS.particleFluxConfigStore);
