const Registration = require('../models/registrations');

const registrationsRouter = require('express').Router();


registrationsRouter.delete('/:id', async (req, res) => {
    try {
        await Registration.findByIdAndDelete(req.params.id);
        return res.status(200).json('Pago de inscripción eliminado 🗑️');
    } catch (error) {
        return res.status(400).json({ error: 'Error al eliminar el pago ✖️' });
    }
});
registrationsRouter.patch('/:id', async (req, res) => {
    try {
        // verifico el pago de la inscripción
        await Registration.findByIdAndUpdate(req.params.id, { verified: true });

        // devuelvo una respuesta positiva (OK) al front-end.
        return res.status(200).json('El pago de inscripción ha sido confirmado correctamente :)');
    } catch (error) {
        console.log(error);
        // en caso de error devuelvo una respuesta negativa (Bad request) al front-end
        return res.status(400).json({ error: 'No se ha podido confirmar el pago de inscripción :(' });
    }
});

module.exports = registrationsRouter;