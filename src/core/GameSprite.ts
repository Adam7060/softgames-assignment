import * as PIXI from "pixi.js";

export interface GameSpriteSettings {
  spriteSource: string;
  anchor?: { x: number; y: number };
  scale?: { x: number; y: number };
  x?: number;
  y?: number;
}

export class GameSprite extends PIXI.Sprite {
  constructor(settings: GameSpriteSettings) {
    super(PIXI.Assets.get<PIXI.Texture>(settings.spriteSource));
    this.anchor.set(0.5, 0.5);
    this.applySettings(settings);
  }

  public applySettings(settings: GameSpriteSettings): void {
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
  }

  public setTexture(alias: string): void {
    this.texture = PIXI.Assets.get<PIXI.Texture>(alias);
  }
}
