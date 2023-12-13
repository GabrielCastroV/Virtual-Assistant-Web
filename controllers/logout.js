const logoutRouter = require('express').Router();

logoutRouter.get('/', async (request, response) => {
    const cookies = request.cookies;
    if (!cookies?.accessToken) {
        return response.sendStatus(401);
    }

    response.clearCookie('accessToken', {
        secure: process.env.NODE_ENV === 'production',
        // no one can edit cookies using js.
        httpOnly: true,
    });
    return response.sendStatus(204);
});

module.exports = logoutRouter;