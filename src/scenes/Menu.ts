import { MenuConfig } from "../config/MenuConfig";
import { Button } from "../core/Button";
import { Scene } from "../core/Scene";
import { ResizeData } from "../Game";

export class Menu extends Scene {
  private playButton: Button;

  constructor() {
    super({ name: "menu" });

    this.playButton = new Button({
      ...MenuConfig.playButton,
      callback: () => {
        // TODO: start game
      },
    });
    this.addChild(this.playButton);

    this.applyLayout("landscape");
  }

  private applyLayout(orientation: string): void {
    const layout = orientation === "landscape"
      ? MenuConfig.landscape
      : MenuConfig.portrait;

    this.playButton.x = layout.playButton.x;
    this.playButton.y = layout.playButton.y;
  }

  protected onResize(data: ResizeData): void {
    this.applyLayout(data.orientation);
  }
}
