import { ButtonSettings } from "../core/Button";

export const MenuConfig = {
  playButton: {
    name: "play-button",
    idle: { spriteSource: "button_default" },
    hover: { spriteSource: "button_hover" },
    pressed: { spriteSource: "button_pressed" },
    buttonText: {
      text: "Play",
      style: { fill: "#ffffff", fontSize: 36, fontWeight: "bold" },
    },
  } as ButtonSettings,
  landscape: {
    playButton: { x: 1130, y: 670 },
  },
  portrait: {
    playButton: { x: 570, y: 1230 },
  },
};
