import { Application, Text } from 'pixi.js';
import { GameView, ResizeData } from './views/GameView';
import { ResolutionConfig } from './config/Resolution';
import { Dispatcher, Events } from './core/Dispatcher';

const app = new Application();

async function boot() {
  await app.init({
    background: '#000000',
  });

  document.body.appendChild(app.canvas);

  const gameView = new GameView(app);

  const text = new Text({
    text: 'SoftGames Assignment',
    style: { fill: '#ffffff', fontSize: 48 },
  });
  text.anchor.set(0.5);

  Dispatcher.on(Events.RESIZE, (data) => {
    const resizeData = data as ResizeData;
    const config = resizeData.orientation === 'landscape'
      ? ResolutionConfig.landscape
      : ResolutionConfig.portrait;

    text.x = config.width / 2;
    text.y = config.height / 2;
  });

  gameView.getGameView().addChild(text);
  gameView.resize();
}

boot();
