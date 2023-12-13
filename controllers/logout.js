const logoutRouter = require('express').Router();

logoutRouter.get('/', async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.accessToken) {
        return res.status(401).json({ error: 'No se ha podido cerrar sesión' });
    }

    res.clearCookie('accessToken', {
        secure: process.env.NODE_ENV === 'production',
        // no one can edit cookies using js.
        httpOnly: true,
    });
    return res.sendStatus(204);
});

module.exports = logoutRouter;