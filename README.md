# HR Management System

AI-powered Human Resource Management dashboard with a React + TypeScript frontend and a Python Flask backend.

This project supports two usage modes:

- Hybrid mode: frontend uses API-backed modules where available and gracefully falls back to mock data on failures.
- Demo mode: frontend runs with mock data only, useful for UI demos without backend setup.

## Table of Contents

- Overview
- Key Features
- Architecture
- Tech Stack
- Project Structure
- Frontend and Data Source Behavior
- Prerequisites
- Quick Start
- Environment Configuration
- Backend Setup (Local Flask)
- API Reference
- AI Prediction Model
- Deployment
- Known Limitations
- Troubleshooting
- Future Improvements

## Overview

The system is designed to centralize common HR workflows:

- Authentication and role-based session flow
- Workforce management (employees and departments)
- Attendance tracking and trends
- Performance reviews and KPI insights
- AI-assisted performance prediction
- Notifications and reporting

The UI is modern, responsive, and animated, while the backend exposes REST endpoints and a JSON-file datastore for rapid local development.

## Key Features

### Frontend

- Role-aware auth screens (Administrator, HR Manager, Employee)
- Dashboard with KPIs, charts, activity stream, and quick actions
- Employee list, details, and onboarding form
- Attendance tracker with status and trend charts
- Performance review dashboard and visual breakdowns
- AI prediction interface with confidence and feature impact
- Notifications center and reporting views
- Theme toggle (light/dark) persisted in local storage

### Backend

- Flask REST API for core HR modules
- JSON-based persistence through db.json
- Auto-seeded starter data for users, employees, departments, and sample records
- Prediction endpoints powered by a trained Random Forest model
- Report export endpoints (CSV and basic PDF stream)

## Architecture

### Frontend

- React 19 + TypeScript + Vite SPA
- React Router for route protection and navigation
- Axios service layer for API communication
- Fallback to local mock datasets for resilience

### Backend

