import {ParticleTexture} from 'src/stores/TexturesStore/TexturesStore.types';

import {saveAs} from 'file-saver';
import JSZip from 'jszip';
import {TEXTURES_ZIP_FILE_NAME} from 'src/constants';
import {TexturesStore} from 'src/stores/TexturesStore/TexturesStore';

import {last} from './last';

export enum ReaderContentType {
  URL = 'URL',
  Text = 'Text',
}

export class SaveLoadUtils {
  public static downloadJSON(jsonString: string, name: string): void {
    const blob = new Blob([jsonString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public static uploadFile(file: File, readerContentType: ReaderContentType): Promise<string | ArrayBuffer | null> {
    const reader = new FileReader();

    const promise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      reader.onload = (e): void => {
        if (!e.target) return;

        resolve(e.target.result);
      };

      reader.onerror = reject;
    });

    if (readerContentType === ReaderContentType.URL) {
      reader.readAsDataURL(file);
    }

    if (readerContentType === ReaderContentType.Text) {
      reader.readAsText(file);
    }

    return promise;
  }

  public static async downloadTextures(particleList: ParticleTexture[]): Promise<void> {
    const zip = new JSZip();

    try {
      for (const texture of particleList) {
        const response = await fetch(texture.url);

        if (!response.ok) {
          throw new Error('Download Texture Error');
        }

        const blob = await response.blob();

        let fileType: string;
        const fileTypeFromName = last(texture.name.split('.'));

        if (fileTypeFromName && TexturesStore.availableImageTypes.includes(fileTypeFromName)) {
          fileType = '';
        } else {
          fileType = blob.type.split('/')[1] || TexturesStore.availableImageTypes[0];
        }

        const fileName = fileType !== '' ? texture.name + '.' + fileType : texture.name;

        zip.file(fileName, blob);
      }

      const content = await zip.generateAsync({type: 'blob'});
      saveAs(content, TEXTURES_ZIP_FILE_NAME);
    } catch (e) {
      throw e;
    }
  }
}
