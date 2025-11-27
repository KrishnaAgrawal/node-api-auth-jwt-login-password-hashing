const jwt = require('jsonwebtoken');
const users = require('./users');
require('dotenv').config();

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403).json({ message: 'Invalid token: User not authorized' });
        }
        req.user = user;
        next();
    });
}

async function getAllUsers(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403).json({ message: 'Invalid token: User not authorized' });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        req.users = users.reduce((acc, { password, ...rest }) => {
            acc.push(rest);
            return acc;
        }, []);
        next();
    });
}

module.exports = { authenticateToken, getAllUsers };