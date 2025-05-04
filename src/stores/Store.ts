import {EventEmitter} from 'pixi.js';

export class Store<S> {
  public state: S;
  private initialState: S;
  private readonly emitEventname = 'state-changed';
  private readonly eventEmitter: EventEmitter;

  constructor(state: S) {
    this.state = {...state};
    this.initialState = {...state};
    this.eventEmitter = new EventEmitter();
  }

  public getState = (): S => this.state;

  public reset(): void {
    this.setState(this.initialState);
  }

  public subscribe = (cb: (state: S) => void) => {
    const onChange = () => cb(this.state);
    this.eventEmitter.on(this.emitEventname, onChange);

    return () => this.eventEmitter.off(this.emitEventname, onChange);
  };

  public setState(state: S): void {
    this.state = state;
    this.emit();
  }

  public setValue<K extends keyof S>(key: K, value: S[K]): void {
    this.state = {...this.state, [key]: value};
    this.emit();
  }

  protected emit() {
    this.state = {...this.state};
    this.eventEmitter.emit(this.emitEventname);
  }
}
