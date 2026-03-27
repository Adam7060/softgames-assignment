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
      fontSize: 80,
      fontWeight: "bold" as const,
    },
    width: 500,
  },
  landscape: {
    bar: { x: -300, y: 0 },
    continueText: { x: 0, y: 0 },
  },
  portrait: {
    bar: { x: -300, y: 0 },
    continueText: { x: 0, y: 0 },
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
