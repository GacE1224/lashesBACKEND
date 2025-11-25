const express = require('express');
const cors = require('cors');

const usuarioRouter = require('./rutas/usuarioRutas');
const tecnicaRouter = require('./rutas/tecnicasRutas');
const estiloRouter = require('./rutas/estilosRutas');
const disenoRouter = require('./rutas/disenoRutas');
const catalogoRouter = require('./rutas/catalogoRutas');
const citasRoutes = require('./rutas/citasRutas');
const ofertaRuta = require('./rutas/ofertaRutas');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/ofertas', ofertaRuta);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/tecnicas', tecnicaRouter);
app.use('/api/estilos', estiloRouter);
app.use('/api/disenos', disenoRouter);
app.use('/api/catalogo', catalogoRouter);
app.use('/api/citas', citasRoutes);
module.exports = app;