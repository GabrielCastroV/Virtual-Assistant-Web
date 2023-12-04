const User = require('../models/user');

const createRouter = require('express').Router();

createRouter.post('/', async (req, res) => {
    const { name, email, course, module, payday, attendance, grades } = req.body;

    if (!name || !email || !course || !module || !payday || !attendance || !grades) {
        return res.status(401).json({ error: 'Todos los datos son requeridos' });
    }
    const userExist = await User.findOne({ email: email });

    if (userExist) {
        return res.status(401).json({ error: 'Usuario ya existe' });
    }

    return res.sendStatus(200);
});

module.exports = createRouter;