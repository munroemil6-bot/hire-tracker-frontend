# Hire Tracker Backend

This repository contains the Django REST API for the Hire Tracker application.

## Features
- User authentication with JWT
- Applicant registration and application submission
- Admin approval, decline, and removal of applications
- Department, job, employee, attendance, accomplishment, notification, and skill management
- Role-based access for admin, employee, and applicant users

## Tech Stack
- Python 3.12
- Django 6.0.7
- Django REST Framework
- PostgreSQL-ready configuration for production
- Render deployment support

## Local Development

### 1. Create and activate a virtual environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run database migrations
```bash
python manage.py migrate
```

### 4. Start the development server
```bash
python manage.py runserver
```

## Deploying the backend with a dynamic frontend URL
The backend itself uses relative `api/` routes and does not require a hardcoded `http://127.0.0.1:8000` URL. When you deploy, do the following:

- Set `ALLOWED_HOSTS` to your deployed backend domain.
- Set `CORS_ALLOWED_ORIGINS` to the deployed frontend domain(s) that will call this API.
- Set `CSRF_TRUSTED_ORIGINS` to the deployed frontend origin if you use CSRF protection in the browser.

Your frontend should also stop hardcoding `http://127.0.0.1:8000/api` and instead read the backend base URL from an environment variable such as `REACT_APP_API_URL` or `NEXT_PUBLIC_API_URL`.

Example frontend base URL usage:

```js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
const response = await fetch(`${API_BASE_URL}/api/login/`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(data),
});
```

Then deploy your frontend with `NEXT_PUBLIC_API_URL=https://your-backend-domain.com` or equivalent.

## Default Login Credentials
The seeded/demo users are configured with:
- Username: admin
- Password: 123456

You can also create new users through the registration endpoint.

## API Endpoints
- POST /api/register/
- POST /api/login/
- POST /api/refresh/
- GET/POST /api/departments/
- GET/POST /api/jobs/
- GET/POST /api/applicants/
- POST /api/applicants/<id>/approve/
- POST /api/applicants/<id>/decline/
- DELETE /api/applicants/<id>/remove/

## Render Deployment
This backend is prepared for deployment on Render.

### Environment Variables
Set these in Render:
- SECRET_KEY
- DEBUG=False
- ALLOWED_HOSTS=your-render-url

### Build and Start Commands
- Build: pip install -r requirements.txt
- Start: gunicorn hiretracker.wsgi:application

## Notes
- The project uses SQLite locally by default.
- For production, configure a PostgreSQL database via Render or another provider.
