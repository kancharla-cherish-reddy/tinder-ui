# DevTinder development handoff

This file is the persistent project note for future development sessions. It describes the current app contract and decisions so work can continue without relying on chat history.

## Repositories

- UI: `tinder-ui` — React, Vite, Redux Toolkit, React Router, Axios, Tailwind CSS, and daisyUI.
- API: `tinder-server` — Express, Mongoose, MongoDB, bcrypt, JWT, cookie-parser, and validator.
- Both currently use the `main` branch and have separate GitHub remotes.

## Application purpose

DevTinder is a simple developer networking app. People sign in, maintain a profile, browse other developers, send or pass on connection requests, review incoming requests, and see accepted connections.

## Request and session flow

1. The UI posts account details to `/signup` or credentials to `/login`.
2. The API normalizes email, validates inputs, hashes signup passwords with bcrypt, and issues an HTTP-only `token` cookie.
3. On load, the UI calls `/profile/view` to restore the signed-in user before rendering protected screens.
4. The feed calls `/feed`. `interested` and `ignored` actions are sent to `/request/send/:status/:toUserId`.
5. Incoming `interested` actions are returned by `/get/myrequests`; the recipient accepts or rejects with `/request/review/:status/:requestId`.
6. Accepted records are returned from `/connections` as `{ _id, connectedAt, otherUser }` for either participant.

All UI requests use the shared Axios client in `src/utils/api.js` with credentials enabled. In development, Vite maps `/api/*` to `http://localhost:3000/*` and strips the `/api` prefix. In deployed builds, `VITE_API_URL` selects the API base URL. The API's `CLIENT_ORIGIN` must match the direct browser origin when the Vite proxy is not used.

## Profile model and edit policy

`models/usermodel.js` is authoritative. Editable fields are first name, last name, age, about, photo URL (`photoUrl` or stored `photourl`), gender, and skills. The API uses an explicit allowlist and schema validation. Passwords are bcrypt hashes, are selected only for login, and are removed from JSON output.

Constraints: first/last name 1–50 characters; age optional 18–120; about up to 500 characters; up to 20 skills of 40 characters each; gender `male`/`female`/`others`; photo URL up to 2048 characters.

## Connection state rules

- Request states in use: `interested`, `ignored`, `accepted`, `rejected`.
- An outgoing action hides the acted-on profile from that member's feed.
- Incoming requests appear only while their state is `interested`.
- Accepting creates a mutual connection visible to both users.
- An earlier pass does not prevent the other person from sending interest later; the existing ignored record is converted to the new incoming request.
- Feed pagination accepts `page` (or legacy `skip`) and caps `limit` at 50.

## Local setup

Start the API from `tinder-server` after configuring its ignored `.env` from `.env.example`. Required values are `MONGODB_URI` and `JWT_SECRET`; `PORT` defaults to `3000`; `CLIENT_ORIGIN` defaults to `http://localhost:5173`.

The API keeps `MONGODB_URI` and `JWT_SECRET` in its ignored server-side `.env`; the server loads that file at startup. The UI `.env` is for the public `VITE_API_URL` only. Never copy server credentials, JWT secrets, or passwords into the UI.

Start the UI from `tinder-ui` with `npm run dev`. Vite defaults to `5173` and can choose the next open port if another process already owns it. If the old UI is still on `5173`, stop that Vite process and restart it from the current checkout. A fresh Vite process is needed to pick up `vite.config.js` changes.

Useful UI checks:

```sh
npm run lint
npm run build
```

The backend uses `npm run dev` (nodemon) or `npm start`. Backend source files can be syntax-checked with `node --check`.

## Verification history and test data

The core signup, profile edit, discovery, pass, reverse-interest, request acceptance, connections from both sides, self-connect rejection, password omission, UI lint, and production build paths have been checked locally. Three disposable accounts using `example.com` addresses and their test relationships were created in the configured database during QA. Their credentials are deliberately not recorded here. These records may persist; use a fresh suffix for future QA accounts. No cleanup endpoint currently exists.

Do not use real user credentials for routine tests. Do not print, paste, or commit `.env` values. Keep UI and API changes consistent with the endpoint and schema contracts above, and update this file when those contracts change.

## Known local-development issue

Multiple Vite processes can leave an older bundle on `5173` while a new `npm run dev` runs on `5174`. The port choice is not an app-data issue: stop the stale process on `5173` from its terminal, then restart the UI to serve the current source on the preferred port. Login also requires the API listener on `3000` and a reachable MongoDB connection.
