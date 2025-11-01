
# GEMINI.md

## Project Overview

This project is a web application called OpenGov, designed to facilitate communication between citizens and local authorities. Citizens can report issues (e.g., potholes, broken streetlights), and track their resolution. The application provides a dashboard for both citizens and authorities.

The project is built with a modern frontend stack:

*   **Framework:** React with Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS with shadcn/ui components
*   **Routing:** React Router
*   **State Management:** React Context API

Currently, the application uses the browser's local storage as a database for users and reports, which makes it a self-contained demo.

## Building and Running

The project is managed with npm. The following commands are available in `package.json`:

*   **`npm run dev`**: Starts the development server. The application will be available at `http://localhost:8080`.
*   **`npm run build`**: Bundles the application for production.
*   **`npm run lint`**: Lints the codebase using ESLint.
*   **`npm run preview`**: Serves the production build locally for preview.

## Development Conventions

*   **Component-Based Architecture:** The application is structured into reusable React components, located in `src/components`.
*   **Styling:** The UI is built using shadcn/ui components and styled with Tailwind CSS. Custom styles and theme variables are defined in `tailwind.config.ts` and `src/index.css`.
*   **State Management:** Global state, such as user authentication, is managed using React's Context API. The contexts are defined in `src/contexts`.
*   **Typing:** The project uses TypeScript. Type definitions for the main data structures (User, Report) are located in `src/types/index.ts`.
*   **Routing:** The application uses React Router for navigation. The routes are defined in `src/App.tsx`.
*   **Data Persistence:** In the absence of a backend, the application uses the browser's local storage to store user and report data. The keys `opengov_users` and `opengov_reports` are used.
*   **Code Quality:** ESLint is used for code linting. The configuration is in `eslint.config.js`.
