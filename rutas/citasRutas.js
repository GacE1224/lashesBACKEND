const express = require('express');
const router = express.Router();


const citasController = require('../controlador/citas/citasCrud');


router.post('/', citasController.crearCita);


router.get('/', citasController.obtenerCitas);

router.get('/:id', citasController.obtenerCitaPorId);

router.put('/:id', citasController.actualizarCita);


router.delete('/:id', citasController.eliminarCita);

// Exportamos el router para que pueda ser usado en el archivo principal
module.exports = router;