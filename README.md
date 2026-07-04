# HR Management System

A modern HR management dashboard built with React, TypeScript, Vite, and Tailwind CSS. The app provides a polished interface for managing employees, departments, attendance, performance, analytics, reports, and AI-based HR predictions.

## Overview

This project is designed as a frontend HR portal for organizations that want a centralized place to track workforce activity and HR operations. It includes:

- Authentication pages for login, registration, and password recovery
- A dashboard with KPI cards and analytics charts
- Employee management views for listing, viewing, and adding employees
- Department and attendance tracking
- Performance review and AI prediction modules
- Notifications and reporting pages

## Features

- Responsive HR dashboard with animated UI
- Employee directory and employee detail screens
- Department overview and workforce metrics
- Attendance trend visualization
- Performance distribution and KPI radar charts
- AI prediction workflow for HR insights
- Notification center and report generation section

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- Recharts
- Axios
- React Hook Form
- React Icons

## Requirements

Before installing, make sure your system has:

- Node.js 18 or newer
- npm 9 or newer
- A modern browser such as Chrome, Edge, or Firefox

Optional for full backend integration:

- A REST API server exposing endpoints for auth, employees, departments, attendance, performance, analytics, notifications, and reports

## Installation

1. Clone the repository
2. Navigate to the project folder
3. Install dependencies:

```bash
npm install
```

4. Create a local environment file if you want to point the frontend to a backend API:

```bash
VITE_API_BASE_URL=http://localhost:5678/api
```

## Running the Project

Start the development server:

```bash
npm run dev
```

Then open the app in your browser at the local Vite URL shown in the terminal.

## Available Scripts

- npm run dev — start the development server
- npm run build — create a production build
- npm run preview — preview the production build locally
- npm run lint — run the linter

## Project Structure

- src/pages — application pages for dashboard, employees, auth, analytics, reports, and more
- src/components — reusable UI components
- src/context — authentication and theme providers
- src/data — mock data used by the UI
- src/services — API service layer for backend communication
- src/routes — route configuration

## Notes

The current frontend uses mock data in several sections and includes a service layer prepared for backend integration. You can connect it to a real API by updating the environment variable and backend endpoints.
