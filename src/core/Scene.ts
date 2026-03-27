import { DestroyOptions } from "pixi.js";
import { BaseContainer, BaseContainerSettings } from "./BaseContainer";
import { Button } from "./Button";
import { Events } from "../config/Events";
import { ResolutionConfig } from "../config/Resolution";
import { Dispatcher } from "./Dispatcher";
import { ResizeData } from "../Game";

export interface SceneSettings extends BaseContainerSettings {
  hasCloseButton?: boolean;
}

export class Scene extends BaseContainer {
  private resizeHandler: (...args: unknown[]) => void;
  private closeButton: Button | null = null;

  constructor(settings?: SceneSettings) {
    super(settings);

    this.resizeHandler = (data) => {
      const resizeData = data as ResizeData;
      if (this.closeButton) {
        this.positionCloseButton(resizeData);
      }
      this.onResize(resizeData);
    };
    Dispatcher.on(Events.RESIZE, this.resizeHandler);

    if (settings?.hasCloseButton) {
      this.closeButton = new Button({
        name: "close-button",
        idle: { spriteSource: "button_close_default" },
        hover: { spriteSource: "button_close_hover" },
        pressed: { spriteSource: "button_close_pressed" },
        callback: () => {
          Dispatcher.emit(Events.SCENE_CLOSE);
        },
      });
      this.addChild(this.closeButton);
    }
  }

  private positionCloseButton(data: ResizeData): void {
    if (!this.closeButton) return;
    const config = data.orientation === "landscape"
      ? ResolutionConfig.landscape
      : ResolutionConfig.portrait;

    this.closeButton.x = config.width / 2 - 80;
    this.closeButton.y = -config.height / 2 + 80;
  }

  protected onResize(_data: ResizeData): void {}

  public destroy(options?: DestroyOptions): void {
    Dispatcher.off(Events.RESIZE, this.resizeHandler);
    super.destroy(options ?? { children: true });
  }
}
