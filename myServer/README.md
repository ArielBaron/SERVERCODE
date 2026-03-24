
```markdown
# Modular-Monolith Project Structure

This repository is designed to host multiple independent frontend projects
with a single Express backend and shared infrastructure, maintaining
scalability, maintainability, and security.

---

## Folder Layout

```

server/                 # Central Express server and shared infrastructure
├─ server.js           # Main Express entrypoint
├─ controllers/        # Project backend adapters
│   ├─ mashov/
│   │   ├─ index.js
│   │   ├─ queries.js
│   │   └─ validators.js
│   ├─ portfolio/
│   │   ├─ index.js
│   │   ├─ queries.js
│   │   └─ validators.js
│   └─ ...             # Additional projects
├─ db.js               # Shared DB connection pool
├─ auth.js             # Shared auth handling
└─ utils.js            # Shared helper functions

projects/               # Independent frontend projects
├─ mashov/
│   ├─ frontend/       # Source code
│   ├─ dist/           # Vite build output
│   └─ backend/        # Adapter for server integration
│       └─ index.js
├─ portfolio/
│   ├─ frontend/
│   ├─ dist/
│   └─ backend/
│       └─ index.js
└─ ...                 # Additional projects

````

---

## Key Principles

1. **Single Express Server**
   - All projects mount under one server (`/api` for ACTION endpoints, `/project-name` for SPA frontend).
   - Only one process is deployed; no multiple servers per project.

2. **Backend Adapter Contract**
   - Each project exports a `register({ db, auth, utils })` function returning ACTION handlers.
   - Projects do **not** create their own Express app or DB connections.
   - Example:
     ```js
     export function register({ db, auth, utils }) {
       return {
         ACTIONS: {
           PROJECT_GET: async (req, res) => { /* ... */ },
           PROJECT_ADD: async (req, res) => { /* ... */ }
         }
       };
     }
     ```

3. **Frontend**
   - Static frontend builds drop into `/dist`.
   - Server mounts SPA via Express static and SPA fallback.

4. **Database**
   - One production DB hosted on the server.
   - Connections are centralized in `db.js`.

5. **Development Workflow**
   - Independent branch: project runs with remote dev DB.
   - Integration branch: project plugs into main server using adapter.
   - Supports local testing while keeping production safe.

6. **Scalability**
   - Adding a new project: drop frontend build + backend adapter folder.
   - Minimal changes to server.js: just register the adapter.

---

This setup ensures projects remain independent for development while centralizing infrastructure for production stability.
````



# NOTES
includes:
npm i ArielBaron/mashovscraper#v1.1.0