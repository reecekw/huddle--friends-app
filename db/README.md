# Database

This folder contains SQL scripts to create and populate the BB Find a Friend database.

## Tables (ERD)

- **users** – App users
- **personality_results** – Personality test submissions (q1–q4 slider values)
- **chat_groups** – Chat groups
- **group_members** – Members of each group
- **reviews** – User reviews on the home page
- **messages** – Chat messages

## Local setup (SQLite)

From the project root:

```sh
npm run server:setup
```

This installs the server dependencies and creates `db/app.db` by running `schema.sql` and `seed.sql` via the init script.

## Manual setup

To run the scripts manually against SQLite:

```sh
sqlite3 db/app.db < db/schema.sql
sqlite3 db/app.db < db/seed.sql
```

For PostgreSQL or MySQL, you may need to adapt the schema (e.g., `AUTOINCREMENT` → `SERIAL`, `datetime('now')` → `NOW()`).
