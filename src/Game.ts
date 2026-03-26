import { Application } from "pixi.js";
import { GameConfig } from "./config/GameConfig";
import { ResolutionConfig } from "./config/Resolution";
import { BaseContainer } from "./core/BaseContainer";
import { Events } from "./config/Events";
import { Dispatcher } from "./core/Dispatcher";
import { Menu } from "./scenes/Menu";
import { Preloader } from "./scenes/Preloader";

export type Orientation = "landscape" | "portrait";

export interface ResizeData {
  width: number;
  height: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  orientation: Orientation;
}

export class Game {
  private app: Application;
  private sceneContainer: BaseContainer;
  private overlayContainer: BaseContainer;
  private orientation: Orientation = "landscape";

  constructor() {
    this.app = new Application();

    this.sceneContainer = new BaseContainer({ name: "game" });
    this.overlayContainer = new BaseContainer({ name: "overlay" });
  }

  public async boot(): Promise<void> {
    await this.app.init({ background: GameConfig.backgroundColor });
    document.body.appendChild(this.app.canvas);

    (globalThis as any).__PIXI_APP__ = this.app;

    this.app.stage.addChild(this.sceneContainer);
    this.app.stage.addChild(this.overlayContainer);

    window.addEventListener('resize', () => this.resize());
    this.resize();

    this.showPreloader();
  }

  private showPreloader(): void {
    const preloader = new Preloader(() => {
      this.sceneContainer.removeChild(preloader);
      this.showMenu();
    });

    this.sceneContainer.addChild(preloader);
    this.resize();
  }

  private showMenu(): void {
    const menu = new Menu();
    this.sceneContainer.addChild(menu);
    this.resize();
  }

  public getSceneContainer(): BaseContainer {
    return this.sceneContainer;
  }

  public getOverlayContainer(): BaseContainer {
    return this.overlayContainer;
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public resize(): void {
    const canvas = this.app.canvas;
    const parent = canvas.parentElement!;
    const windowWidth = parent.clientWidth;
    const windowHeight = parent.clientHeight;

    const ratio = windowWidth / windowHeight;
    const prevOrientation = this.orientation;
    this.orientation = ratio >= 1 ? "landscape" : "portrait";

    const config = this.orientation === "landscape"
      ? ResolutionConfig.landscape
      : ResolutionConfig.portrait;

    let width = config.width;
    let height = config.height;
    let offsetX = 0;
    let offsetY = 0;

    const gameRatio = width / height;

    if (ratio >= gameRatio) {
      const origWidth = width;
      width = height * ratio;
      offsetX = (width - origWidth) / 2;
    } else {
      const origHeight = height;
      height = width / ratio;
      offsetY = (height - origHeight) / 2;
    }

    this.app.renderer.resize(width, height);

    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowHeight}px`;

    this.app.stage.position.set(offsetX, offsetY);

    const scale = windowWidth / width;

    const resizeData: ResizeData = {
      width,
      height,
      scale,
      offsetX,
      offsetY,
      orientation: this.orientation,
    };

    Dispatcher.emit(Events.RESIZE, resizeData);

    if (prevOrientation !== this.orientation) {
      Dispatcher.emit(Events.ORIENTATION_CHANGE, resizeData);
    }
  }
}
