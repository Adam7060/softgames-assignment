# SoftGames Assignment

A Pixi.js v8 interactive application featuring three game tasks, built with TypeScript and Vite.

## Tech Stack

- **Pixi.js v8** — 2D WebGL rendering
- **TypeScript** — strict mode
- **Vite** — dev server and bundler

## Getting Started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/`

## Project Structure

```
src/
├── main.ts                    — entry point, boots the game
├── Game.ts                    — root class, owns pixi application, resize handling
├── core/
│   ├── BaseContainer.ts       — pixi container with settings-driven apply()
│   ├── Scene.ts               — base scene class, listens to resize events
│   ├── GameSprite.ts          — pixi sprite wrapper with settings (anchor 0.5 default)
│   ├── GameText.ts            — pixi text wrapper with settings (anchor 0.5 default)
│   ├── Button.ts              — interactive button with idle/hover/pressed states
│   └── Dispatcher.ts          — global event emitter
├── scenes/
│   ├── Preloader.ts           — loading screen, loads assets with progress bar
│   └── Menu.ts                — main menu with task buttons
├── config/
│   ├── Resolution.ts          — landscape (2560x1440) and portrait (1440x2560)
│   ├── GameConfig.ts          — game-level settings (background color)
│   ├── PreloaderConfig.ts     — preloader bar, text, and asset definitions
│   ├── MenuConfig.ts          — menu button settings and layout
│   └── Events.ts              — event name constants
└── public/
    └── assets/
        └── ui/                — button sprites (default, hover, pressed, close)
```

## Architecture

### Core Classes

**BaseContainer** extends `PIXI.Container` — adds a settings-driven `apply()` method for position, scale, and dimensions. All containers inherit from this.

**Scene** extends `BaseContainer` — base class for all scenes. Automatically listens to resize events and provides an `onResize()` hook for subclasses.

**GameSprite** extends `PIXI.Sprite` — wraps sprite creation with a settings interface (`spriteSource`, `anchor`, `scale`, `x`, `y`). Default anchor is centered (0.5).

**GameText** extends `PIXI.Text` — wraps text creation with a settings interface (`text`, `style`, `anchor`, `scale`, `x`, `y`, `width`, `height`). Default anchor is centered (0.5).

**Button** extends `BaseContainer` — interactive button with three visual states (idle, hover, pressed). Each state is a `GameSpriteSettings` object. Supports optional `GameTextSettings` label and a callback.

**Dispatcher** — singleton event emitter with `on`, `once`, `off`, `emit`. Used for resize and orientation change events.

### Config System

All hardcoded values live in `src/config/`. Scenes read settings from config objects. Layout configs support `landscape` and `portrait` variants for orientation-specific positioning.

### Resize System

`Game.resize()` calculates the scale and offset to fit the canvas to the window while preserving the target resolution. It emits `RESIZE` and `ORIENTATION_CHANGE` events via the Dispatcher. Scenes override `onResize()` to handle orientation-specific layout from config.

### Flow

1. `main.ts` creates `Game` and calls `boot()`
2. `Game` initializes the pixi application, sets up containers and resize handling
3. `Preloader` loads assets and shows progress
4. On completion, user clicks anywhere to continue to `Menu`
5. `Menu` presents task buttons

## Tasks

### 1. Ace of Shadows
144 card sprites stacked like a deck. Every 1 second the top card animates to a second stack over 2 seconds.

### 2. Magic Words
Text and image rendering system for dialogue with inline custom emojis. Data fetched from an API endpoint.

### 3. Phoenix Flame
Fire particle effect using sprite-based particles, limited to 10 sprites on screen at a time.
