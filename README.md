# 🌩️ Thunderstorm Simulator

A browser-based thunderstorm experience built with React and Vite. This immersive simulation syncs thunder sounds with lightning flashes, creating a realistic and atmospheric storm loop — perfect for ambient installations, Halloween setups, or just geeking out over weather phenomena.

**GitHub Repository:** [autisticgeek/thunderstorm](https://github.com/autisticgeek/thunderstorm)

## 📝 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software for personal or commercial purposes, provided that the original license is included.

## ⚙️ Tech Stack

| Tool     | Purpose                         |
| -------- | ------------------------------- |
| React 19 | UI framework                    |
| Vite 7   | Fast dev/build tooling          |
| ESLint   | Code linting and quality checks |

## 🚀 Features

- ⚡ **Flash-to-thunder syncing**: Thunder sounds are selected and delayed based on flash intensity.
- 🔊 **Dynamic audio mixing**: Volume and timing adapt to storm conditions, simulating distance-based attenuation.
- 🖱️ **Idle cursor hiding**: Cursor disappears after inactivity for immersive fullscreen mode.
- 🧠 **Modular architecture**: Declarative components and maintainable state logic.
- 🔓 **Sound unlock overlay**: Thunder audio is gated behind user interaction (click or spacebar), with a 10-second opt-out window for visuals-only mode.
- ⌨️ **Spacebar mute toggle**: Pressing space toggles thunder audio on/off.
- 🧼 **Ref-based mute logic**: Prevents stale closures from triggering thunder after mute is engaged.

## 📦 Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Launches the Vite dev server    |
| `npm run build`   | Builds the production bundle    |
| `npm run preview` | Previews the production build   |
| `npm run lint`    | Runs ESLint across the codebase |

## 🧰 Getting Started

```bash
# Clone the repo
git clone https://github.com/autisticgeek/thunderstorm

# Install dependencies
npm install

# Start the dev server
npm run dev
