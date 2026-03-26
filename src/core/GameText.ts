import * as PIXI from "pixi.js";

export interface GameTextSettings {
  text: string;
  style?: Partial<PIXI.TextStyle>;
  anchor?: { x: number; y: number };
  scale?: { x: number; y: number };
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export class GameText extends PIXI.Text {
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
    if (settings.scale) {
      this.scale.set(settings.scale.x, settings.scale.y);
    }
    if (settings.x !== undefined) {
      this.x = settings.x;
    }
    if (settings.y !== undefined) {
      this.y = settings.y;
    }
    if (settings.width !== undefined) {
      this.width = settings.width;
    }
    if (settings.height !== undefined) {
      this.height = settings.height;
    }
  }

  public setText(value: string): void {
    this.text = value;
  }
}
