## erb-palette-example

An example of [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) using [Palette](https://palette.dev).

## Setup

```bash
git clone https://github.com/amilajack/erb-palette-example
cd erb-palette-example
npm install
npm start
```

## Getting Started

1. Replace `YOUR_API_KEY` with your API key, which you can find at `palette.dev/{your-username}/{your-project}/settings`.

2. Build and run the app. Palette only reports metrics in production.

```bash
npm run package
open release/build/mac/ElectronReact.app
```

3. Review **[this commit](https://github.com/amilajack/erb-palette-example/commit/HEAD)** for the palette-related changes.

The important changes are in `App.tsx` and `main.ts`.
