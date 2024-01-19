const PagoMovil = require('../models/pagomovil');
const Registration = require('../models/registrations');
const User = require('../models/user');
const Course = require('../models/courses');
const { getDollarPrices } = require('venecodollar');

const dashboardRouter = require('express').Router();

dashboardRouter.get('/', async (req, res) => {
    const admin = req.user;
    if (!admin) {
        return res.status(400).json({ error: 'No se encontró usuario administrador' });
    }
    try {
        // obtengo todos los estudiantes de mi base de datos
        const students = await User.find();

        // obtengo el precio del dolar actualizado
        const info = await getDollarPrices();

        // selecciono el dolar BCV
        const dollarPrice = info[5].dollar.toFixed(2);

        // obtengo todos mis recibos de pagos de inscripciones
        const registrations = await Registration.find();

        // obtengo todos los recibos de pagos de pago de módulos
        const pagoMovil = await PagoMovil.find();

        // obtengo todos los cursos disponibles
        const courses = await Course.find();

        // devuelvo una respuesta positiva (OK) al front-end
        return res.status(200).json({ students, dollarPrice, registrations, pagoMovil, courses });
    } catch (error) {
        console.log(error);
        // en caso de error, devuelvo una respuesta negativa (Bad request) al front-end
        return res.status(400).json({ error: 'Hubo un error en el servidor :(' });
    }
});

dashboardRouter.delete('/:id', async (req, res) => {
    try {
        // elimino de la base de datos el pago movil
        await PagoMovil.findByIdAndDelete(req.params.id);

        // devuelvo una respuesta positiva al front-end
        return res.status(200).json('Pago de módulo eliminado 🗑️');
    } catch (error) {
        console.log(error);
        // en caso de error, devuelvo una respuesta negativa (Bad request) al front-end.
        return res.status(400).json({ error: 'Error al eliminar el pago ✖️' });
    }
});

dashboardRouter.patch('/:id', async (req, res) => {
    try {
        // verifico al usuario y obtengo el email para sumarle un modulo y un mes
        const { email } = await PagoMovil.findByIdAndUpdate(req.params.id, { verified: true });

        // busco al estudiante mediante el email y obtengo solo el modulo y dia de pago del usuario.
        const { module, payday } = await User.findOne({ email: email });

        // sumo un modulo al estudiante y agrego un mes más de día de pago.
        const upgrated = module + 1;
        const newPayDay = new Date(payday.setMonth(payday.getMonth() + 1));

        // finalmente actualizo los datos del estudiante (modulo y dia de pago)
        await User.findOneAndUpdate({ email: email }, { module: upgrated, payday: newPayDay });

        // devuelvo una respuesta positiva (OK) al front-end.
        return res.status(200).json('Pago de módulo actualizado correctamente :)');
    } catch (error) {
        console.log(error);
        // en caso de error devuelvo una respuesta negativa (Bad request) al front-end
        return res.status(400).json({ error: 'No se ha podido confirmar el pago :(' });
    }
});

module.exports = dashboardRouter;