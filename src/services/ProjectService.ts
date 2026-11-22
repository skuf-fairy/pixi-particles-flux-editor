import type {Project, TextureAsset} from '../domain/types';
import {ConfigService} from './ConfigService';

const STORAGE_KEY = 'particle-flux-studio:v2';
export class ProjectService {
  constructor(private config: ConfigService) {}
  restore(current: Project): Project | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? this.config.parseProject(raw, current) : null;
  }
  save(project: Project): void {
    localStorage.setItem(STORAGE_KEY, this.config.stringify(project));
  }
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
  download(value: unknown, filename: string): void {
    const url = URL.createObjectURL(new Blob([this.config.stringify(value)], {type: 'application/json'}));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async uploadTexture(file: File): Promise<TextureAsset> {
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type))
      throw new Error('Choose a PNG, JPEG or WebP image.');
    if (file.size > 4 * 1024 * 1024) throw new Error('Textures must be smaller than 4 MB.');
    const url = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Unable to read texture.'));
      reader.readAsDataURL(file);
    });
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('This image cannot be decoded.'));
      img.src = url;
    });
    return {id: crypto.randomUUID(), name: file.name, url};
  }
}
