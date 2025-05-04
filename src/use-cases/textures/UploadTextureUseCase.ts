import {Assets} from 'pixi.js';
import {DI_TOKENS} from 'src/di/di.tokens';

import {ChangeEvent} from 'react';

import {injected} from 'brandi';
import {ErrorsService} from 'src/services/ErrorsService';
import {TexturesStore} from 'src/stores/TexturesStore/TexturesStore';
import {ReaderContentType, SaveLoadUtils} from 'src/utils/SaveLoadUtils';

export class UploadTextureUseCase {
  constructor(private readonly texturesStore: TexturesStore, private readonly errorsService: ErrorsService) {}

  public upload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file) {
      try {
        const url = await SaveLoadUtils.uploadFile(file, ReaderContentType.URL);

        if (typeof url === 'string') {
          await Assets.load(url);

          this.texturesStore.add({
            url: url,
            name: file.name,
          });
        }
      } catch {
        this.errorsService.showError({
          title: 'Ошибка при загрузке текстуры',
          text: `Не удалось загрузить текстуру. Файл ${file.name} не является изображением`,
        });
      }
    }
  };
}

injected(UploadTextureUseCase, DI_TOKENS.texturesStore, DI_TOKENS.errorsService);
