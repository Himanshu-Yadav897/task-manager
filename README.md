# Task Manager Frontend

A responsive React.js application (Vite + Tailwind CSS) for managing tasks in a small team.

🔗 **Live:** [https://task-manajer.netlify.app/login](https://task-manajer.netlify.app/login)

## Prerequisites

* Node.js ≥ 16.x
* npm or yarn

## Setup & Development

```bash
git clone https://github.com/yourusername/task-manager-frontend.git
cd task-manager-frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` in the root:

```env
VITE_API_BASE_URL=https://<your-backend-url>
```

## Build & Deployment

```bash
npm run build
# Deploy `dist/` folder to Netlify (https://task-manajer.netlify.app)
```

## Folder Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Views (Login, Dashboard, Tasks)
├── services/        # API client modules
└── App.jsx          # Main app wrapper
```

## Features

* Responsive layout (mobile, tablet, desktop)
* Authentication (login/signup)
* Task listing, creation, editing
* Search and filter by title, status, priority
* Dashboard: created, assigned, overdue tasks

## Notes

* Assignment backend logic pending integration
* In-app notification stubs
* First major frontend project; improvement planned over time

## Why React (Vite) instead of Next.js

* **Familiarity:** As a fresher, I’m focusing on solidifying React fundamentals before exploring Next.js.
* **Simplicity & Speed:** Vite’s fast dev server and minimal configuration accelerate development and iteration.
* **Project Needs:** This MVP doesn’t require server-side rendering or advanced routing—core React suffices.
* **Future Growth:** I plan to adopt Next.js in future versions to leverage SSR/SSG and built‑in routing when needed.

