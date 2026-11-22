/** Stores hold snapshots; commands and side effects live in use cases and services. */
export class Store<S> {
  private listeners = new Set<() => void>();
  constructor(private state: S) {}
  getState = (): S => this.state;
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  setState(state: S): void {
    this.state = state;
    this.listeners.forEach((listener) => listener());
  }
  patch(state: Partial<S>): void {
    this.setState({...this.state, ...state});
  }
}
