const Tecnica = require('../../modelos/tecnicas');

// Crear técnica
exports.crearTecnica = async(req, res) => {
    try {
        console.log('📨 Datos recibidos:', req.body);

        const nuevaTecnica = new Tecnica(req.body);
        const guardada = await nuevaTecnica.save();

        console.log('✅ Técnica creada correctamente:', guardada);

        res.status(201).json({
            mensaje: 'Técnica creada exitosamente',
            tecnica: guardada
        });
    } catch (error) {
        console.error('❌ Error al crear técnica:', error.message);
        res.status(400).json({ error: error.message });
    }
};

//Obtener tecnica
exports.obtenerTecnica = async(req, res) => {
    try {
        const tecnicas = await Tecnica.find();
        res.status(200).json(tecnicas);
    } catch (error) {
        console.error(' Error al obtener técnicas:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener técnicas' });
    }

};




// Actualizar técnica
exports.actualizarTecnica = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const tecnica = await Tecnica.findById(id);
        if (!tecnica) {
            return res.status(404).json({ mensaje: 'Técnica no encontrada.' });
        }

        if (nombre) tecnica.nombre = nombre;
        if (descripcion) tecnica.descripcion = descripcion;

        const actualizada = await tecnica.save();

        console.log('✏️ Técnica actualizada:', actualizada);

        res.status(200).json({
            mensaje: 'Técnica actualizada correctamente',
            tecnica: actualizada
        });
    } catch (error) {
        console.error('❌ Error al actualizar técnica:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Eliminar técnica
exports.eliminarTecnica = async(req, res) => {
    try {
        const { id } = req.params;

        const eliminada = await Tecnica.findByIdAndDelete(id);

        if (!eliminada) {
            return res.status(404).json({ mensaje: 'Técnica no encontrada.' });
        }

        console.log('🗑️ Técnica eliminada:', eliminada);

        res.status(200).json({
            mensaje: 'Técnica eliminada exitosamente',
            tecnica: eliminada
        });
    } catch (error) {
        console.error('❌ Error al eliminar técnica:', error.message);
        res.status(500).json({ error: error.message });
    }
};