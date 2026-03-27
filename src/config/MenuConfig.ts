import { ButtonSettings } from "../core/Button";
import { getGradientFill } from "../core/Utils";

const buttonTextStyle = {
  fontSize: 72,
  fontWeight: "bold" as const,
  fill: getGradientFill(36, [0, 1], [0xe0e0e0, 0x909090]),
  dropShadow: { angle: 1.5, color: 0x202020, distance: 2 },
  stroke: { color: "#303030", width: 3, join: "round" as const },
};

const buttonBase = {
  idle: { spriteSource: "button_default" },
  hover: { spriteSource: "button_hover" },
  pressed: { spriteSource: "button_pressed" },
};

export const MenuConfig = {
  aceOfShadows: {
    ...buttonBase,
    name: "ace-of-shadows-button",
    buttonText: {
      text: "1. Ace of Shadows",
      style: buttonTextStyle,
      maxWidth: 550,
      maxHeight: 120,
    },
  } as ButtonSettings,
  magicWords: {
    ...buttonBase,
    name: "magic-words-button",
    buttonText: {
      text: "2. Magic Words",
      style: buttonTextStyle,
      maxWidth: 550,
      maxHeight: 120,
    },
  } as ButtonSettings,
  phoenixFlame: {
    ...buttonBase,
    name: "phoenix-flame-button",
    buttonText: {
      text: "3. Phoenix Flame",
      style: buttonTextStyle,
      maxWidth: 550,
      maxHeight: 120,
    },
  } as ButtonSettings,
  landscape: {
    aceOfShadows: { x: 0, y: -240 },
    magicWords: { x: 0, y: 0 },
    phoenixFlame: { x: 0, y: 240 },
  },
  portrait: {
    aceOfShadows: { x: 0, y: -240 },
    magicWords: { x: 0, y: 0 },
    phoenixFlame: { x: 0, y: 240 },
  },
};
