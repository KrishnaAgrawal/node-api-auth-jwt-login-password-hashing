# 🛡️ Node.js JWT Authentication API

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![JWT](https://img.shields.io/badge/JWT-secure-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A **secure, production-ready Node.js authentication API** featuring JWT login, password hashing, rate limiting, RBAC (Role-Based Access Control), and modern security best practices.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based login and authentication
- Password hashing with `bcryptjs` for secure storage
- Role-Based Access Control (RBAC) for admin/user privileges
- Protected routes requiring valid JWT

### ⏱️ Rate Limiting & Throttling
- Global rate limiting using `express-rate-limit`
- IP-based route-specific rate limiting using `rate-limiter-flexible`
- Automated delays on repeated login attempts to prevent brute-force attacks

### 🛡️ API Security Middleware
- **Helmet**: Adds HTTP headers for enhanced security (XSS, HSTS, clickjacking prevention)
- **CORS**: Configured with `credentials: true` and allowed origins

### ⚙️ Express Middleware
- JSON request parsing with `express.json()`
- Body parsing for POST requests
- Clean modular architecture: `authController` & `authMiddleware`

---

## 🗂️ Routes

| Route      | Method | Description |
|-----------|--------|-------------|
| `/register` | POST  | Register a new user |
| `/login`    | POST  | Authenticate user and return JWT |
| `/profile`  | GET   | Protected route; accessible only with JWT |
| `/users`    | GET   | Protected admin route; lists all users |

---

## 🏗️ Architecture Diagram
```
[Frontend App] --HTTPS--> [Node.js API] --JWT--> [Protected Routes]
                                                    |
                                                    |-- Helmet & CORS
                                                    |-- Rate Limiting
                                                    |-- bcrypt password hashing
                                                    |-- RBAC (Admin/User)
                                                    |
                                            [In-memory Users / Database]
```

---

## ⚡ Installation

```bash
# Clone repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
JWT_SECRET=your_jwt_secret_key
BCRYPT_SALT_ROUNDS=10"
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$2b$10$wPgNe9HcoWXVlFU8cKaAGOe1vM2ZW3c0ISI6tusuDhDwFzm29FLC6

# Start server
npm start
```
Server runs on http://localhost:5000 (or your .env PORT).

---

## 🔐 Security & Best Practices

- **Passwords hashed** with bcrypt
- **JWT authentication** for protected routes
- **RBAC** for admin-only endpoints
- **Rate limiting** per IP to prevent abuse
- **Brute-force protection** with automatic delays & blocking
- **CORS & Helmet** for security headers and safe cross-origin requests

---

## 🛠️ Tech Stack

- Node.js & Express
- bcryptjs
- jsonwebtoken
- express-rate-limit
- rate-limiter-flexible
- Helmet
- CORS

---

## 📝 Code Structure
```
.
├── authController.js # Handles registration and login
├── authMiddleware.js # JWT authentication & RBAC
├── server.js # Express server with middleware and routes
├── package.json # Project dependencies
├── .env # Environment variables
└── README.md # Project documentation
```

---

## ⚡ Usage Example

### Register a user
```http
POST /register
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}
```

### Login
```http
POST /login
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}
```

### Admin Login
```http
POST /login
Content-Type: application/json

{
  "username": "admin",
  "password": "adminpassword"
}
```

### Response:
```
{
  "token": "your_jwt_token_here"
}
```

### Access protected route
```
GET /profile
Authorization: Bearer <your_jwt_token_here>
```

### Access admin route
```
GET /users
Authorization: Bearer <your_admin_jwt_token_here>
```

## 🛡️ Notes

- Uses **in-memory storage** for users (`users` array). Replace with a database in production.
- JWT expiration is short (`1m`) for demonstration; increase in production.
- Rate limiter values (`points`, `duration`) can be adjusted.
- Ensure `JWT_SECRET` is **strong and private**.

---

## 💡 Future Improvements

- Add **refresh token mechanism**
- Integrate **Redis** for distributed rate limiting
- Add **email verification & password reset**
- Implement **logging & monitoring**

---

## 📄 License

MIT License – feel free to use and modify.
