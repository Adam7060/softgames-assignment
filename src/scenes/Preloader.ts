import { Assets, Container, Graphics } from "pixi.js";
import { PreloaderConfig } from "../config/PreloaderConfig";
import { GameText } from "../core/GameText";
import { Scene } from "../core/Scene";
import { ResizeData } from "../Game";

export class Preloader extends Scene {
  private bar: Graphics;
  private barBg: Graphics;
  private barContainer: Container;
  private continueText: GameText;
  private progress: number = 0;
  private onContinue: () => void;

  constructor(onContinue: () => void) {
    super({ name: "preloader" });
    this.onContinue = onContinue;
    this.loadAssets();

    const { width, height, radius, backgroundColor, backgroundAlpha } = PreloaderConfig.bar;

    this.barContainer = new Container();

    this.barBg = new Graphics();
    this.barBg.roundRect(0, 0, width, height, radius);
    this.barBg.fill(backgroundColor);
    this.barBg.alpha = backgroundAlpha;
    this.barContainer.addChild(this.barBg);

    this.bar = new Graphics();
    this.barContainer.addChild(this.bar);

    this.addChild(this.barContainer);

    this.continueText = new GameText(PreloaderConfig.continueText);
    this.continueText.visible = false;
    this.addChild(this.continueText);

    this.on("pointerdown", () => {
      if (this.progress >= 1) {
        this.onContinue();
      }
    });

    this.applyLayout("landscape");
  }

  public setProgress(value: number): void {
    this.progress = Math.min(Math.max(value, 0), 1);
    const { width, height, radius, fillColor } = PreloaderConfig.bar;

    this.bar.clear();
    this.bar.roundRect(0, 0, width * this.progress, height, radius);
    this.bar.fill(fillColor);

    if (this.progress >= 1) {
      this.barContainer.visible = false;
      this.continueText.visible = true;
      this.eventMode = "static";
      this.cursor = "pointer";
      this.hitArea = { contains: () => true };
    }
  }

  private async loadAssets(): Promise<void> {
    await Assets.load(PreloaderConfig.assets, (progress) => {
      this.setProgress(progress);
    });
  }

  private applyLayout(orientation: string): void {
    const layout = orientation === "landscape"
      ? PreloaderConfig.landscape
      : PreloaderConfig.portrait;

    this.barContainer.x = layout.bar.x;
    this.barContainer.y = layout.bar.y;
    this.continueText.x = layout.continueText.x;
    this.continueText.y = layout.continueText.y;
  }

  protected onResize(data: ResizeData): void {
    this.applyLayout(data.orientation);
  }
}
