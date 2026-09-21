Single-page application for managing learning content and tracking employee progress.
Built with React 19 + TypeScript on Vite, with TanStack Router for navigation, TanStack Query for
server state, Firebase (Auth + Firestore) as the backend and a WebSocket-based chat module.

 **Live demo:** https://courses-five-jade.vercel.app/

---

## Features

- **Authentication** — Google sign-in via Firebase Auth. On the first login a user profile is
  created in Firestore automatically.
- **Protected routes** — route guards in TanStack Router (`beforeLoad`): unauthenticated users are
  redirected to `/auth/login`, authenticated ones away from the auth pages.
- **Course catalog** — content tabs (`Course` / `Lecture` / `Quiz`), search by title and filtering
  by author, data loaded and cached with TanStack Query.
- **Progress tracking** — table of employee progress with filters and pagination.
- **Classroom chat** — real-time messaging over WebSocket (`wss://ws.ifelse.io`) with a single
  shared connection, message list and send form.
- **UI system** — reusable components on Tailwind CSS, Base UI primitives and `lucide-react` icons,
  with a custom color/typography theme.
- **Strict typing** — 100% TypeScript, no `any` in the codebase.

## Routes

| Path | Page | Access |
| --- | --- | --- |
| `/` | redirect to `/auth/login` | public |
| `/auth/login` | Login | guests only |
| `/courses` | Course catalog | authorized |
| `/progress` | Progress table | authorized |
| `/classroom` | Classroom + WebSocket chat | authorized |

## Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Routing:** TanStack Router (type-safe routes, nested layouts, route guards)
- **Server state:** TanStack Query v5 (fetching, caching, invalidation)
- **UI & styling:** Tailwind CSS, Base UI / shadcn-style components, lucide-react, Geist font
- **Backend:** Firebase Auth (Google provider) + Cloud Firestore
- **Realtime:** native WebSocket API (`wss://ws.ifelse.io`)

## Project Structure

```
src/
├── app-level/
│   ├── App.tsx              # QueryClientProvider + RouterProvider
│   ├── main.tsx             # entry point
│   └── router.tsx           # route tree, auth guards
├── config/
│   └── firebase.ts          # Firebase initialization (app, auth, db)
├── layouts/                 # RootLayout, AuthLayout, MainLayout
├── pages/                   # Courses, Progress, Classroom, LoginPage
├── features/                # feature-sliced modules
│   ├── auth/                # components, hooks, services, types
│   ├── courses/
│   ├── progress/
│   └── classroom/
├── components/
│   ├── ui/                  # reusable UI primitives (Button, Pagination, icons)
│   └── navigation/          # Header, Sidebar
├── hooks/                   # shared hooks (usePagination)
└── utils/                   # formatter, sanitize
```

Each feature follows the same internal layout: `components/` (presentation),
`hooks/` (logic and state), `services/` (Firestore / WebSocket access), `types/` (contracts),
`index.ts` (public API of the module).

## Dependencies

### Production

| Package | Purpose |
| --- | --- |
| `react`, `react-dom` | UI framework (v19) |
| `@tanstack/react-router` | Type-safe routing |
| `@tanstack/router-vite-plugin` | Router integration for Vite |
| `@tanstack/react-query` | Async server state, caching, invalidation |
| `firebase` | Auth + Cloud Firestore |
| `@base-ui/react` | Headless UI primitives |
| `shadcn` | Component generator CLI/registry |
| `class-variance-authority`, `cn` | Variant-based and conditional class names |
| `lucide-react` | Icon set |
| `tw-animate-css` | Tailwind animation utilities |
| `@fontsource-variable/geist` | Self-hosted variable font |

### Development

| Package | Purpose |
| --- | --- |
| `vite`, `@vitejs/plugin-react` | Dev server and production bundler |
| `typescript`, `typescript-eslint` | Static typing and TS linting |
| `tailwindcss`, `postcss`, `autoprefixer` | CSS framework and processing |
| `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals` | Code quality |
| `@types/node`, `@types/react`, `@types/react-dom` | Type definitions |

## Getting Started

**Requirements:** Node.js 20+ and npm.

1. **Clone the repository**
   ```bash
   git clone https://github.com/nanaezzze-star/courses.git
   cd courses
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `.env.local` in the project root based on `.env.example` and fill it with your
   Firebase project credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

   In the Firebase console enable **Authentication → Google** and create the Firestore
   collections `course`, `progress` and `users`.

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   The app runs at http://localhost:5173.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

## Vite Configuration

- `@vitejs/plugin-react` for React Fast Refresh
- `@` alias resolved to `./src`
- environment variables exposed through the `VITE_` prefix

## Deployment

Deployed on **Vercel**. `vercel.json` contains an SPA rewrite so that client-side routes
(`/courses`, `/progress`, `/classroom`) resolve correctly on a hard refresh:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Build command: `npm run build` — output directory: `dist`.
Environment variables must be added in the Vercel project settings.

**Live demo:** https://courses-five-jade.vercel.app/
