const express = require('express');
const router = express.Router();
const crud = require('../controlador/catalogo/catalogoCrud');

// Crear Producto (POST /api/catalogo/crear)
router.post('/crear', crud.crearProducto);

// Obtener todos los Productos (GET /api/catalogo/)
router.get('/', crud.obtenerProductos);

// Obtener un Producto (GET /api/catalogo/:id)
router.get('/:id', crud.obtenerProductoPorId);

// Actualizar Producto (PUT /api/catalogo/actualizar/:id)
router.put('/actualizar/:id', crud.actualizarProducto);

// Eliminar Producto (DELETE /api/catalogo/eliminar/:id)
router.delete('/eliminar/:id', crud.eliminarProducto);

module.exports = router;