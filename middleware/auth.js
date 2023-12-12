const jwt = require('jsonwebtoken');
const Admin = require('../models/admins');

const userExtractor = async (request, response, next) => {
    try {
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.sendStatus(401);
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Admin.findById(decoded.id);
        request.user = user;
    } catch (error) {
        return response.sendStatus(403);
    }
    next();
};

module.exports = { userExtractor };