# Vite + RSC

This example shows how to set up a React application with [Server Component](https://react.dev/reference/rsc/server-components) features on Vite using [`@vitejs/plugin-rsc`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc/examples/starter)

```sh
# run dev server
npm run dev

# build for production and preview
npm run build
npm run preview
```

## API usage

See [`@vitejs/plugin-rsc`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc) for the documentation.

- [`vite.config.ts`](./vite.config.ts)
  - `@vitejs/plugin-rsc/plugin`
- [`./src/framework/entry.rsc.tsx`](./src/framework/entry.rsc.tsx)
  - `@vitejs/plugin-rsc/rsc/server`
  - `import.meta.viteRsc.loadModule`
- [`./src/framework/entry.ssr.tsx`](./src/framework/entry.ssr.tsx)
  - `@vitejs/plugin-rsc/ssr`
  - `getClientEntryUrl`
  - `rsc-html-stream/server`
- [`./src/framework/entry.browser.tsx`](./src/framework/entry.browser.tsx)
  - `@vitejs/plugin-rsc/browser`
  - `rsc-html-stream/client`

## Notes

- [`./src/framework/entry.{browser,rsc,ssr}.tsx`](./src/framework) (with inline comments) provides an overview of how low level RSC (React flight) API can be used to build RSC framework.
- You can use [`vite-plugin-inspect`](https://github.com/antfu-collective/vite-plugin-inspect) to understand how `"use client"` and `"use server"` directives are transformed internally.

## Cloudflare Workers

The app runs on [Cloudflare Workers](https://developers.cloudflare.com/workers/) via [`@cloudflare/vite-plugin`](https://developers.cloudflare.com/workers/vite-plugin/).

The app is split into two Workers:

- `rsc` Worker ([`wrangler.jsonc`](./wrangler.jsonc), entry [`./src/framework/entry.rsc.tsx`](./src/framework/entry.rsc.tsx)): renders RSC, handles server actions and serves static assets (`dist/client`).
- `ssr` Worker ([`wrangler.ssr.jsonc`](./wrangler.ssr.jsonc), entry [`./src/framework/entry.ssr.tsx`](./src/framework/entry.ssr.tsx)): renders HTML. It is called from the `rsc` Worker through the `SSR` service binding.

```sh
# run dev server (in workerd)
npm run dev

# build and preview in workerd
npm run build
npm run preview

# type check
npm run typecheck

# regenerate worker-configuration.d.ts after changing wrangler config
npm run cf-typegen

# deploy (ssr Worker first, since rsc Worker binds to it)
npx wrangler login   # once
npm run deploy
```

Notes:

- Worker names are `react-vite-rsc` and `react-vite-rsc-ssr`. Change `name` in both wrangler configs (and the `service` in `wrangler.jsonc`) if you want different names.
- The in-memory server counter in [`./src/action.tsx`](./src/action.tsx) is per isolate, so it is not shared across Workers instances.
- Local secrets go in `.dev.vars` (git-ignored).
