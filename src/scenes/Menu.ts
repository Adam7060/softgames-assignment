import { ResolutionConfig } from "../config/Resolution";
import { Button } from "../core/Button";
import { Scene } from "../core/Scene";
import { ResizeData } from "../Game";

export class Menu extends Scene {
  private playButton: Button;

  constructor() {
    super({ name: "menu" });

    this.playButton = new Button({
      name: "play-button",
      idle: { spriteSource: "button_default" },
      hover: { spriteSource: "button_hover" },
      pressed: { spriteSource: "button_pressed" },
      buttonText: "Play",
      callback: () => {
        // TODO: start game
      },
    });
    this.addChild(this.playButton);
  }

  protected onResize(data: ResizeData): void {
    const config = data.orientation === "landscape"
      ? ResolutionConfig.landscape
      : ResolutionConfig.portrait;

    this.playButton.x = (config.width - this.playButton.width) / 2;
    this.playButton.y = (config.height - this.playButton.height) / 2;
  }
}
