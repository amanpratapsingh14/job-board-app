# Job Board App (Frontend)

A modern job board web application built with React and Material-UI, featuring user and admin flows for job searching, application, and management.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [User Flows](#user-flows)
- [Admin Flows](#admin-flows)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Available Scripts](#available-scripts)
- [Customization](#customization)
- [License](#license)

---

## Overview

This project is a job board platform where users can browse, search, and apply for jobs, while admins can manage job postings and view applicants. The UI is inspired by LinkedIn, providing a familiar and intuitive experience.

---

## Features

### For Job Seekers (Users)
- **Browse Jobs:** View a list of open positions with details.
- **Search & Filter:** Search jobs by title, company, or location.
- **Profile Summary:** See your profile info in the sidebar.
- **Apply for Jobs:** Fill out an application form and upload a resume.
- **Track Applications:** View all jobs you have applied to and their statuses.
- **Authentication:** Sign up and log in securely.

### For Employers (Admins)
- **Admin Dashboard:** Manage all job postings.
- **Add/Edit/Delete Jobs:** Create new jobs or update existing ones.
- **View Applicants:** See all applicants for each job and view their resumes.
- **Company Profile:** Manage company information and logo.

### General
- **Responsive Design:** Works on desktop and mobile.
- **Material-UI Theme:** Consistent, modern look and feel.
- **Mock Data:** Uses mock data for jobs, applications, and applicants (easy to replace with real APIs).
- **Role-based Navigation:** Different menus for users and admins.
- **News Feed:** Displays tech news in the sidebar.

---

## User Flows

### 1. Visitor
- Lands on the Home Page, sees job listings and news.
- Can search for jobs, but must sign up or log in to apply.

### 2. Sign Up / Log In
- Sign up with name, email, and password (password must be at least 6 characters).
- Log in with email and password.
- Role is determined by credentials (admin@example.com/password for admin, any other for user).

### 3. Job Seeker
- After login, sees profile summary and job recommendations.
- Can search and view job details.
- Clicks "Apply Now" to fill out an application form (name, email, experience, CTC, notice period, portfolio, resume upload).
- Application is saved and can be tracked in "My Applications".
- Can view status: Submitted, Under Review, Accepted, Rejected.

### 4. Admin
- After login as admin, accesses the Admin Dashboard.
- Can add, edit, or delete job postings.
- Can view all applicants for each job, and download/view their resumes.
- Can update company profile (name, description, website, logo, etc).

---

## Admin Flows
- **Dashboard:** List of all jobs with actions (edit, delete, add new).
- **Applicants:** Table of all applicants with job applied for, company, and resume link.
- **Sidebar Navigation:** Quick links to Dashboard, Manage Jobs, and Applicants.

---

## Screenshots
> _Add screenshots here for Home, Job Application, Admin Dashboard, etc._

---

## Tech Stack
- **React 19**
- **Material-UI 7** (MUI)
- **React Router DOM 7**
- **Context API** for authentication and user state
- **Mock Data** for jobs, applications, and applicants

---

## Project Structure
```
job_board_app/
  ├── public/
  ├── src/
  │   ├── assets/                # Images, logos, etc.
  │   ├── components/            # Reusable UI components
  │   │   ├── admin/             # Admin-specific components
  │   │   ├── Layout/            # Layout and navigation
  │   │   ├── JobCard.js         # Job listing card
  │   │   ├── News.js            # News feed
  │   │   └── ProfileSummary.js  # User profile summary
  │   ├── context/               # Auth context
  │   ├── pages/                 # Main pages (Home, Login, Signup, etc.)
  │   │   ├── admin/             # Admin pages
  │   ├── routes/                # App and private routes
  │   ├── services/              # Mock data services
  │   ├── theme/                 # MUI theme config
  │   ├── index.js               # App entry point
  │   └── index.css              # Global styles
  ├── package.json
  └── README.md
```

---

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd job_board_app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```
4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## Available Scripts
- `npm start` – Runs the app in development mode.
- `npm run build` – Builds the app for production.
- `npm test` – Runs tests (if any).
- `npm run eject` – Ejects the app (not recommended).

---

## Customization
- **Switch to real API:** Replace mock data in `src/services/` with real API calls.
- **Theme:** Edit `src/theme/theme.js` for custom colors and typography.
- **Authentication:** Integrate with a real auth provider in `src/context/AuthContext.js`.

---

## License

This project is for educational/demo purposes. Feel free to use and modify.
