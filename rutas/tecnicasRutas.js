const express = require('express');
const router = express.Router();
const crud = require('../controlador/tecnicas/tecnicasCrud');

// Crear técnica
router.post('/crear', crud.crearTecnica);

//Obtener Rutas 
router.get('/', crud.obtenerTecnica);

// Actualizar técnica
router.put('/actualizar/:id', crud.actualizarTecnica);

// Eliminar técnica
router.delete('/eliminar/:id', crud.eliminarTecnica);

module.exports = router;