import {EditorStore, PreviewStore} from '../stores/EditorStore';
import type {PreviewRenderer} from './PreviewRenderer';

/** Keeps the editor usable while the rendering engine loads in its own chunk. */
export class PreviewService {
  private renderer?: PreviewRenderer;
  private revision = 0;
  constructor(
    private editor: EditorStore,
    private stats: PreviewStore,
    private loadRenderer = () => import('./PreviewRenderer'),
  ) {}
  async mount(host: HTMLElement): Promise<void> {
    const revision = ++this.revision;
    this.renderer?.destroy();
    this.renderer = undefined;
    try {
      const {PreviewRenderer} = await this.loadRenderer();
      if (revision !== this.revision) return;
      this.renderer = new PreviewRenderer(this.editor, this.stats);
      await this.renderer.mount(host);
    } catch (error) {
      if (revision === this.revision)
        this.editor.patch({error: `Preview: ${error instanceof Error ? error.message : String(error)}`});
    }
  }
  play(): void {
    if (this.renderer) this.renderer.play();
    else this.editor.patch({playing: true});
  }
  pause(): void {
    this.editor.patch({playing: false});
  }
  restart(): void {
    this.renderer?.restart();
  }
  burst(): void {
    this.renderer?.burst();
  }
  step(): void {
    this.pause();
    this.renderer?.step();
  }
  destroy(): void {
    this.revision++;
    this.renderer?.destroy();
    this.renderer = undefined;
    this.stats.patch({ready: false});
  }
}
