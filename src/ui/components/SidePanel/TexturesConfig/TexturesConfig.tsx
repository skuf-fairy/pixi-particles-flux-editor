import {useDropTextureUseCaseToken} from 'src/di/di.hooks';

import React from 'react';

import {useTexturesStore} from 'src/hooks/connectors';

import {BehaviorHeader} from '../BehaviorHeader/BehaviorHeader';
import {BehaviorName} from '../BehaviorName/BehaviorName';
import {ItemContainer} from '../ItemContainer/ItemContainer';
import {DownloadTexturesButton} from './DownloadTexturesButton';
import {SelectFromGallery} from './SelectFromGallery';
import {TextureList} from './TextureList';
import {UploadTextureButton} from './UploadTextureButton';

import s from './TexturesConfig.module.css';

export function TexturesConfig() {
  const texturesStore = useTexturesStore();
  const textureList = texturesStore.getTextureList();

  const dropTextureUseCase = useDropTextureUseCaseToken();

  return (
    <ItemContainer>
      <BehaviorHeader left={<BehaviorName name="Textures" />} right={null} />

      <div>
        <TextureList textureList={textureList} onRemove={dropTextureUseCase.drop} />

        <div className={s.actions}>
          <div className={s.button}>
            <UploadTextureButton />
          </div>
          <div className={s.button}>
            <SelectFromGallery />
          </div>
          <div className={s.button}>
            <DownloadTexturesButton />
          </div>
        </div>
      </div>
    </ItemContainer>
  );
}
