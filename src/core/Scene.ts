import { DestroyOptions } from "pixi.js";
import { BaseContainer, BaseContainerSettings } from "./BaseContainer";
import { Events } from "../config/Events";
import { Dispatcher } from "./Dispatcher";
import { ResizeData } from "../Game";

export class Scene extends BaseContainer {
  private resizeHandler: (...args: unknown[]) => void;

  constructor(settings?: BaseContainerSettings) {
    super(settings);

    this.resizeHandler = (data) => {
      this.onResize(data as ResizeData);
    };
    Dispatcher.on(Events.RESIZE, this.resizeHandler);
  }

  protected onResize(_data: ResizeData): void {}

  public destroy(options?: DestroyOptions): void {
    Dispatcher.off(Events.RESIZE, this.resizeHandler);
    super.destroy(options ?? { children: true });
  }
}
