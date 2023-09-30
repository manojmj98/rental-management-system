const User  = require('../models/userModel.js');
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        let token;

        token = req.cookies.jwt;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        }
        else {
            res.status(401).json({error: 'Not authorized, no token'});
        }


    } catch (error) {
        res.status(401).json({error: 'Not authorized, token failed'});
    }
}

module.exports = auth;