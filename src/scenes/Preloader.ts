import { Assets, Container, Graphics, Text } from "pixi.js";
import { ResolutionConfig } from "../config/Resolution";
import { Scene } from "../core/Scene";
import { ResizeData } from "../Game";

export class Preloader extends Scene {
  private bar: Graphics;
  private barBg: Graphics;
  private barContainer: Container;
  private continueText: Text;
  private progress: number = 0;
  private onContinue: () => void;

  private readonly BAR_WIDTH = 600;
  private readonly BAR_HEIGHT = 30;

  constructor(onContinue: () => void) {
    super({ name: "preloader" });
    this.onContinue = onContinue;
    this.loadAssets();

    this.barContainer = new Container();

    this.barBg = new Graphics();
    this.barBg.roundRect(0, 0, this.BAR_WIDTH, this.BAR_HEIGHT, 8);
    this.barBg.fill(0x000000);
    this.barBg.alpha = 0.3;
    this.barContainer.addChild(this.barBg);

    this.bar = new Graphics();
    this.barContainer.addChild(this.bar);

    this.addChild(this.barContainer);

    this.continueText = new Text({
      text: "Click to Continue",
      style: { fill: "#ffffff", fontSize: 40, fontWeight: "bold" },
    });
    this.continueText.anchor.set(0.5);
    this.continueText.visible = false;
    this.addChild(this.continueText);

    this.on("pointerdown", () => {
      if (this.progress >= 1) {
        this.onContinue();
      }
    });
  }

  public setProgress(value: number): void {
    this.progress = Math.min(Math.max(value, 0), 1);

    this.bar.clear();
    this.bar.roundRect(0, 0, this.BAR_WIDTH * this.progress, this.BAR_HEIGHT, 8);
    this.bar.fill(0xffffff);

    if (this.progress >= 1) {
      this.barContainer.visible = false;
      this.continueText.visible = true;
      this.eventMode = "static";
      this.cursor = "pointer";
      this.hitArea = { contains: () => true };
    }
  }

  private async loadAssets(): Promise<void> {
    await Assets.load([
      { alias: "button_default", src: "assets/ui/button_default.png" },
      { alias: "button_hover", src: "assets/ui/button_hover.png" },
      { alias: "button_pressed", src: "assets/ui/button_pressed.png" },
      { alias: "button_close_default", src: "assets/ui/button_close_default.png" },
      { alias: "button_close_hover", src: "assets/ui/button_close_hover.png" },
      { alias: "button_close_pressed", src: "assets/ui/button_close_pressed.png" },
    ], (progress) => {
      this.setProgress(progress);
    });
  }

  protected onResize(data: ResizeData): void {
    const config = data.orientation === "landscape"
      ? ResolutionConfig.landscape
      : ResolutionConfig.portrait;

    this.barContainer.x = (config.width - this.BAR_WIDTH) / 2;
    this.barContainer.y = config.height / 2;

    this.continueText.x = config.width / 2;
    this.continueText.y = config.height / 2;

  }
}
