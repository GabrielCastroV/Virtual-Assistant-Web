const loginRouter = require('express').Router();
require('dotenv').config();

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (email == process.env.USER_ADMIN && password == process.env.PASSWORD_ADMIN) {
        console.log('logged');
        return res.status(201);
    } else {
        return res.status(401).json({ error: 'not logged' });
    }
});

module.exports = loginRouter;