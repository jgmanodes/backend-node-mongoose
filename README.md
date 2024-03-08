# Node.js Express Authentication Template

This repository serves as a starting point for building a robust authentication system using Node.js, Express, Mongoose, JWT, and environment variables. It includes user controllers and routes for essential authentication functionalities such as login, sign up, forgot password, and account confirmation.

  
## Features
1. User Authentication:
   - Sign up with email and password.
   - Log in with email and password.
   - Forgot password functionality with email reset link.
   - Account confirmation through email.
2. JWT Authentication:
   - Token-based authentication using JSON Web Tokens (JWT).
3. Data Storage:
   - MongoDB integration with Mongoose for storing user data.
4. Environment Variables:
   - Secure configuration using environment variables for sensitive information.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB (Make sure it's running)

## Getting Started

1. Clone this repository
2. Install dependencies
3. Set up your environment variables:
    - Create a `.env` file in the root directory and add the following:

```
PORT=
MONGODB_URI=
JWT_SECRET=
```

Replace your-secret-key with a secure, random string for JWT signing.

## Folder Structure

The project structure is organized as follows:

```
backend-node-mongoose/
|-- config/
|   |-- db.js
|-- controllers/
|   |--userController.js
|-- helpers/
|   |-- generateId.js
|   |-- generateJWT.js
|-- middleware
|   |-- authMiddleware.js
|-- models
|   |-- User.js 
|-- routes
|   |-- userRoutes.js
|-- .env
|-- .gitignore
|-- index.js
|-- package.json
|-- README.md
```

## Configuration

**PORT**: The port on which the server will run.
**MONGODB_URI**: The MongoDB connection URI.
**JWT_SECRET**: Secret key used for signing JWT tokens.

## Usage

1. Start the application:

```bash
npm run dev
```

The server will be running at http://localhost:4000 (or the port specified in the `.env` file).

2. Test the authentication endpoints using a tool like Postman or Thunder Client.


Feel free to customize and extend this template to meet the specific needs of your authentication system. Happy coding!
