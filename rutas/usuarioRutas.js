// rutas/usuarioRutas.js
const express = require('express');
const router = express.Router();
const crud = require('../controlador/usuario/usuarioCrud');
const auth = require('../middleware/auth');

// Crear usuario
router.post('/crear-usuario', crud.crearUsuario);

// Iniciar sesión (genera token)
router.post('/login', crud.loginUsuario);

// inicio de sesion 
router.post('/loginMovil', crud.loginMovil);

// Actualizar usuario (protegido)
router.put('/actualizar-usuario/:id', auth, crud.actualizarUsuario);

// Eliminar usuario (protegido)
router.delete('/eliminar-usuario/:id', auth, crud.eliminarUsuario);

module.exports = router;