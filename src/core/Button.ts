import { Text } from "pixi.js";
import { BaseContainer, BaseContainerSettings } from "./BaseContainer";
import { GameSprite, GameSpriteSettings } from "./GameSprite";

export interface ButtonSettings extends BaseContainerSettings {
  idle: GameSpriteSettings;
  hover?: GameSpriteSettings;
  pressed?: GameSpriteSettings;
  buttonText?: string;
  callback?: () => void;
}

export class Button extends BaseContainer {
  private sprite: GameSprite;
  private textLabel: Text | null = null;
  private settings: ButtonSettings;

  constructor(settings: ButtonSettings) {
    super(settings);
    this.settings = settings;

    this.sprite = new GameSprite(settings.idle);
    this.addChild(this.sprite);

    if (settings.buttonText) {
      this.textLabel = new Text({
        text: settings.buttonText,
        style: { fill: "#ffffff", fontSize: 36, fontWeight: "bold" },
      });
      this.textLabel.anchor.set(0.5);
      this.textLabel.x = this.sprite.width / 2;
      this.textLabel.y = this.sprite.height / 2;
      this.addChild(this.textLabel);
    }

    this.eventMode = "static";
    this.cursor = "pointer";

    if (settings.hover) {
      this.on("pointerover", () => this.setState("hover"));
      this.on("pointerout", () => this.setState("idle"));
    }

    if (settings.pressed) {
      this.on("pointerdown", () => this.setState("pressed"));
      this.on("pointerup", () => this.setState("hover"));
      this.on("pointerupoutside", () => this.setState("idle"));
    }

    if (settings.callback) {
      this.on("pointerup", settings.callback);
    }
  }

  private setState(state: "idle" | "hover" | "pressed"): void {
    const spriteSettings = this.settings[state];
    if (spriteSettings) {
      this.sprite.setTexture(spriteSettings.spriteSource);
      this.sprite.applySettings(spriteSettings);
    }
  }
}
