const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('./users');
require('dotenv').config();

// Register a new user
async function register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword };

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
}

async function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (process.env.ADMIN_USERNAME === username && await bcrypt.compare(password, process.env.ADMIN_PASSWORD)) {
        const adminToken = jwt.sign({ username: process.env.ADMIN_USERNAME, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '10m' });
        return res.json({ token: adminToken });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1m' });
    res.json({ token });
}

module.exports = { register, login };