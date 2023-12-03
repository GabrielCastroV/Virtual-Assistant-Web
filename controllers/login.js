const loginRouter = require('express').Router();
require('dotenv').config();

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!(email == process.env.USER_ADMIN && password == process.env.PASSWORD_ADMIN)) {
        return res.status(401).json({ error: 'not logged tho' });
    }
    console.log('logged');
    return res.sendStatus(202);
});

module.exports = loginRouter;