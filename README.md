<div align="center">
  <br />
    <h1 align="center">TodoApp - Full Stack Task Management Application </h1>
<img width="1470" alt="Dashboard" src="./frontend/public/dashboard.png">
<br />

  <div>
   <img alt='Next.js'src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img alt='Supabase' src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
<img alt='Tailwind CSS' src='https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white'>
<img alt='Prisma' src='https://img.shields.io/badge/Prisma-blue?style=for-the-badge&logo=prisma&logoColor=white'>
<img alt='Inngest' src='https://img.shields.io/badge/Inngest-beige?style=for-the-badge&logo=inngest&logoColor=white'>
<img alt='ArcJet' src='https://img.shields.io/badge/ArcJet-yellow?style=for-the-badge&logo=arcjet&logoColor=white'>
<img alt='Shadcn UI' src='https://img.shields.io/badge/shadcn/ui-pink?style=for-the-badge&logo=shadcnui&logoColor=white'>
  </div>




</div>



## <a name="introduction">✨ Introduction</a>

Developed a modern Full-stack task management application built with React and Node.js using TypeScript. It provides a complete solution for managing your daily tasks with a beautiful, intuitive interface and robust backend functionality.

## <a name="Technology Stack">🛠️ Technology Stack</a>


- **Frontend**

  - React 18 with TypeScript
  - React Router for navigation
  - Zustand for state management
  - React Query with Zod schemas for API data fetching
  - React Hook Form for form handling and validation
  - Tailwind CSS for styling

- **Backend**

  - Node.js with TypeScript
  - MongoDB with Mongoose ODM
  - JWT for authentication
  - bcryptjs for password hashing
  - JWT - JSON Web Tokens for authentication
  - Nodemailer for email services
  


## <a name="features">🔋 Features</a>

🔐 Authentication & User Management
  - User Registration & Login - Secure JWT-based authentication
  - Password Recovery - Forgot password with email reset functionality  
  - User Profiles - Personal account management
  - Session Management - Persistent login sessions

📝 Todo Management
  - Create Todos - Add new tasks with titles and descriptions
  - Read Todos - View all tasks with search and filtering
  - Update Todos - Edit task details and mark as complete/incomplete
  - Delete Todos - Remove tasks with confirmation


## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**1. Clone the Repo**
```bash
git clone https://github.com/Amit-yadav099/Todo-App.git
cd Todo-App
```

**2. Backend Setup**
```bash
cd backend
npm install
```


**3. Configure Environment Variables**

     Create .env file in backend directory:
```bash
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/todoapp
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```
**4. Configure Environment Variables**

```bash
npm run dev
```

**5. Frontend Setup**
```bash
cd ../frontend
npm install
```
**Start Frontend Development Server**
```bash
npm run dev
```
The app will be live at http://localhost:3000
 

## <a name="Project-Structures">📁 Project Structure</a>
```bash
todoapp/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── server.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand state management
│   │   ├── lib/             # API and configuration
│   │   ├── types/           # TypeScript type definitions
│   │   ├── schemas/         # Zod validation schemas
│   │   └── App.tsx          # Main App component
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## <a name="Images">Sample Images</a>
<img width="1470" alt="Dashboard" src="./frontend/public/signup.png">
<img width="1470" alt="Dashboard" src="./frontend/public/login.png">
<img width="1470" alt="Dashboard" src="./frontend/public/todoForm.png">



## <a name="Contribtuing">📌 Contributing</a>

Feel free to fork the repo, open issues, or submit PRs. Contributions are welcome!


