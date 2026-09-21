## Core Features

- **Authentication System:** Secure user login (powered by Firebase Auth).
- **Course Catalog:** Browse available learning materials with a convenient tab and filtering system.
- **Classroom:** Interactive space with real-time chat support.
- **Progress Tracking:** Tables and filters to monitor performance and course completion status.
- **Modular UI System:** Reusable components (buttons, icons, pagination, avatars) built with Tailwind CSS.

## Tech Stack & Dependencies

Main technologies and tools used in the project:

- **Core:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Backend as a Service (BaaS):** Firebase (Authentication, Firestore / Realtime Database)
- **Routing:** React Router

_The full list of dependencies can be found in the `package.json` file._

## Local Setup Instructions

To run the project on your local machine, follow these steps:

1. **Clone the repository:**
   git clone <YOUR_REPOSITORY_URL>
   cd inHRM

2. **Install dependencies:**
   Use npm (or yarn/pnpm) to install all required packages:
   npm install

3. **Configure environment variables:**
   Create a .env.local file in the root of the project and add your Firebase configuration keys (and any other necessary API keys). Example configuration:
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

4. **Start the development server:**

   npm run dev

   After this, the project will be available in your browser (usually at `http://localhost:5173`).

## Links

Deployment: https://courses-five-jade.vercel.app/
