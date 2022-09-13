require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtService = {
    generateToken: (email) => {
        const token = jwt.sign({ user: email }, JWT_SECRET, {
            expiresIn: '3d',
            algorithm: 'HS256',
        });
        
        return token;
    },

    validateToken: (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) return res.status(401).json({ message: 'Token not found' });

        try {
            const decode = jwt.verify(token, JWT_SECRET);
            req.email = decode;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Expired or invalid token' });
        }
    },
};

module.exports = {
    jwtService,
};