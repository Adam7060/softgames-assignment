import { BaseContainer, BaseContainerSettings } from "./BaseContainer";
import { Dispatcher, Events } from "./Dispatcher";
import { ResizeData } from "../Game";

export class Scene extends BaseContainer {
  constructor(settings?: BaseContainerSettings) {
    super(settings);

    Dispatcher.on(Events.RESIZE, (data) => {
      this.onResize(data as ResizeData);
    });
  }

  protected onResize(_data: ResizeData): void {}
}
