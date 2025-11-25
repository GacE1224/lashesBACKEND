const express = require('express');
const router = express.Router();
const ofertaCrud = require('../controlador/oferta/ofertaCrud');

// Crear una oferta
router.post('/crear', ofertaCrud.crearOferta);

// Obtener todas las ofertas
router.get('/lista', ofertaCrud.obtenerOfertas);

// Obtener oferta por ID
router.get('/obtener/:id', ofertaCrud.obtenerOfertaPorId);

// Actualizar oferta
router.patch('/actualizar/:id', ofertaCrud.actualizarOferta);

// Eliminar oferta
router.delete('/eliminar/:id', ofertaCrud.eliminarOferta);

module.exports = router;