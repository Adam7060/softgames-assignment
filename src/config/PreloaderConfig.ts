export const PreloaderConfig = {
  bar: {
    width: 600,
    height: 30,
    radius: 8,
    backgroundColor: 0x000000,
    backgroundAlpha: 0.3,
    fillColor: 0xffffff,
  },
  continueText: {
    text: "Click to Continue",
    style: {
      fill: "#ffffff",
      fontSize: 40,
      fontWeight: "bold" as const,
    },
  },
  landscape: {
    bar: { x: 980, y: 720 },
    continueText: { x: 1280, y: 720 },
  },
  portrait: {
    bar: { x: 420, y: 1280 },
    continueText: { x: 720, y: 1280 },
  },
  assets: [
    { alias: "button_default", src: "assets/ui/button_default.png" },
    { alias: "button_hover", src: "assets/ui/button_hover.png" },
    { alias: "button_pressed", src: "assets/ui/button_pressed.png" },
    { alias: "button_close_default", src: "assets/ui/button_close_default.png" },
    { alias: "button_close_hover", src: "assets/ui/button_close_hover.png" },
    { alias: "button_close_pressed", src: "assets/ui/button_close_pressed.png" },
  ],
};
