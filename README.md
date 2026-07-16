# Build Order (Development Roadmap)

The project should be developed incrementally, ensuring that each stage is fully functional before moving to the next.

---

# Phase 1 — Project Initialization

## Backend

- Create the Django project
- Create the project configuration
- Create all Django apps
  - accounts
  - departments
  - jobs
  - applicants
  - employees
  - attendance
  - accomplishments
  - notifications
  - skills
- Configure PostgreSQL (SQLite during development)
- Install Django REST Framework
- Configure CORS
- Configure static files
- Configure media uploads
- Initialize Git
- Push initial commit to GitHub

### Expected Outcome

- Django project runs successfully.
- React project runs successfully.
- Git repository initialized.

---

# Phase 2 — User Authentication

## Backend

Create a custom User model extending AbstractUser.

Add custom fields:

- Role
- Phone Number
- Profile Picture

Implement

- Register
- Login
- Logout
- Password Hashing
- Authentication
- Permissions

Roles

- Applicant
- Employee
- HR Administrator

### Frontend

Create pages

- Register
- Login

Connect them to the backend.

### Expected Outcome

Users can create accounts and securely log into the system.

---

# Phase 3 — Database Design

Create and migrate models in the following order:

## Department

- name
- description

↓

## Job

- title
- description
- salary
- deadline
- department

↓

## Skill

- name

↓

## Applicant

- user
- job
- resume
- cover_letter
- application_status

↓

## Employee

- user
- department
- employee_number
- hire_date
- salary

↓

## Attendance

- employee
- clock_in
- clock_out

↓

## Accomplishment

- employee
- title
- description
- date

↓

## Notification

- user
- message
- created_at

Create and apply migrations after each model.

```bash
python manage.py makemigrations

python manage.py migrate
```

### Expected Outcome

The database schema is complete and all model relationships are established.

---

# Phase 4 — Django Admin

Register every model inside the Django Admin Panel.

Customize

- List Displays
- Search Fields
- Filters
- Ordering

Create a superuser.

```bash
python manage.py createsuperuser
```

### Expected Outcome

HR can manage all data from Django Admin during development.

---

# Phase 5 — Build the REST API

Create serializers.

Create API views.

Create API endpoints.

Authentication

```
POST /api/register

POST /api/login

POST /api/logout
```

Jobs

```
GET

POST

PUT

DELETE
```

Applicants

```
GET

POST

PATCH

DELETE
```

Employees

```
GET

POST

PATCH

DELETE
```

Attendance

```
GET

POST

PATCH
```

Notifications

```
GET

POST
```

### Expected Outcome

The backend exposes a fully functional REST API that can be consumed by the React frontend.

---

# Phase 6 — React Setup

Install

- React Router
- Axios
- Bootstrap

Create folders

```
components/

pages/

api/

layouts/

context/

hooks/

assets/
```

Create routing.

Create layouts.

### Expected Outcome

The React application has a clean architecture and navigation.

---

# Phase 7 — Public Pages

Build

- Home
- About
- Careers
- Contact
- Available Jobs
- Job Details

### Expected Outcome

Visitors can browse the company website and available job listings.

---

# Phase 8 — Authentication Integration

Connect React authentication to Django.

Implement

- Login
- Register
- Logout

Protect pages based on authentication.

### Expected Outcome

Authenticated users can securely access the application.

---

# Phase 9 — Applicant Module

Applicant Dashboard

Features

- Browse Jobs
- Apply for Jobs
- Upload Resume
- Upload Cover Letter
- View Applications
- Track Status
- Edit Profile

### Expected Outcome

Applicants can complete the entire recruitment process online.

---

# Phase 10 — HR Management Module

Dashboard

Departments

Jobs

Applicants

Employees

Reports

Features

- Create Jobs
- Edit Jobs
- Delete Jobs
- View Applicants
- Approve Applicants
- Reject Applicants
- Manage Employees
- Assign Departments

Business Logic

When an applicant is approved:

1. Create an Employee record.
2. Update the User role from Applicant to Employee.
3. Send a notification to the user.

### Expected Outcome

The recruitment and onboarding workflow is fully operational.

---

# Phase 11 — Employee Module

Employee Dashboard

Features

- View Dashboard
- View Profile
- Clock In
- Clock Out
- Submit Daily Accomplishments
- View Notifications

### Expected Outcome

Employees can manage their day-to-day work activities.

---

# Phase 12 — Notifications

Implement notifications for:

- Application Approved
- Application Rejected
- New Job Posted
- Attendance Reminder
- Company Announcements

### Expected Outcome

Users receive timely updates based on their role and activities.

---

# Phase 13 — File Uploads

Allow users to upload

- Resume
- Cover Letter
- Profile Picture

Store uploaded files in

```
media/

├── resumes/

├── profile_pictures/
```

### Expected Outcome

Applicant documents and profile images are stored and managed securely.

---

# Phase 14 — Frontend Polish

Improve

- Navigation
- Cards
- Tables
- Forms
- Loading Spinners
- Alerts
- Empty States
- Responsive Design
- Error Pages

### Expected Outcome

The application provides a polished and user-friendly experience across devices.

---

# Phase 15 — Testing

Test

- Authentication
- CRUD Operations
- API Endpoints
- Role Permissions
- File Uploads
- Application Approval Workflow
- Attendance
- Notifications

Fix any bugs discovered during testing.

### Expected Outcome

The application is stable and ready for deployment.

---

# Phase 16 — Dockerization

Create

- Dockerfile
- .dockerignore
- docker-compose.yml

Build the Docker image.

```bash
docker build -t hiretrack .
```

Run the container.

```bash
docker run -p 8000:8000 hiretrack
```

### Expected Outcome

The backend runs successfully inside a Docker container.

---

# Phase 17 — Deployment

## Backend

Deploy Docker image

↓

Docker Hub

↓

Render

## Frontend

Deploy React

↓

Vercel

or

↓

Netlify

Update the frontend API base URL to the deployed backend.

### Expected Outcome

The application is publicly accessible and fully deployed.

---

# Future Improvements

- Email verification
- Password reset
- Interview scheduling
- Leave management
- Payroll management
- Performance reviews
- Analytics dashboard
- Calendar integration
- Real-time notifications
- Search and filtering
- Dark mode

---

# Final Workflow

```
Visitor

↓

Register

↓

Applicant

↓

Browse Jobs

↓

Apply

↓

HR Reviews

↓

Approve / Reject

↓

Approved

↓

Employee Created

↓

User Role Updated

↓

Employee Dashboard

↓

Clock In

↓

Submit Accomplishments

↓

Receive Notifications
```

---

# Completion Checklist

- [ ] Django project configured
- [ ] React frontend configured
- [ ] Authentication implemented
- [ ] Database models completed
- [ ] Relationships implemented
- [ ] API endpoints completed
- [ ] Applicant module completed
- [ ] Employee module completed
- [ ] HR module completed
- [ ] Notifications implemented
- [ ] File uploads implemented
- [ ] Responsive frontend completed
- [ ] Dockerized
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Project documentation completed