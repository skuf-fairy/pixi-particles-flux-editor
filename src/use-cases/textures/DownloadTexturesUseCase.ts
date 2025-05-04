import {DI_TOKENS} from 'src/di/di.tokens';

import {injected} from 'brandi';
import {ErrorsService} from 'src/services/ErrorsService';
import {TexturesStore} from 'src/stores/TexturesStore/TexturesStore';
import {SaveLoadUtils} from 'src/utils/SaveLoadUtils';

export class DownloadTexturesUseCase {
  constructor(private readonly texturesStore: TexturesStore, private readonly errorsService: ErrorsService) {}

  public download = (): void => {
    const texturesList = this.texturesStore.getTextureList();

    try {
      SaveLoadUtils.downloadTextures(texturesList);
    } catch (e) {
      const error = e as Error;
      this.errorsService.showError({
        title: 'Не удалось скачать файлы',
        text: 'Какая-то проблема с загруженными текстурами: ' + error.message,
      });
    }
  };
}

injected(DownloadTexturesUseCase, DI_TOKENS.texturesStore, DI_TOKENS.errorsService);
