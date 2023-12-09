const Registration = require('../models/registrations');
const User = require('../models/user');
const { getDollarPrices } = require('venecodollar');

const dashboardRouter = require('express').Router();

dashboardRouter.get('/', async (request, res) => {
    const students = await User.find();
    const info = await getDollarPrices();
    const dollarPrice = info[5].dollar;
    const registrations = await Registration.find();
    return res.status(200).json({ students, dollarPrice, registrations });
});

module.exports = dashboardRouter;