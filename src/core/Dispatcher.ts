type EventCallback = (...args: unknown[]) => void;

class DispatcherClass {
  private listeners: Map<string, EventCallback[]> = new Map();

  public on(event: string, callback: EventCallback): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  public once(event: string, callback: EventCallback): void {
    const wrapper: EventCallback = (...args) => {
      this.off(event, wrapper);
      callback(...args);
    };
    this.on(event, wrapper);
  }

  public off(event: string, callback: EventCallback): void {
    const callbacks = this.listeners.get(event);
    if (!callbacks) return;
    const index = callbacks.indexOf(callback);
    if (index !== -1) callbacks.splice(index, 1);
  }

  public emit(event: string, ...args: unknown[]): void {
    const callbacks = this.listeners.get(event);
    if (!callbacks) return;
    for (const callback of callbacks) {
      callback(...args);
    }
  }
}

export const Dispatcher = new DispatcherClass();
