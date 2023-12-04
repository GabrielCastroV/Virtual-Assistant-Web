const { default: mongoose } = require('mongoose');
const User = require('../models/user');

const createRouter = require('express').Router();

createRouter.post('/', async (req, res) => {
    const { name, email, course, module, payday, attendance, grades } = req.body;

    if (!name || !email || !course || !module || !payday || !attendance || !grades) {
        return res.status(401).json({ error: 'Todos los datos son requeridos' });
    }
    const userExist = await User.findOne({ email: email });

    if (userExist) {
        return res.status(406).json({ error: 'Usuario ya existe' });
    }

    const courses = {
        0: new mongoose.Types.ObjectId('6531590dde534e232e93f921'),
        1: new mongoose.Types.ObjectId('65315b0dde534e232e93f924'),
        2: new mongoose.Types.ObjectId('65315e70de534e232e93f925'),
        3: new mongoose.Types.ObjectId('65315e98de534e232e93f926'),
        4: new mongoose.Types.ObjectId('65315ed0de534e232e93f927'),
        5: new mongoose.Types.ObjectId('65315f36de534e232e93f92a'),
        6: new mongoose.Types.ObjectId('65315f69de534e232e93f92b'),
    };

    const newUser = new User({
        name,
        email,
        studying: courses[course],
        module,
        payday,
        attendance,
        verified: false,
    });

    console.log(newUser);
    return res.sendStatus(200);
});

module.exports = createRouter;