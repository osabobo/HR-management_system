# HR Management System - Vercel Deployment Guide

## Deployment Structure

This project is now configured for Vercel deployment with:

### Frontend
- **Location**: `/src` and `/public`
- **Technology**: React + TypeScript
- **Build output**: `/dist`
- **Framework**: Vite
- **Deployment**: Automatic from root

### Backend
- **Location**: `/api`
- **Technology**: Python Flask
- **Runtime**: Python 3.11
- **Type**: Serverless Functions

## Files Setup

### API Folder (`/api`)
- `index.py` - Main Flask application handler (Vercel serverless entry point)
- `database.py` - Database operations (uses `db.json` for persistence)
- `model.py` - ML model for performance predictions
- `requirements.txt` - Python dependencies
- `db.json` - JSON database file
- `trained_model.pkl` - Serialized ML model

### Configuration Files
- `vercel.json` - Vercel deployment configuration (updated for both frontend and Python backend)
- `.vercelignore` - Files to exclude from Vercel deployment
- `package.json` - Node.js dependencies (unchanged)

## Local Development

### Frontend
```bash
npm install
npm run dev
```
Runs on: http://localhost:5173

### Backend (Local)
```bash
cd api
python -m pip install -r requirements.txt
python index.py
```
Runs on: http://localhost:5000

### Testing the API locally
```bash
curl http://localhost:5000/api/health
```

## Vercel Deployment

### Prerequisites
- Vercel CLI installed: `npm install -g vercel`
- Project linked to Vercel account

### Deploy
```bash
vercel
```

or push to GitHub and enable automatic deployments in Vercel Dashboard.

### Environment Variables
The frontend API client uses `VITE_API_BASE_URL` environment variable:
- **Development**: `http://localhost:5678/api` (fallback)
- **Production**: Automatically set to `/api` (relative path for same-origin requests)

Configure in Vercel Dashboard: Project Settings → Environment Variables

## API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Employees
- `GET /api/employees`
- `GET /api/employees/<id>`
- `POST /api/employees`
- `PUT /api/employees/<id>`
- `DELETE /api/employees/<id>`

### Departments
- `GET /api/departments`
- `GET /api/departments/<id>`
- `POST /api/departments`
- `PUT /api/departments/<id>`
- `DELETE /api/departments/<id>`

### Attendance
- `GET /api/attendance`
- `GET /api/attendance/employee/<employeeId>`
- `POST /api/attendance/check-in`
- `POST /api/attendance/check-out`

### Performance Reviews
- `GET /api/performance`
- `POST /api/performance`
- `PUT /api/performance/<id>`

### AI Predictions
- `POST /api/predictions`
- `GET /api/predictions`
- `POST /api/predictions/predict` (generates new prediction)
- `GET /api/predictions/employee/<employeeId>`

### Analytics
- `GET /api/analytics/dashboard`
- `GET /api/analytics/employee-growth`
- `GET /api/analytics/attendance-trend`
- `GET /api/analytics/performance-distribution`

### Notifications
- `GET /api/notifications`
- `PATCH /api/notifications/<id>/read`
- `PATCH /api/notifications/read-all`

### Reports
- `GET /api/reports/employees`
- `GET /api/reports/attendance`
- `GET /api/reports/performance`
- `GET /api/reports/predictions`

## Features

### Database
- JSON-based persistence with `db.json`
- In-memory operations with file-based durability
- Auto-creates seed data on first run

### ML/AI
- Performance prediction using Random Forest Classifier
- Feature-based analysis and recommendations
- Confidence scoring for predictions

### CORS
- Enabled for all routes with `flask-cors`
- Allows cross-origin requests from frontend

## Troubleshooting

### Backend not starting
1. Check Python version: `python --version` (should be 3.11+)
2. Install dependencies: `pip install -r api/requirements.txt`
3. Check if `db.json` and `trained_model.pkl` exist in `/api`

### Model loading errors
- Ensure `trained_model.pkl` is in the `/api` folder
- If missing, the system will still work but predictions will fail

### API not accessible from frontend
- Check that `VITE_API_BASE_URL` environment variable is set correctly
- In Vercel, it should be `/api` or the full deployment URL
- Check CORS headers in browser console

### Database persistence issues
- Ensure `/api/db.json` has write permissions
- On Vercel, data persists during function invocations but is not permanent across deployments
- Consider using a external database service for production

## Production Recommendations

1. **Database**: Replace `db.json` with PostgreSQL, MongoDB, or similar
2. **ML Model**: Use a dedicated ML platform or load from cloud storage
3. **Environment Variables**: Store sensitive data in Vercel environment variables
4. **Monitoring**: Enable Vercel analytics and logging
5. **Caching**: Implement edge caching for frequently accessed data
6. **Security**: Add rate limiting, input validation, authentication tokens

## Migration from Backend Folder

The original `/backend/app.py` is still available for local development. The `/api/index.py` is the Vercel-optimized version with identical functionality.

To keep both in sync:
- Update `/api/index.py` for any new features
- Update `/backend/app.py` for local testing
