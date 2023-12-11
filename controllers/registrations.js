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

module.exports = registrationsRouter;