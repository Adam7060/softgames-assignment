import { Container } from "pixi.js";

export interface BaseContainerSettings {
  name?: string;
  x?: number;
  y?: number;
  scaleX?: number;
  scaleY?: number;
  width?: number;
  height?: number;
}

export class BaseContainer extends Container {
  constructor(settings?: BaseContainerSettings) {
    super();
    if (settings) {
      this.apply(settings);
      this.label = settings.name ?? "please-name-me";
    }
  }

  public apply(settings: BaseContainerSettings): void {
    if (settings.x !== undefined) {
      this.x = settings.x;
    }
    if (settings.y !== undefined) {
      this.y = settings.y;
    }
    if (settings.scaleX !== undefined) {
      this.scale.x = settings.scaleX;
    }
    if (settings.scaleY !== undefined) {
      this.scale.y = settings.scaleY;
    }
    if (settings.width !== undefined) {
      this.width = settings.width;
    }
    if (settings.height !== undefined) {
      this.height = settings.height;
    }
  }
}
