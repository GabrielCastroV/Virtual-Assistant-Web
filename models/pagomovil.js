const mongoose = require('mongoose');

const pagoMovilSchema = new mongoose.Schema({
    email: String,
    course: String,
    modality: String,
    module: Number,
    payday: Date,
    module_price: Number,
    amount: Number,
    ref_number: Number,
    verified: Boolean,
});

const PagoMovil = mongoose.model('PagoMovil', pagoMovilSchema);

module.exports = PagoMovil;
