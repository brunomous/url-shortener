# URL Shortener

A small URL shortening service built with Express, TypeScript, and PostgreSQL. Long URLs are hashed and mapped to readable, human-friendly slugs like `amber-alpine-brook`.

## How it works

- A URL is hashed with SHA-256, and three slices of that hash are mapped onto word lists (adjective, connector, noun) to produce a deterministic slug.
- The hash is unique, so submitting the same URL twice returns the existing short URL instead of creating a duplicate.
- Incoming requests are validated with Zod via a reusable middleware before reaching the controllers.

## Tech stack

- **Runtime:** Node.js (ESM) + TypeScript
- **Web:** Express 5
- **Database:** PostgreSQL (`pg`)
- **Cache:** Redis (provisioned via Docker, not yet wired in)
- **Validation:** Zod
- **Tooling:** tsx, ESLint, Prettier, Vitest + Supertest

## API

| Method | Route     | Description                                  |
| ------ | --------- | -------------------------------------------- |
| `POST` | `/`       | Create a short URL. Body: `{ "url": "..." }` (must be a valid URL). Returns `{ "shortUrl": "..." }`. |
| `GET`  | `/:slug`  | Redirect (302) to the original URL.          |

Invalid input returns `400` with the validation errors.

Example:

```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/"}'
```

## Getting started

### Prerequisites

- Node.js and Yarn
- Docker (for PostgreSQL and Redis)

### Setup

```bash
yarn install
cp .env.example .env

# Start the database and cache, then create/seed the schema
yarn setup

# Run in watch mode
yarn dev
```

The server listens on port `3000` by default (`PORT` env var to override).

## Scripts

| Script         | Description                                        |
| -------------- | -------------------------------------------------- |
| `yarn dev`     | Start the server in watch mode (tsx)               |
| `yarn build`   | Compile TypeScript to `dist/`                      |
| `yarn start`   | Build and run the compiled server                  |
| `yarn compose` | Start PostgreSQL and Redis via Docker Compose      |
| `yarn seed`    | Drop, recreate, and seed the `urls` table          |
| `yarn setup`   | Start containers (detached) and seed the database  |
| `yarn test`    | Run integration tests (Vitest + Supertest)         |
| `yarn lint`    | Run ESLint (`lint:fix` to autofix)                 |

## Environment variables

See `.env.example`:

```
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres
POSTGRES_PORT=5432
REDIS_PORT=6379
```

## Project structure

```
src/
  app.ts            Express app and middleware
  index.ts          Server entry point
  routes/           Route definitions
  middleware/       Zod validation middleware
  schemas/          Zod request schemas
  controllers/      Request handlers
  services/         Business logic (shortening, hashing, logging)
  repositories/     Database queries
  db/               Pool, schema, scripts, seeding
  constants/        Word lists for slug generation
tests/integration/  API tests
```

## License

MIT
