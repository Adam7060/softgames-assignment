import { MenuConfig } from "../config/MenuConfig";
import { Events } from "../config/Events";
import { Button } from "../core/Button";
import { Dispatcher } from "../core/Dispatcher";
import { Scene } from "../core/Scene";
import { ResizeData } from "../Game";

export const MenuEvents = {
  ACE_OF_SHADOWS: "menu_ace_of_shadows",
  MAGIC_WORDS: "menu_magic_words",
  PHOENIX_FLAME: "menu_phoenix_flame",
} as const;

export class Menu extends Scene {
  private aceButton: Button;
  private magicButton: Button;
  private phoenixButton: Button;

  constructor() {
    super({ name: "menu" });

    this.aceButton = new Button({
      ...MenuConfig.aceOfShadows,
      callback: () => Dispatcher.emit(MenuEvents.ACE_OF_SHADOWS),
    });

    this.magicButton = new Button({
      ...MenuConfig.magicWords,
      callback: () => Dispatcher.emit(MenuEvents.MAGIC_WORDS),
    });

    this.phoenixButton = new Button({
      ...MenuConfig.phoenixFlame,
      callback: () => Dispatcher.emit(MenuEvents.PHOENIX_FLAME),
    });

    this.addChild(this.aceButton);
    this.addChild(this.magicButton);
    this.addChild(this.phoenixButton);

    this.applyLayout("landscape");
  }

  private applyLayout(orientation: string): void {
    const layout = orientation === "landscape"
      ? MenuConfig.landscape
      : MenuConfig.portrait;

    this.aceButton.x = layout.aceOfShadows.x;
    this.aceButton.y = layout.aceOfShadows.y;
    this.magicButton.x = layout.magicWords.x;
    this.magicButton.y = layout.magicWords.y;
    this.phoenixButton.x = layout.phoenixFlame.x;
    this.phoenixButton.y = layout.phoenixFlame.y;
  }

  protected onResize(data: ResizeData): void {
    this.applyLayout(data.orientation);
  }
}
