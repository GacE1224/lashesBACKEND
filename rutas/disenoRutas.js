const express = require('express');
const router = express.Router();
const crud = require('../controlador/disenos/disenosCrud');

// Crear diseño
router.post('/crear', crud.crearDiseno);

//obtener diseños
router.get('/', crud.obtenerDiseno);

// Actualizar diseño
router.put('/actualizar/:id', crud.actualizarDiseno);

// Eliminar diseño
router.delete('/eliminar/:id', crud.eliminarDiseno);

module.exports = router;