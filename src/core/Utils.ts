import { FillGradient } from "pixi.js";

export function getGradientFill(fontSize: number, stops: number[], colors: number[]) {
  const fillGradient = new FillGradient(0, 0, 0, fontSize * 1.7);
  for (let i = 0; i < stops.length; i++) {
    fillGradient.addColorStop(stops[i], colors[i]);
  }
  return fillGradient;
}
