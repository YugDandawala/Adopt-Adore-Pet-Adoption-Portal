# Adopt & Adore: Pet Adoption Portal

A full-stack web application for discovering, favoriting, and adopting pets from shelters and rescues. Built with a modern React frontend and a Node.js/Express/MongoDB backend.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- Browse pets by species, breed, age, size, gender, and location
- View detailed pet profiles with images and descriptions
- User authentication (signup/login)
- Favorite pets and manage your favorites
- Submit adoption applications with detailed forms
- Adoption confirmation and status tracking
- Responsive, modern UI

---

## Project Structure
```
backend/           # Node.js/Express/MongoDB API
  models/          # Mongoose models (Pet, User, Adoption)
  routes/          # API routes (pets, users, adoptions)
  config/          # Database config
  middleware/      # Auth middleware
  server.js        # Main server entry point
frontend/
  myapp/           # React app (Create React App)
    src/
      components/  # Reusable UI components
      pages/       # Main app pages (Home, Browse, Login, etc.)
      styles/      # CSS
    public/        # Static assets
```

---

## Tech Stack
- **Frontend:** React, React Router, React Hook Form, Zod, Lucide React
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, dotenv, cors

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/petadoption
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend React app:
   ```sh
   cd frontend/myapp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints (Sample)
- `GET /api/pets` — List pets (with filters, pagination)
- `GET /api/pets/:id` — Get pet details
- `POST /api/users/signup` — Register user
- `POST /api/users/login` — Login user
- `POST /api/adoptions` — Submit adoption application
- `GET /api/adoptions/:id` — Get adoption status

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)
