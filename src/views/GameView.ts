import { Application, Container } from 'pixi.js';
import { ResolutionConfig } from '../config/Resolution';
import { Dispatcher, Events } from '../core/Dispatcher';

export type Orientation = 'landscape' | 'portrait';

export interface ResizeData {
  width: number;
  height: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  orientation: Orientation;
}

export class GameView {
  private app: Application;
  private viewContainer: Container;
  private gameView: Container;
  private orientation: Orientation = 'landscape';

  constructor(app: Application) {
    this.app = app;

    this.viewContainer = new Container({ label: 'view-container' });
    this.gameView = new Container();

    this.viewContainer.addChild(this.gameView);

    this.app.stage.addChild(this.viewContainer);

    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  public getGameView(): Container {
    return this.gameView;
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
    this.orientation = ratio >= 1 ? 'landscape' : 'portrait';

    const config = this.orientation === 'landscape'
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
