# Organizational Chart Management - Frontend

## 🚀 Overview

This Enterprise Management System is a powerful, React-based web application designed to streamline organizational management. It provides a comprehensive suite of tools for managing users, positions, departments, and areas within a company, as well as visualizing the organizational structure through an interactive org chart.

## 🌟 Key Features

- **Dashboard**: Personal information overview
- **Organizational Chart**: Interactive visualization of company structure
- **CRUD Operations**: Manage Users, Positions, Departments, and Areas
- **Responsive Design**: Fully responsive layout with collapsible sidebar
- **Real-time Data Management**: Utilizes React Query for efficient data fetching and caching
- **Modular Architecture**: Well-organized component structure for easy maintenance and scalability

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **State Management**: React Query, Context API
- **UI Framework**: Ant Design
- **Routing**: React Router
- **Data Visualization**: react-d3-tree
- **HTTP Client**: Axios (implied from API service structure)

## 📂 Project Structure

The project follows a modular structure with separate directories for components, pages, contexts, hooks, interfaces, API services, and helpers. This organization promotes code reusability and maintainability.

Key directories:

- `components/`: Reusable UI components
- `pages/`: Main view components for different routes
- `contexts/`: React Context providers for state management
- `hooks/`: Custom React hooks for shared logic
- `interfaces/`: TypeScript interfaces for type definitions
- `apiServices/`: API communication services
- `helpers/`: Utility functions and helpers

## 📡 Backend Dependency

This project requires a specific backend to function properly. The frontend is designed to work with the following backend project:

[org-management-backend](https://github.com/maxi-stein/org-management-backend)

Ensure that you have this backend set up and running before attempting to use this frontend application.

## 🚀 Getting Started

1. Clone this repository:

```bash
   git clone https://github.com/maxi-stein/org-management-frontend.git
```

2. Install dependencies:

```bash
npm install
```

3. Create an `.env` file with the following values:

```bash
   VITE_APP_HOST=localhost
   VITE_APP_PORT=4000
```

4. Clone the backend repository and start the server:

```bash
   git clone https://github.com/maxi-stein/org-management-backend.git
```

#### Follow the backend setup instructions in its README

5. Return to this project directory and start the frontend development server:

```bash
npm run dev
```

listening on port `5173`
