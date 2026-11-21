# Task Manager

A small task manager built for the Helfy home assignment. Express API on the backend, React + Vite on the frontend, all in TypeScript.

Tasks are shown in an endless carousel, written from scratch without any carousel library.

## Running it

You need Node 22 or newer.

```bash
# backend - http://localhost:4000
cd backend
npm install
npm start

# frontend - http://localhost:3000
cd frontend
npm install
npm start
```

Start the backend first. The frontend proxies `/api` requests to port 4000, so no env setup is needed.

## API

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| GET    | `/api/tasks`            | Get all tasks            |
| GET    | `/api/tasks/:id`        | Get a single task        |
| POST   | `/api/tasks`            | Create a task            |
| PUT    | `/api/tasks/:id`        | Update a task            |
| DELETE | `/api/tasks/:id`        | Delete a task            |
| PATCH  | `/api/tasks/:id/toggle` | Toggle completion status |

Example body for POST / PUT:

```json
{
  "title": "Buy food",
  "description": "Milk, eggs, bread",
  "priority": "high"
}
```

`title` is required (max 100 chars), `description` is optional (max 500), `priority` is `low`, `medium` or `high` and defaults to `medium`. Validation is done with Joi, and errors come back as `400` with a message. Unknown ids return `404`.

Data is kept in memory, so it resets every time the server restarts. There are two seed tasks to start with.

## Features

- Create, edit, delete and complete tasks
- Endless carousel with arrow buttons and keyboard support
- Filter by all / pending / completed
- Search by title or description and sort by date, priority or title
- Filter and sort choices are saved in localStorage
- Delete confirmation, loading and error states
- Responsive layout

## Some decisions

- **No database.** The assignment asked for in-memory storage, so `TaskStore` is a simple class. It's passed into the app, which would make it easy to swap later.
- **Carousel.** Instead of cloning slides, the position just keeps growing in both directions and each visible slot maps back to a real task with modulo. This keeps it smooth with any number of tasks.
- **Forms.** React Hook Form handles the task form. The backend validates again with Joi, so the API is safe on its own.
- **Libraries.** `lucide-react` for icons and `date-fns` for dates. Styling is plain CSS.

Tried to follow DRY, KISS, YAGNI and Clean Code principles
nothing is overengineered

## Formatting

Prettier is set up at the root:

```bash
npm install
npm run format
```
