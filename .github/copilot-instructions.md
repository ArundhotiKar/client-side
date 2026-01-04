# Copilot / AI Agent Instructions — client-side

Summary
- This repo is a two-part app: a Vite + React SPA (`client-side`) and a small Express/Mongo backend (`server-side`). The client is the primary focus for UI work (React pages/components, Tailwind CSS), while the server exposes simple REST endpoints the client consumes.

Key locations
- `src/router/router.jsx`: central routing structure (nested routes under `HomePage`). Use this to understand pages and protected routes.
- `src/Provider/AuthProvider.jsx`: application auth context. Use `AuthContext` (keys: `user`, `createUser`, `logIn`, `logOut`, `googleLogin`, `loading`) for authentication-aware UI and API calls.
- `src/Firebase/firebase.config.js`: Firebase initialization using Vite env vars (`VITE_FIREBASE_*`). Do not hardcode keys — use `import.meta.env` values.
- `src/page/` and `src/component/`: primary page views and reusable UI components (examples: `ListDetailsPage.jsx`, `AddList.jsx`, `MyLists.jsx`). Inspect these for state, network, and styling patterns.
- `public/products.json`: sample product data used by UI examples.
- `server-side/index.js`: server API surface — read this to match API paths and expected payloads.

Big-picture architecture & data flow
- Client is a single-page React app bootstrapped by Vite (`npm run dev`), using React Router (v6 createBrowserRouter) and an `AuthProvider` for authentication state.
- Server is an Express app connecting to MongoDB. Client fetches directly from `https://assignment10-chi.vercel.app` endpoints (no API proxy configured). Common endpoints:
  - GET `/addlist` — get all lists
  - GET `/addlist/:id` — get one list (used by `ListDetailsPage.jsx`)
  - POST `/addlist` — create a listing
  - POST `/addoder` — create an order
  - GET `/myadded-lists?email=` — fetch user's lists
  - PUT `/update/:id` — update a listing
  - DELETE `/list/:id` — delete

Environment & run instructions (developer flows)
- Client (UI)
  - Install: `cd client-side` then `npm install`
  - Dev server: `npm run dev` (Vite) — app typically served on `http://localhost:5173`
  - Build: `npm run build`; Preview: `npm run preview`
- Server (API)
  - Install: `cd server-side` then `npm install`
  - Env: create `.env` with `MONGO_URL=<mongo connection string>`
  - Start: `npm start` (uses `nodemon index.js`) — listens on port `5000`
- Typical debug run: start server (port 5000) in one terminal, then run client dev server in another terminal. The client expects the API at `https://assignment10-chi.vercel.app`.

Project-specific conventions & patterns
- Environment variables
  - Client: uses Vite `import.meta.env.VITE_*` variables for Firebase. Keep env names prefixed with `VITE_`.
  - Server: uses `process.env.MONGO_URL` from a `.env` in `server-side`.
- Routing/protection: `src/router/PrivateRoute.jsx` wraps protected pages (e.g., `/listing/:id`). Use `AuthContext` to determine access.
- Network: code uses both native `fetch` (see `ListDetailsPage.jsx`) and has `axios` in dependencies. Follow existing file patterns: if a file uses `fetch`, keep consistent unless refactoring across the codebase.
- Styling: Tailwind + DaisyUI utilities; className-based styling is used throughout — preserve class patterns when adding components.
- Forms & modals: Many pages use controlled/uncontrolled inputs and modal overlays (see `ListDetailsPage.jsx` for an example modal form pattern and optimistic UI assumptions).

Integration points / external dependencies
- Firebase Auth (client) — see `src/Firebase/firebase.config.js` and `AuthProvider.jsx` for sign-in flows (email/password and Google popup).
- MongoDB via `server-side/index.js` — server performs DB operations directly; collection names: `lists` and `oderList`.
- No CI/test harness configured; `server-side` has no tests; client has ESLint configured (`npm run lint`).

Agent guidance & safety checks
- When changing API routes: update `server-side/index.js` first and then update all client calls (search `https://assignment10-chi.vercel.app` occurrences).
- Use existing context hooks: prefer `AuthContext` for user info instead of reading `localStorage` or re-querying Firebase.
- Do not hardcode secrets. Client Firebase keys must remain in Vite env vars, server DB URL must stay in `.env`.
- When editing UI routes, update `src/router/router.jsx` so Nav and route structure stay consistent.

Examples (quick answers)
- To fetch a listing by id (client): `fetch('https://assignment10-chi.vercel.app/addlist/' + encodeURIComponent(id))` — see `ListDetailsPage.jsx` for error handling and mount safety pattern.
- To add a listing (server): POST JSON to `/addlist` — server will add `createdAt`.
- To run both dev servers locally: open two terminals, run `cd server-side; npm start` and `cd client-side; npm run dev`.

If anything here is unclear or you want the agent to add conventions (lint/format rules, CI, or API client utilities), tell me which parts to expand or enforce and I will update this file.
