import { ButtonSettings } from "../core/Button";
import { getGradientFill } from "../core/Utils";

const buttonTextStyle = {
  fontSize: 72,
  fontWeight: "bold" as const,
  fill: getGradientFill(36, [0, 1], [0xffd760, 0xffb020]),
  dropShadow: { angle: 1.5, color: 0x5b3100, distance: 2 },
  stroke: { color: "#5b3100", width: 3, join: "round" as const },
};

export const MenuConfig = {
  playButton: {
    name: "play-button",
    idle: { spriteSource: "button_default" },
    hover: { spriteSource: "button_hover" },
    pressed: { spriteSource: "button_pressed" },
    buttonText: {
      text: "Play",
      style: buttonTextStyle,
      maxWidth: 550,
      maxHeight: 120,
    },
  } as ButtonSettings,
  landscape: {
    playButton: { x: 1280, y: 720 },
  },
  portrait: {
    playButton: { x: 720, y: 1280 },
  },
};