- Flask application serving /api/* routes
- Database utility layer (JSON file read/write)
- ML model service for prediction and feature importance

### Data Flow Summary

1. User authenticates from frontend auth pages.
2. Frontend stores user in localStorage (hrms-user).
3. Axios interceptor sends Bearer token using stored user id.
4. API modules return data if backend is available.
5. If requests fail in many pages, frontend falls back to mock datasets.

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS v4 (via @tailwindcss/vite)
- Framer Motion
- Recharts
- Axios
- React Hook Form
- React Hot Toast
- React Icons

### Backend

- Python 3.11+
- Flask
- Flask-CORS
- scikit-learn
- pandas
- numpy
- joblib

## Project Structure

```text
.
|-- api/                     # Vercel-oriented Flask API (serverless-friendly import style)
|-- backend/                 # Local Flask backend + training script
|-- public/                  # Static frontend assets
|-- src/
|   |-- components/          # Reusable UI components
|   |-- context/             # Auth and theme contexts
|   |-- data/                # Mock data used by many pages
|   |-- layouts/             # Auth and main layouts
|   |-- pages/               # Feature pages
|   |-- routes/              # Route definitions and guards
|   `-- services/            # API clients
|-- vercel.json              # Vercel frontend build config
|-- VERCEL_DEPLOYMENT.md     # Deployment guidance
`-- README.md
```

## Frontend and Data Source Behavior

The app currently uses mixed data sourcing.

### Mostly API-backed with fallback to mock

- Authentication context (login/register attempts API first, then mock fallback)
- Employees list/detail/add actions
- AI prediction page (health check + predictions API, with mock behavior when unavailable)

### Mostly mock-driven (UI-first)

- Dashboard
- Departments
- Attendance
- Performance
- Analytics
- Reports page visuals and export buttons in UI
- Notifications
- Settings

This is intentional to keep the product demo-friendly while backend coverage grows.

## Prerequisites

- Node.js 18+
- npm 9+
- Python 3.11+ (recommended)

## Quick Start

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Start frontend

```bash
npm run dev
```

Frontend default URL:

- http://localhost:5173

### 3. Optional: Start backend for full API behavior

Use one backend target:

- Local backend folder (recommended for local dev): backend/app.py on port 5678
- API folder entrypoint (Vercel-style local run): api/index.py on port 5000

#### Local backend setup

```bash
cd backend
python -m pip install -r requirements.txt
python train_model.py
python app.py
```

Backend default URL:

- http://localhost:5678

## Environment Configuration

Create .env in project root for frontend if needed:

```bash
VITE_API_BASE_URL=http://localhost:5678/api
```

Notes:

- src/services/api.ts uses VITE_API_BASE_URL and defaults to http://localhost:5678/api.
- src/services/predictions.ts currently hardcodes http://localhost:5678/api.

## Backend Setup (Details)

### Option A: backend directory (local-first)

- Entry file: backend/app.py
- Port: 5678
- Includes report export endpoints for PDF and CSV
- Includes model training script backend/train_model.py

### Option B: api directory (Vercel-oriented)

- Entry file: api/index.py
- Port when run directly: 5000
- Uses relative import fallback logic for serverless compatibility
- Exposes core API endpoints similar to backend/app.py

### Data persistence

- backend/db.json for backend/app.py flow
- api/db.json for api/index.py flow

Both are file-based and suitable for development/demo purposes.

## API Reference

Base path: /api

### Health and model

- GET /health
- GET /model-info

### Auth

- POST /auth/login
- POST /auth/register
- POST /auth/logout
- GET /auth/me

### Employees

- GET /employees
- POST /employees
- GET /employees/<id>
- PUT /employees/<id>
- DELETE /employees/<id>

### Departments

- GET /departments
- POST /departments
- GET /departments/<id>
- PUT /departments/<id>
- DELETE /departments/<id>

### Attendance

- GET /attendance
- GET /attendance/employee/<employeeId>
- GET /attendance/date/<date>
- POST /attendance/check-in
- POST /attendance/check-out

### Performance

- GET /performance
- POST /performance
- PUT /performance/<id>
- GET /performance/employee/<employeeId>

### Predictions

- GET /predictions
- POST /predictions
- POST /predictions/predict
- GET /predictions/employee/<employeeId>

### Analytics

- GET /analytics/dashboard
- GET /analytics/employee-growth
- GET /analytics/attendance-trend
- GET /analytics/performance-distribution

### Notifications

- GET /notifications
- PATCH /notifications/<id>/read
- PATCH /notifications/read-all
- DELETE /notifications/<id>

### Reports

- GET /reports/employees
- GET /reports/attendance?month=<mm>&year=<yyyy>
- GET /reports/performance?period=<period>
- GET /reports/predictions

### Export endpoints (implemented in backend/app.py)

- POST /reports/export/pdf
- POST /reports/export/excel

## AI Prediction Model

The ML layer uses Random Forest classification.

### Inputs

- attendance
- experience
- kpi
- training
- leave
- previousRating

### Output classes

- High Performer
- Medium Performer
- Low Performer

### Output payload includes

- predicted class
- confidence score
- per-class confidence map
- feature importance list for UI visualization

### Training

Run:

```bash
cd backend
python train_model.py
```

This generates synthetic training data and saves trained_model.pkl.

## Deployment

### Vercel

- Build command: npm run build
- Output directory: dist
- Python serverless files live under api/

See VERCEL_DEPLOYMENT.md for full walkthrough.

### Important production note

JSON files in serverless environments are not a durable production database. Move to managed storage (PostgreSQL, MySQL, MongoDB, etc.) for real deployments.

## Available Scripts

- npm run dev: start frontend development server
- npm run build: type-check and build production assets
- npm run preview: preview production build locally
- npm run lint: run oxlint

## Demo Credentials

You can use these sample accounts on the login screen:

- admin@hrms.ng
- hr@hrms.ng
- emp@hrms.ng

Any password works in current auth logic.

## Known Limitations

- No real password validation or secure auth token flow yet (demo-oriented auth).
- Many pages are still mock-first by design.
- src/services/predictions.ts does not yet read VITE_API_BASE_URL.
- Exported PDF endpoint is a lightweight generated stream suitable for demos, not full report-grade formatting.
- db.json persistence is not suitable for multi-user production workloads.

## Troubleshooting

### Frontend cannot reach backend

- Ensure backend is running.
- Verify VITE_API_BASE_URL in .env.
- Confirm CORS and port match your backend target.

### Prediction endpoints fail

- Train model first with python train_model.py.
- Confirm trained_model.pkl exists in the active backend folder.

### Data seems inconsistent

- backend/ and api/ keep separate db.json files.
- Running different backends may show different datasets.

## Future Improvements

- Replace JSON persistence with a real database
- Introduce proper auth (hashed passwords + JWT/secure sessions)
- Complete API integration for all currently mock-driven pages
- Add automated tests (frontend and backend)
- Add role-based authorization for sensitive routes

## License

No license file is currently defined in this repository. Add a LICENSE file if you intend to distribute this project publicly.
