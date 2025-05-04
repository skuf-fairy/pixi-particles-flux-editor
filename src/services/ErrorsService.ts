import {DI_TOKENS} from 'src/di/di.tokens';
import {ErrorData} from 'src/stores/ErrorsStore/ErrorsStore.types';

import {injected} from 'brandi';
import {ErrorsStore} from 'src/stores/ErrorsStore/ErrorsStore';

export class ErrorsService {
  constructor(private readonly errorsStore: ErrorsStore) {}

  public showError(error: ErrorData): void {
    this.errorsStore.setErrorData(error);

    window.setTimeout(() => this.errorsStore.clearError(), 8000);
  }
}

injected(ErrorsService, DI_TOKENS.errorsStore);
