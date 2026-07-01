# CatSensor public website

## Local development

This project requires Node.js 22.18 or newer. If you use `nvm`:

```sh
nvm install
nvm use
npm ci
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

`npm run build` prerenders six localized pages and validates that none of them are empty SSG shells. `npm run preview` serves `dist` with the same directory-index and trailing-slash behavior used by GitHub Pages.

Do not open files under `dist` directly with a `file://` URL. If using VS Code Live Server, configure `dist` itself as the server root; otherwise absolute `/assets/...` URLs will point at the wrong directory. The recommended preview command is `npm run preview`.

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
