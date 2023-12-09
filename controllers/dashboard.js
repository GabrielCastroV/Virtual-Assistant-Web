const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const Grades = require('../models/grades');
const { getDollarPrices } = require('venecodollar');

const dashboardRouter = require('express').Router();

dashboardRouter.get('/', async (request, res) => {
    const students = await User.find();
    const info = await getDollarPrices();
    const dollarPrice = info[5].dollar;
    return res.status(200).json({ students, dollarPrice });
});

module.exports = dashboardRouter;