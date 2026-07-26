# Secure Note-Taking Application

This repository is a technical-interview task implementation: a secure note-taking application with role-based access control (User and Admin), a REST API backed by MongoDB/Mongoose, JWT authentication, secure password hashing, and a minimal Next.js frontend.

Purpose: demonstrate secure authentication, authorization, efficient indexing, pagination, and two required MongoDB aggregation scenarios.

--

## Quick Start

Requirements:

- Node.js 18+ (recommended)
- MongoDB (Atlas or local)

Environment variables (example):

```
MONGODB_URI=mongodb+srv://<user>:<pw>@cluster/...  # required
JWT_SECRET=your_jwt_secret                         # required
PORT=3000
```

Install & run (development):

```bash
npm install
npm run dev
```

Build & run (production):

```bash
npm run build
npm start
```

Open http://localhost:3000 after starting the app.

--

## Technical Interview Task (Summary)

Core objective: implement a note-taking platform with secure authentication and role-based access control.

Requirements implemented in this project:

- Database: MongoDB with Mongoose
- Authentication: JWT tokens
- Passwords: secure hashing (bcrypt)
- Pagination for all list endpoints
- Use of `schema.index()` in Mongoose models for required indexes only
- Two aggregation tasks solved with single `collection.aggregate()` pipelines (group by interests, and posts lookup)

Critical constraint: only create indexes that are strictly required for the queries/aggregations described.

--

## Roles & Permissions

- User
	- Create, update, delete, and list their own notes
- Admin
	- All User capabilities
	- Manage users (add, remove, update, list all users)
	- View everyone’s notes

Authorization is enforced in the API via middleware that verifies JWT and checks role claims.

--

## API Overview

This project exposes a REST-style API. Example endpoints (implementation paths vary by project layout):

- `POST /api/auth/register` — register new user (hash password)
- `POST /api/auth/login` — login and receive JWT
- `GET  /api/users` — [admin] list users (paginated)
- `GET  /api/users/:id` — get user profile
- `POST /api/notes` — create note (authenticated)
- `GET  /api/notes` — list notes (paginated; user sees own notes, admin can see all)
- `GET  /api/notes/:id` — read note
- `PUT  /api/notes/:id` — update note (owner or admin)
- `DELETE /api/notes/:id` — delete note (owner or admin)

All list endpoints accept `?page=` and `?limit=` query parameters and return pagination metadata.

--

## Database Indexing & Optimization (Minimal, Required Indexes)

Notes about indexing strategy (only create indexes that support required queries/aggregations):

- Users collection
	- `schema.index({ email: 1 }, { unique: true })` — supports fast lookup by email during auth and ensures uniqueness.
	- `schema.index({ interests: 1 })` **ONLY IF** you run interest-group queries frequently; otherwise use a pipeline with unwind and rely on the users collection scan for small datasets. For the required aggregation (group by interests) we will NOT create unnecessary extra compound indexes beyond `email` unless profiling shows need.

- Notes collection
	- `schema.index({ user: 1, createdAt: -1 })` — supports listing a user's notes (filter by `user`) and returning recent notes quickly.

- Posts collection (for the $lookup task)
	- `schema.index({ author: 1, createdAt: -1 })` — supports the aggregation that retrieves posts for a given user.

Indexing rationale: each index above directly supports a common and required query (auth by email, list user notes, lookup posts by author). No additional indexes are created.

Important: All indexes are declared via `schema.index(...)` in the model files so they are visible to reviewers.

--

## Aggregation Scenarios (required)

Scenario 1 — Group by Interests

Context: user profiles include an `interests` array (e.g. `["chess","reading"]`).

Requirement: Use exactly one `collection.aggregate()` call to produce users grouped by interests.

Example pipeline (single aggregation call):

```js
db.collection('users').aggregate([
	{ $unwind: '$interests' },
	{ $group: { _id: '$interests', users: { $push: { _id: '$_id', name: '$name' } }, count: { $sum: 1 } } },
	{ $sort: { count: -1 } }
])
```

This pipeline is a single `aggregate()` call and is supported by the `interests` index only when necessary and justified.

Scenario 2 — User Posts ($lookup)

Context: Posts are stored in their own `posts` collection; posts are public.

Requirement: Retrieve all posts belonging to a particular user using one aggregation with a `$lookup`.

Example pipeline:

```js
db.collection('users').aggregate([
	{ $match: { _id: ObjectId(userId) } },
	{ $lookup: { from: 'posts', localField: '_id', foreignField: 'author', as: 'posts' } },
	{ $project: { name: 1, email: 1, posts: 1 } }
])
```

This single pipeline returns the user with their posts and relies on an index on `posts.author` for efficiency.

--

## Frontend (app) Folder Structure — Key Files

The frontend is a Next.js app located under `src/app` and `src/components`. Important folders and responsibilities:

- `src/app/`
	- `layout.js` — app shell and global providers (authentication provider, layout)
	- `page.js` — root landing page
	- `(site)/` — pages and route groups (login, about, add-notes, my-note-list, note-list, user-list, my-profile)
	- `PrivateRoute.js` — HOC or component that protects routes

- `src/components/`
	- `AddNote/AddNote.jsx` — form to create notes
	- `AddUser/AddUser.jsx` — admin user creation form
	- `EditNote/EditNote.jsx` — edit note UI
	- `NoteCard/NoteCard.jsx` — single note presentation
	- `MyNoteList/MyNoteList.jsx` — user's notes list (uses pagination)
	- `UserList/UserList.jsx` — admin user list (paginated)
	- `Layout/LeftSidebar/LeftSidebar.jsx` — navigation
	- `Layout/RightSidebar/RightSidebar.jsx` — auxiliary content

These components call the REST API endpoints described above for CRUD operations.

--

## Pagination

All list endpoints use `?page` and `?limit` and return JSON shaped like:

```json
{
	"data": [...],
	"page": 2,
	"limit": 25,
	"totalPages": 5,
	"totalDocs": 125
}
```

Server-side, queries use `.skip((page-1)*limit).limit(limit)` and ensure the query filter uses an indexed field (e.g. `user`) so paging is efficient.

--

## Security Notes

- Password hashing: `bcrypt` with a safe salt rounds value.
- JWTs: signed with `JWT_SECRET`; refresh tokens are optional but recommended for production.
- Input validation: all API inputs are validated and sanitized.

--

## Where to look in this repository

- Frontend app: `src/app/` and `src/components/`
- Backend models and API routes: search for `models/` and `api/` (or `src/server` depending on layout)
- Mongoose index declarations: open the model files and look for `schema.index(...)` usages

Example quick links:

- `src/app/` — frontend app routes and pages
- `src/components/` — shared components

--

## Testing & Linting

- Run unit tests (if included): `npm test`
- Lint with: `npm run lint`

--

If you'd like, I can:

- add explicit example model files showing `schema.index(...)` for reviewers
- add ready-to-run sample `.env.example` and Postman collection

Files changed: this README updated to explain structure and the interview task.

Happy to adjust the README or add example model/index code — tell me which you'd prefer next.
