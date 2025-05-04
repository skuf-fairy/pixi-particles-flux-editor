import {ErrorData, ErrorsStoreState} from './ErrorsStore.types';

import {Store} from '../Store';

export class ErrorsStore extends Store<ErrorsStoreState> {
  constructor() {
    super({
      data: null,
    });
  }

  public getErrorData(): ErrorData | null {
    return this.state.data;
  }

  public setErrorData(data: ErrorData): void {
    this.setValue('data', data);
  }

  public clearError(): void {
    this.setValue('data', null);
  }
}
