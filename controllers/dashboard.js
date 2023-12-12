const PagoMovil = require('../models/pagomovil');
const Registration = require('../models/registrations');
const User = require('../models/user');
const Course = require('../models/courses');
const { getDollarPrices } = require('venecodollar');

const dashboardRouter = require('express').Router();

dashboardRouter.get('/', async (req, res) => {
    try {
        const students = await User.find();
        const info = await getDollarPrices();
        const dollarPrice = info[5].dollar;
        const registrations = await Registration.find();
        const pagoMovil = await PagoMovil.find();
        const courses = await Course.find();
        return res.status(200).json({ students, dollarPrice, registrations, pagoMovil, courses });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error en el servidor :(' });
    }
});

dashboardRouter.delete('/:id', async (req, res) => {
    try {
        await PagoMovil.findByIdAndDelete(req.params.id);
        return res.status(200).json('Pago de módulo eliminado 🗑️');
    } catch (error) {
        return res.status(400).json({ error: 'Error al eliminar el pago ✖️' });
    }
});

dashboardRouter.patch('/:id', async (req, res) => {
    try {
        const { email } = await PagoMovil.findByIdAndUpdate(req.params.id, { verified: true });
        const { module, payday } = await User.findOne({ email: email });
        const upgrated = module + 1;

        payday.setMonth(payday.getMonth() + 1);

        const savedUser = await User.findOneAndUpdate({ email: email }, { module: upgrated }, { payday: payday });
        console.log(savedUser);
        return res.status(200).json('Pago de módulo actualizado!');
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'No se ha podido confirmar el pago' });
    }
});

module.exports = dashboardRouter;