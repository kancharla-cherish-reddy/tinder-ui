# DevTinder UI

DevTinder is a small developer networking app. Members create a profile, browse other developers, send or pass on connection requests, review incoming requests, and see accepted connections.

The UI is a React single-page app. The API lives in the separate [`tinder-server`](https://github.com/kancharla-cherish-reddy/tinder-server) repository. See [DEVELOPMENT.md](DEVELOPMENT.md) for the cross-project architecture, API contract, workflow notes, and current verification status.

## Features

- Sign up and sign in with an email and password.
- Restore a signed-in session from the server's HTTP-only cookie.
- Edit the profile fields allowed by the backend schema.
- Discover developer profiles and choose **Connect** or **Pass**.
- Review incoming connection requests and accept or decline them.
- View accepted connections.
- Responsive layout for desktop and mobile widths.

## Run locally

Requirements: Node.js, npm, and a running instance of the API with its MongoDB connection configured. Start the API first; see the server repository's README.

```sh
npm install
npm run dev
```

Vite normally starts at `http://localhost:5173`. If it reports another port, an earlier process is already using the default port. Stop the old Vite process from the terminal that started it, then restart Vite if you want the app on `5173`.

In development, API requests use the `/api` path and Vite proxies them to `http://localhost:3000`. The proxy removes `/api` before forwarding the request. For a deployed UI, set `VITE_API_URL` to the API's base URL.

## Main screens

| Route | Screen |
| --- | --- |
| `/login` | Sign in or create an account |
| `/` | Developer discovery feed |
| `/profile` | Edit profile with a live card preview |
| `/requests` | Incoming requests to accept or decline |
| `/connections` | Accepted connections |

The app redirects unauthenticated visitors to `/login` and restores the user by calling `GET /profile/view` before showing protected pages.

## Data and profile editing

The server owns validation and allowed fields. A profile can contain first and last name, optional age (18–120), about text (up to 500 characters), a photo URL, gender (`male`, `female`, or `others`), and up to 20 skills (40 characters each). The UI sends profile edits to `PATCH /profile/edit`; the server rejects fields outside its allowlist.

## Useful commands

```sh
npm run lint
npm run build
npm run preview
```

## Project layout

```text
src/
  components/     Routes and screen components
  utils/api.js     Axios client, credentials, and API base URL
  utils/*slice.js  Redux state for user, feed, requests, connections
  index.css        App-wide visual system and responsive styles
vite.config.js     Vite config and local API proxy
```

## Local verification notes

The current UI has passed ESLint and a production Vite build. The principal user and connection flows were exercised against the local API using disposable `example.com` QA accounts. Those QA profiles and relationships may remain in the configured database; no test password is recorded here.
