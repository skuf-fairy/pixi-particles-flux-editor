import { EventEmitter } from "pixi.js";

export class Store<S> {
  public state: S;
  private readonly emitEventname = "config-changed";
  private readonly eventEmitter: EventEmitter;

  constructor(state: S) {
    this.state = state;
    this.eventEmitter = new EventEmitter();
  }

  public getState = (): S => this.state;

  public subscribe = (cb: (state: S) => void) => {
    const onChange = () => cb(this.state);
    this.eventEmitter.on(this.emitEventname, onChange);

    return () => this.eventEmitter.off(this.emitEventname, onChange);
  };

  public setState(state: S): void {
    this.state = state;
    this.emit();
  }

  protected emit() {
    this.state = { ...this.state };
    this.eventEmitter.emit(this.emitEventname);
  }
}
