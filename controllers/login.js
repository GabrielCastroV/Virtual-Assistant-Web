const loginRouter = require('express').Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admins');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    const adminExist = await Admin.findOne({ email });

    if (!adminExist) {
        return res.status(400).json({ error: 'Email o contraseña inválida.' });
    }
    const isCorrect = await bcrypt.compare(password, adminExist.passwordHash);

    if (!isCorrect) {
        return res.status(400).json({ error: 'Email o contraseña inválida.' });
    }
    const userForToken = {
        id: adminExist.id,
    };
    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
    res.cookie('accessToken', accessToken, {
        // expires in 1 day, adding 24h using this equation.
        expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
        secure: process.env.NODE_ENV === 'production',
        // no one can edit cookies using js.
        httpOnly: true,
    });
    return res.sendStatus(200);
});

module.exports = loginRouter;