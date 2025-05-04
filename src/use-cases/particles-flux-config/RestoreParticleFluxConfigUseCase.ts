import {DI_TOKENS} from 'src/di/di.tokens';

import {ChangeEvent} from 'react';

import {injected} from 'brandi';
import {ParticleEmitterConfig} from 'particle-flux';
import {ErrorsService} from 'src/services/ErrorsService';
import {BaseBehaviorStore} from 'src/stores/BaseBehaviorStore/BaseBehaviorStore';
import {ColorBehaviorStore} from 'src/stores/ColorBehaviorStore/ColorBehaviorStore';
import {DirectionBehaviorStore} from 'src/stores/DirectionBehaviorStore/DirectionBehaviorStore';
import {EmitterConfigStore} from 'src/stores/EmitterConfigStore/EmitterConfigStore';
import {GravityBehaviorStore} from 'src/stores/GravityBehaviorStore/GravityBehaviorStore';
import {LifetimePropertyStore} from 'src/stores/LifetimePropertyStore/LifetimePropertyStore';
import {PathBehaviorStore} from 'src/stores/PathBehaviorStore/PathBehaviorStore';
import {SpawnShapeBehaviorStore} from 'src/stores/SpawnShapeBehaviorStore/SpawnShapeBehaviorStore';
import {JSONUtils} from 'src/utils/JSONUtils';
import {ReaderContentType, SaveLoadUtils} from 'src/utils/SaveLoadUtils';

export class RestoreParticleFluxConfigUseCase {
  constructor(
    private readonly emitterConfigStore: EmitterConfigStore,
    private readonly alphaBehaviorStore: BaseBehaviorStore,
    private readonly scaleBehaviorStore: BaseBehaviorStore,
    private readonly speedBehaviorStore: BaseBehaviorStore,
    private readonly spawnShapeBehaviorStore: SpawnShapeBehaviorStore,
    private readonly colorBehaviorStore: ColorBehaviorStore,
    private readonly lifetimeBehaviorStore: LifetimePropertyStore,
    private readonly directionBehaviorStore: DirectionBehaviorStore,
    private readonly rotationBehaviorStore: BaseBehaviorStore,
    private readonly gravityBehaviorStore: GravityBehaviorStore,
    private readonly pathBehaviorStore: PathBehaviorStore,
    private readonly errorsService: ErrorsService,
  ) {}

  public restore = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file && file.type === 'application/json') {
      const content = await SaveLoadUtils.uploadFile(file, ReaderContentType.Text);

      if (typeof content === 'string') {
        try {
          const config = JSONUtils.parse<ParticleEmitterConfig>(content);
          this.setConfig(config);
        } catch {
          this.showInvalidJsonError(file.name);
        }
      } else {
        this.showInvalidJsonError(file.name);
      }
    } else {
      this.invalidFileType();
    }
  };

  private setConfig(config: ParticleEmitterConfig): void {
    this.emitterConfigStore.restore(config.emitterConfig);

    const {alpha, color, direction, gravity, lifeTime, path, rotation, scale, spawnShape, speed} =
      config.particleConfig;

    this.lifetimeBehaviorStore.restore(lifeTime);
    this.alphaBehaviorStore.restore(alpha);
    this.colorBehaviorStore.restore(color);
    this.directionBehaviorStore.restore(direction);
    this.gravityBehaviorStore.restore(gravity);
    this.pathBehaviorStore.restore(path);
    this.rotationBehaviorStore.restore(rotation);
    this.scaleBehaviorStore.restore(scale);
    this.spawnShapeBehaviorStore.restore(spawnShape);
    this.speedBehaviorStore.restore(speed);
  }

  private showInvalidJsonError(fileName: string): void {
    this.errorsService.showError({
      title: 'Ошибке при загрузке файла с конфигурацией',
      text: `Не удалось загрузить файл с конфигурацией эмиттера. Файл ${fileName} содержит невалидный json`,
    });
  }

  private invalidFileType(): void {
    this.errorsService.showError({
      title: 'Ошибке при загрузке файла с конфигурацией',
      text: 'Не удалось загрузить файл с конфигурацией эмиттера. Некорректный тип файла',
    });
  }
}

injected(
  RestoreParticleFluxConfigUseCase,
  DI_TOKENS.emitterConfigStore,
  DI_TOKENS.alphaBehaviorStore,
  DI_TOKENS.scaleBehaviorStore,
  DI_TOKENS.speedBehaviorStore,
  DI_TOKENS.spawnShapeBehaviorStore,
  DI_TOKENS.colorBehaviorStore,
  DI_TOKENS.lifetimeBehaviorStore,
  DI_TOKENS.directionBehaviorStore,
  DI_TOKENS.rotationBehaviorStore,
  DI_TOKENS.gravityBehaviorStore,
  DI_TOKENS.pathBehaviorStore,
  DI_TOKENS.errorsService,
);
