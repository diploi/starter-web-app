<img alt="icon" src=".diploi/icon.svg" width="32">

# Web App Starter Kit for Diploi

[![launch with diploi badge](https://diploi.com/launch.svg)](https://diploi.com/starter-kit/web-app)
[![component on diploi badge](https://diploi.com/component.svg)](https://diploi.com/starter-kit/web-app)
[![latest tag badge](https://badgen.net/github/tag/diploi/starter-web-app)](https://diploi.com/starter-kit/web-app)

A production-ready React Router + Supabase starter that showcases SSR, runtime ENV wiring, Tailwind CSS styling, and Supabase-backed data flows.

This starter kit demonstrates:

- 🔐 Supabase API access with typed helpers
- ⚡️ React Router SSR + Vite dev experience
- 🎨 Tailwind CSS styling with sensible defaults
- 🗄️ Supabase migrations, seeds, and Edge Functions
- 🧩 Diploi-managed components, ENV, and deployment automation

---

## ✨ Overview

This starter kit consists of two Diploi components configured in [diploi.yaml](diploi.yaml):

- **`react`** — React Router application (Vite, SSR, Tailwind, TypeScript)
- **`supabase`** — Database, auth, migrations, seed data, Edge Functions

Diploi automatically wires the components together by injecting `SUPABASE_URL` and `SUPABASE_ANON_KEY` into the React component at runtime. No manual `.env` files are required in any environment.

---

## 🧱 Architecture

### 1️⃣ React (React Router) Component

- Based on the Diploi [react-vite](https://github.com/diploi/component-react-vite) component and the official React Router starter.
- The app shell lives in [app/root.tsx](app/root.tsx) with SSR, streaming, and document links already configured.
- Runtime environment variables load through the route `loader` exported from [app/lib/useEnv.ts](app/lib/useEnv.ts), ensuring the browser only receives the variables Diploi injects.
- [app/lib/useSupabase.ts](app/lib/useSupabase.ts) exposes a singleton Supabase browser client backed by those ENV variables.
- The landing view in [app/welcome/welcome.tsx](app/welcome/welcome.tsx) explains Diploi development workflow and renders a Supabase-powered todo demo via [app/welcome/supabase.tsx](app/welcome/supabase.tsx).
- Styling is handled with Tailwind CSS (already wired up through Vite) plus a minimal set of custom classes inside [app/app.css](app/app.css).

#### Environment Variables

Access ENV values with the `useEnv` helper hook.

### 2️⃣ Supabase Component

- Based on the Diploi [supabase](https://github.com/diploi/component-supabase) component.
- Ships with a `todos` table defined in [supabase/migrations/20260120083000_todo.sql](supabase/migrations/20260120083000_todo.sql) and sample rows in [supabase/seed.sql](supabase/seed.sql).
- Includes Edge Functions scaffolding inside [supabase/functions](supabase/functions) with a `main` router ([supabase/functions/main/index.ts](supabase/functions/main/index.ts)) and a `hello` example ([supabase/functions/hello/index.ts](supabase/functions/hello/index.ts)).
- Works seamlessly with the Supabase Studio bundled in the component. Diploi exposes the correct connection strings via the Diploi Console.

---

## 💡 Docs

- [React Router](https://reactrouter.com)
- [Diploi Remote Development](https://diploi.com/dev)
- [diploi.yaml reference](https://diploi.com/yaml)
- [Supabase CLI & migrations](./supabase/README.md)

Build something great! 🚀
