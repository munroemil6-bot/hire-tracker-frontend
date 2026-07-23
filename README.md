# Hire Tracker Frontend

## Render deployment

### Build command
npm install
npm run build

### Publish directory
Dist

### Environment variables
VITE_API_URL=https://hiretracker-backend-latest.onrender.com/api/

## Run locally with the Django backend

The frontend is configured in `.env.local` to call `/api`; Vite securely proxies
that path to the local backend at `http://127.0.0.1:8000/api/`. Start each app
in a separate terminal:

```bash
# Terminal 1 — from the frontend folder, start the backend
cd ../backend
.venv/bin/python manage.py runserver

# Terminal 2 — stay in the frontend folder
npm run dev
```

Open the URL Vite prints (normally `http://localhost:5173`). Registering from
the frontend creates an applicant account. Log in with an administrator account
to use `/admin/employees` and `/admin/applicants`.

If either form says it cannot reach the backend, the backend terminal is not
running (or it is not running on port `8000`). Restart it with the first command
above, then restart Vite after changing any `.env` file.
