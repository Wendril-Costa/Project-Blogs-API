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
};

module.exports = {
    jwtService,
};