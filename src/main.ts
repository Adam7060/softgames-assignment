import { Application, Text } from 'pixi.js';

const app = new Application();

async function init() {
  await app.init({
    background: '#1a1a2e',
    resizeTo: window,
  });

  document.body.appendChild(app.canvas);

  const text = new Text({
    text: 'SoftGames Assignment',
    style: { fill: '#ffffff', fontSize: 32 },
  });
  text.anchor.set(0.5);
  text.x = app.screen.width / 2;
  text.y = app.screen.height / 2;
  app.stage.addChild(text);
}

init();
