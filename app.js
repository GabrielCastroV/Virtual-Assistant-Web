require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const loginRouter = require('./controllers/login');
const createRouter = require('./controllers/create');
const dashboardRouter = require('./controllers/dashboard');
const registrationsRouter = require('./controllers/registrations');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectó a mongodb');
    } catch (error) {
        console.error(error);
        console.log('No conectado con mongodb');
    }
})();

// manejo de rutas y creación de servidor estático.
app.use(express.json());

// creación, manejo y análisis de cookies con js.
app.use(cookieParser());

// seguridad en las interacciones entre diferentes sitios webs y prevencion de ataques no autorizados.
app.use(cors());

// muestra mensajes en consola de las peticiones HTTP.
app.use(morgan('tiny'));

// Rutas Front-End
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/create', express.static(path.resolve(__dirname, 'views', 'create')));
app.use('/dashboard', express.static(path.resolve(__dirname, 'views', 'dashboard')));
app.use('/styles', express.static(path.resolve(__dirname, 'views', 'styles')));
app.use('/images', express.static(path.resolve(__dirname, 'img')));
app.use('/components', express.static(path.resolve(__dirname, 'views', 'components')));


// Rutas Back-End
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/create', createRouter);
app.use('/api/dashboard', userExtractor, dashboardRouter);
app.use('/api/registrations', registrationsRouter);

module.exports = app;