const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const {RateLimiterMemory} = require('rate-limiter-flexible');
const authController = require('./authController');
const authMiddleware = require('./authMiddleware');

const app = express();
app.use(helmet());
app.use(cors({
    origin: "https://myfrontend.com",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

// Global basic rate limiting
const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(globalLimiter);

// Specific rate limiting for login and register routes
const authLimiter = new RateLimiterMemory({
    points: 3, // 3 requests
    duration: 30, // per 30 seconds by IP
    blockDuration: 30 // block for 30s after limit is reached
});

async function loginRateLimiter(req, res, next) {
    try {
        await authLimiter.consume(req.ip);
        next();
    } catch (error) {
        const retrySecs = Math.round(error.msBeforeNext / 1000) || 1;
        res.status(429).json({
            message: `Too many attempts. Try again in ${retrySecs} seconds.`
        });
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Public routes
app.post('/register', loginRateLimiter, authController.register);
app.post('/login', loginRateLimiter, async (req, res) => {
    await delay(1000); // 1 sec delay
    return authController.login(req, res);
});

// Protected route
app.get('/profile', authMiddleware.authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}, This is your profile.` });
});

app.get('/users', authMiddleware.getAllUsers, (req, res) => {
    res.json({ message: `Total users ${req.users.length}`, users: req.users });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
});