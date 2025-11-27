*🛡️ Node.js JWT Authentication API*

A secure, production-ready Node.js authentication API with JWT login, password hashing, rate limiting, RBAC (Role-Based Access Control), and modern security best practices.

This project demonstrates a complete backend setup for user authentication, role management, and API protection.

🚀 Features
Authentication & Security

JWT-based login and authentication

Password hashing with bcryptjs for secure storage

Role-Based Access Control (RBAC) for admin/user privileges

Protected routes that require valid JWT

Rate Limiting & Throttling

Global rate limiting using express-rate-limit

IP-based route-specific rate limiting using rate-limiter-flexible

Automated delays on repeated login attempts to prevent brute-force attacks

API Security Middleware

Helmet: Adds HTTP headers for enhanced security (XSS protection, HSTS, clickjacking prevention, etc.)

CORS: Configured with credentials: true and allowed origins for safe cross-origin requests

Express Middleware

JSON request parsing with express.json()

Body parsing support for POST requests

Clean modular architecture: authController & authMiddleware

Routes
Route	Method	Description
/register	POST	Register a new user
/login	POST	Authenticate user and return JWT
/profile	GET	Protected route; accessible only with JWT
/users	GET	Protected admin route; lists all users
⚡ Installation

Clone the repository:

git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>


Install dependencies:

npm install


Create a .env file:

PORT=5000
JWT_SECRET=your_jwt_secret_key
BCRYPT_SALT_ROUNDS=10


Start the server:

npm start


Server will run on http://localhost:5000 (or your .env PORT).

🔐 Security & Best Practices Implemented

Password Security: All passwords are hashed before storage.

JWT Authentication: All protected routes require a valid JWT token.

RBAC: Role-based access control for admin-only endpoints.

Rate Limiting: Prevents abuse by limiting requests per IP.

Brute Force Protection: Login attempts automatically delayed and blocked after repeated failures.

CORS & Helmet: Protects API from malicious cross-site requests and sets security headers.

🛠️ Tech Stack

Node.js & Express – Backend framework

bcryptjs – Password hashing

jsonwebtoken – JWT authentication

express-rate-limit – Basic global rate limiting

rate-limiter-flexible – Advanced IP throttling and login attempt control

Helmet – Security headers

CORS – Cross-origin request control

📝 Code Structure
.
├── authController.js     # Handles registration and login
├── authMiddleware.js     # JWT authentication & RBAC
├── server.js             # Express server with middleware and routes
├── package.json          # Project dependencies
├── .env                  # Environment variables (JWT secret, port, salt rounds)
└── README.md             # Project documentation

⚡ Usage Example
Register a user
POST /register
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}

Login
POST /login
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}


Response:

{
  "token": "your_jwt_token_here"
}

Access protected route
GET /profile
Authorization: Bearer <your_jwt_token_here>

🛡️ Notes

This project uses in-memory storage for users (users array). For production, replace with a database (MongoDB, PostgreSQL, etc.)

JWT expiration is currently short (1m) for demonstration. Increase in production.

Rate limiter values (points, duration) can be adjusted based on expected traffic.

Ensure JWT_SECRET is strong and private in production.

💡 Future Improvements

Add refresh token mechanism

Integrate Redis for distributed rate limiting

Add email verification and password reset

Implement logging & monitoring for API usage

📄 License

MIT License – feel free to use and modify.
