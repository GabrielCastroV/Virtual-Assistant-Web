const jwt = require('jsonwebtoken');

const userExtractor = async (request, response, next) => {
    try {
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.sendStatus(401);
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decoded.email == !process.env.USER_ADMIN) {
            return response.sendStatus(401).json({ error: 'Error al ingresar' });
        }
        request.user = {
            email: process.env.USER_ADMIN,
            password: process.env.PASSWORD_ADMIN,
        };
    } catch (error) {
        return response.sendStatus(403).json({ error: 'Error de usuario' });
    }
    next();
};

module.exports = { userExtractor };