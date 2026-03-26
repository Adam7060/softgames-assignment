import { BaseContainer, BaseContainerSettings } from "./BaseContainer";
import { Events } from "../config/Events";
import { Dispatcher } from "./Dispatcher";
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
