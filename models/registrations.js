const { default: mongoose } = require('mongoose');

const registrationSchema = new mongoose.Schema({
    order_id: String,
    username: String,
    first_name: String,
    currency: String,
    total: Number,
    course: String,
    name: String,
    email: String,
    phone: String,
    verified: Boolean,
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;