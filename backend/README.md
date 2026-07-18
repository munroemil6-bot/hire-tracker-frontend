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
