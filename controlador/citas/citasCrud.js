const Cita = require('../../modelos/citas');

// Crear una nueva cita
exports.crearCita = async(req, res) => {
    const { nombre_usuario, productos, telefono, hora_dia, costo } = req.body;

    try {
        const nuevaCita = new Cita({
            nombre_usuario,
            productos,
            telefono,
            hora_dia,
            costo
        });

        // Guardar en la BD
        const citaGuardada = await nuevaCita.save();

        // Responder con el documento guardado (incluye _id)
        res.status(201).json(citaGuardada);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la cita', error: error.message });
    }
};

// Obtener todas las citas
exports.obtenerCitas = async(req, res) => {
    try {
        const citas = await Cita.find();
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
    }
};

// Obtener cita por ID
exports.obtenerCitaPorId = async(req, res) => {
    try {
        const { id } = req.params;
        const cita = await Cita.findById(id);

        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la cita', error: error.message });
    }
};

// Actualizar cita
exports.actualizarCita = async(req, res) => {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;

        const citaActualizada = await Cita.findByIdAndUpdate(id, datosActualizar, { new: true });

        if (!citaActualizada) {
            return res.status(404).json({ message: 'Cita no encontrada para actualizar' });
        }

        res.status(200).json(citaActualizada);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la cita', error: error.message });
    }
};

// Eliminar cita
exports.eliminarCita = async(req, res) => {
    try {
        const { id } = req.params;
        const citaEliminada = await Cita.findByIdAndDelete(id);

        if (!citaEliminada) {
            return res.status(404).json({ message: 'Cita no encontrada para eliminar' });
        }

        res.status(200).json({ message: 'Cita eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
    }
};