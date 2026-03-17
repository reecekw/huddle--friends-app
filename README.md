# Huddle

Huddle is a full-stack prototype for helping people meet new friends through a short onboarding flow, a personality quiz, and group-based chat experiences. The original project idea in the repo is "BB Find a Friend"; the current UI branding is `Huddle`.

## What This Project Does

The app is designed around a simple flow:

1. A user lands on the marketing page
2. They complete a short profile form
3. They take a 4-question personality quiz
4. Their quiz answers are saved to a SQLite database through an Express API
5. They are taken to a chat experience with mock friend groups

At the moment, the personality quiz submission is the main working frontend-to-backend vertical slice. The rest of the experience is primarily UI/demo behavior.

## Current Feature Set

### Implemented

- Landing page with product messaging and testimonial carousel
- Onboarding form for basic profile details
- Client-side login state stored in `localStorage`
- Light/dark theme toggle stored in `localStorage`
- 4-question personality quiz
- Express API for saving quiz responses
- SQLite persistence for `personalitytest` and `personalityquestion`
- Chat list and chat conversation UI

### Not Fully Implemented Yet

- Real authentication or password handling
- Real user account creation
- Real matching logic
- Database-backed chat/group rendering
- Real-time messaging
- Production deployment setup
- Meaningful automated test coverage

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 18, TypeScript, Vite, React Router |
| UI | Tailwind CSS, shadcn/ui, Radix UI, Lucide |
| Backend | Node.js, Express |
| Database | SQLite via `better-sqlite3` |
| Tooling | ESLint, Vitest, Testing Library |

## Architecture Overview

```text
Browser
  -> React + Vite frontend (`src/`) on http://localhost:8080
  -> Express API (`server/server.js`) on http://localhost:3001
  -> SQLite database (`db/app.db`)
```

### Personality Quiz Flow

1. The user completes the 4 quiz questions in `src/pages/PersonalityTest.tsx`
2. The frontend sends `POST /api/personality-results`
3. The Express server validates `q1` through `q4`
4. The server inserts one row into `personalitytest`
5. The server inserts one row per answer into `personalityquestion`
6. The frontend shows a completion screen and routes the user to chats

## Repository Structure

```text
src/                Frontend app
src/pages/          Route-level pages
src/components/     Shared app components/providers
src/components/ui/  shadcn/ui component library
server/             Express server and DB init script
db/                 SQLite schema, seed data, and generated DB file
public/             Static assets
```

## Prerequisites

- Node.js 18+
- npm 9+

Check your versions:

```sh
node --version
npm --version
```

No separate database server is required because SQLite is file-based.

## Installation

From the project root:

```sh
npm install
npm run server:setup
```

What `npm run server:setup` does:

- installs backend dependencies in `server/`
- creates `db/app.db`
- runs `db/schema.sql`
- runs `db/seed.sql`

## Running Locally

Start the backend in one terminal:

```sh
npm run server
```

Start the frontend in a second terminal:

```sh
npm run dev
```

Local URLs:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3001`

## Available Scripts

### Root

```sh
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run server
npm run server:init
npm run server:setup
```

### Server

Inside `server/`:

```sh
npm run start
npm run init-db
```

## Configuration

There is no `.env` file in the repo today.

Current config behavior:

- The backend defaults to `PORT=3001`
- The frontend dev server runs on port `8080`
- Vite proxies `/api` requests to `http://localhost:3001`

If you change the backend port, you also need to update the proxy target in `vite.config.ts`.

Example:

```sh
PORT=3002 npm run server
```

Then update `vite.config.ts` so `/api` points to `http://localhost:3002`.

## Database Notes

The database schema includes tables for:

- `user`
- `reviews`
- `groupchat`
- `message`
- `user_groupchat`
- `templatePersonalityTest`
- `templatePersonalityQuestion`
- `personalitytest`
- `personalityquestion`

Important note: while the schema includes users, reviews, groups, and messages, the current frontend only writes live data to the personality-test tables. The chat UI currently uses mock frontend data.

## API Endpoints

### `POST /api/personality-results`

Accepts:

```json
{
  "q1": 50,
  "q2": 3,
  "q3": 50,
  "q4": 50
}
```

Behavior:

- validates all four values are numbers
- inserts quiz data into SQLite
- returns the created `personalitytest` row plus `totalSubmissions`

### `GET /api/personality-results/count`

Returns the total number of rows in `personalitytest`.

## How To Verify The Working Vertical Slice

1. Run the frontend and backend locally
2. Open `http://localhost:8080`
3. Click `Get Started`
4. Fill in at least first name and city
5. Complete the personality quiz
6. Submit the final question

Expected result:

- you should see the completion screen
- the backend should save a new quiz submission
- the chats screen should be accessible after the quiz flow

To confirm the database changed:

```sh
sqlite3 db/app.db "SELECT id, results FROM personalitytest ORDER BY id DESC LIMIT 5;"
```

To confirm the API count endpoint:

```sh
curl http://localhost:3001/api/personality-results/count
```

Because the database is stored in `db/app.db`, quiz submissions persist between app restarts unless that file is deleted.

## Testing

Run:

```sh
npm run test
```

Note: the repo currently contains only a placeholder example test, so passing tests do not provide meaningful feature coverage yet.

## Known Limitations

- App naming is inconsistent across the repo (`Huddle`, `BB Find a Friend`, and `kindred-connect-server`)
- The current "login" flow is only local state and not secure authentication
- Chat groups and messages are mock data in the frontend
- Seed data is not designed as a full production migration system
- Re-running database initialization may cause duplicate seed rows or constraint issues depending on the current database state
- `better-sqlite3` is a native dependency, so install issues may require local build tooling on some machines

## Future Improvements

- Connect onboarding data to persistent user records
- Replace mock chat data with database-backed queries
- Add real authentication and session handling
- Implement actual friend-group matching logic
- Add stronger test coverage for the frontend and API
