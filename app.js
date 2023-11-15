require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

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

// Rutas Front-End
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/signup', express.static(path.resolve(__dirname, 'views', 'signup')));
app.use('/styles', express.static(path.resolve(__dirname, 'views', 'styles')));
app.use('/images', express.static(path.resolve(__dirname, 'img')));
app.use('/components', express.static(path.resolve(__dirname, 'views', 'components')));

// muestra mensajes en consola de las peticiones HTTP.
app.use(morgan('tiny'));

// Rutas Back-End


module.exports = app;