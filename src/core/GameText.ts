import * as PIXI from "pixi.js";

export interface GameTextSettings {
  text: string;
  style?: Partial<PIXI.TextStyle>;
  anchor?: { x: number; y: number };
  scale?: { x: number; y: number };
  x?: number;
  y?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export class GameText extends PIXI.Text {
  private maxWidth?: number;
  private maxHeight?: number;

  constructor(settings: GameTextSettings) {
    super({
      text: settings.text,
      style: settings.style,
    });
    this.anchor.set(0.5, 0.5);
    this.applySettings(settings);
  }

  public applySettings(settings: GameTextSettings): void {
    if (settings.anchor) {
      this.anchor.set(settings.anchor.x, settings.anchor.y);
    }
    if (settings.x !== undefined) {
      this.x = settings.x;
    }
    if (settings.y !== undefined) {
      this.y = settings.y;
    }
    if (settings.scale) {
      this.scale.set(settings.scale.x, settings.scale.y);
    }
    if (settings.maxWidth !== undefined) {
      this.maxWidth = settings.maxWidth;
    }
    if (settings.maxHeight !== undefined) {
      this.maxHeight = settings.maxHeight;
    }
    if (this.maxWidth !== undefined || this.maxHeight !== undefined) {
      this.fit();
    }
  }

  public setText(value: string): void {
    this.text = value;
    if (this.maxWidth !== undefined || this.maxHeight !== undefined) {
      this.fit();
    }
  }

  private fit(): void {
    this.scale.set(1);
    const scaleX = this.maxWidth !== undefined ? this.maxWidth / this.width : Infinity;
    const scaleY = this.maxHeight !== undefined ? this.maxHeight / this.height : Infinity;
    const fitScale = Math.min(scaleX, scaleY);
    this.scale.set(fitScale);
  }
}
