const express = require('express');
const router = express.Router();
const crud = require('../controlador/estilos/estilosCrud');

// Crear estilo
router.post('/crear', crud.crearEstilo);

//obtener disenos
router.get('/', crud.obtenerEstilo)

// Actualizar estilo
router.put('/actualizar/:id', crud.actualizarEstilo);

// Eliminar estilo
router.delete('/eliminar/:id', crud.eliminarEstilo);


module.exports = router;