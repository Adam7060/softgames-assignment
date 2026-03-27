import gsap from "gsap";
import { Application, Graphics } from "pixi.js";
import { GameConfig } from "./config/GameConfig";
import { Events } from "./config/Events";
import { ResolutionConfig } from "./config/Resolution";
import { BaseContainer } from "./core/BaseContainer";
import { Dispatcher } from "./core/Dispatcher";
import { Scene } from "./core/Scene";
import { AceOfShadows } from "./scenes/AceOfShadows";
import { MagicWords } from "./scenes/MagicWords";
import { Menu, MenuEvents } from "./scenes/Menu";
import { PhoenixFlame } from "./scenes/PhoenixFlame";
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
  private currentScene: Scene | null = null;
  private debugRect: Graphics | null = null;

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

    window.addEventListener("resize", () => this.resize());
    this.resize();

    Dispatcher.on(MenuEvents.ACE_OF_SHADOWS, () => this.showScene(new AceOfShadows()));
    Dispatcher.on(MenuEvents.MAGIC_WORDS, () => this.showScene(new MagicWords()));
    Dispatcher.on(MenuEvents.PHOENIX_FLAME, () => this.showScene(new PhoenixFlame()));
    Dispatcher.on(Events.SCENE_CLOSE, () => this.showMenu());

    this.showPreloader();
  }

  private showPreloader(): void {
    const preloader = new Preloader(async () => {
      await gsap.to(preloader, { alpha: 0, duration: 0.3 });
      preloader.destroy();
      this.showMenu();
    });

    this.sceneContainer.addChild(preloader);
    this.resize();
  }

  private async showMenu(): Promise<void> {
    if (this.currentScene) {
      await gsap.to(this.currentScene, { alpha: 0, duration: 0.3 });
      this.currentScene.destroy();
      this.currentScene = null;
    }

    const menu = new Menu();
    menu.alpha = 0;
    this.currentScene = menu;
    this.sceneContainer.addChild(menu);
    this.resize();
    await gsap.to(menu, { alpha: 1, duration: 0.3 });
  }

  private async showScene(scene: Scene): Promise<void> {
    if (this.currentScene) {
      await gsap.to(this.currentScene, { alpha: 0, duration: 0.3 });
      this.currentScene.destroy();
      this.currentScene = null;
    }

    scene.alpha = 0;
    this.currentScene = scene;
    this.sceneContainer.addChild(scene);
    this.resize();
    await gsap.to(scene, { alpha: 1, duration: 0.3 });
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
    this.sceneContainer.position.set(config.width / 2, config.height / 2);

    if (this.debugRect) {
      this.sceneContainer.removeChild(this.debugRect);
    }
    this.debugRect = new Graphics();
    this.debugRect.rect(-config.width / 2, -config.height / 2, config.width, config.height);
    this.debugRect.stroke({ color: 0xff0000, width: 4 });
    this.sceneContainer.addChildAt(this.debugRect, 0);

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
