export interface ErrorData {
  title: string;
  text: string;
}

export interface ErrorsStoreState {
  data: ErrorData | null;
}
