# Backend Documentation

This document describes the backend structure and setup for the ApnaShow Movie Web project.

## Overview
The backend is intended to provide APIs for movie data, user authentication, bookings, and other features required by the frontend client.

## Folder Structure
```
server/
  controllers/   # Request handlers for API endpoints
  models/        # Database models (e.g., Movie, User, Booking)
  routes/        # API route definitions
  utils/         # Utility functions and helpers
  config/        # Configuration files (e.g., database, environment)
  app.js         # Main Express app entry point
  package.json   # Backend dependencies
```

## Setup Instructions
1. Navigate to the backend folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `server/` directory.
   - Add your database connection string and other secrets.
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   # or
   yarn start
   ```
   The backend will run on `http://localhost:5000` by default.

## API Endpoints (Example)
- `GET /api/movies` - List all movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/bookings` - Create a booking
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication

## Contributing
- Follow the same contribution guidelines as the frontend.
- Ensure code is well-documented and tested.

## License
MIT

## Contact
For backend issues, open an issue or contact the maintainer via GitHub.
