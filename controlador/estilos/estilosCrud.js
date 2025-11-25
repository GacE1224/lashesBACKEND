const Estilo = require('../../modelos/estilo');

// Crear estilo
exports.crearEstilo = async(req, res) => {
    try {
        console.log('📨 Datos recibidos:', req.body);

        const nuevoEstilo = new Estilo(req.body);
        const guardado = await nuevoEstilo.save();

        console.log('✅ Estilo creado correctamente:', guardado);

        res.status(201).json({
            mensaje: 'Estilo creado exitosamente',
            estilo: guardado
        });
    } catch (error) {
        console.error('❌ Error al crear estilo:', error.message);
        res.status(400).json({ error: error.message });
    }
};

//Obtener estilo
exports.obtenerEstilo = async(req, res) => {
    try {
        const estilos = await Estilo.find();
        res.status(200).json(estilos);
    } catch (error) {
        console.error(' Error al obtener técnicas:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener estilos' });
    }

};


// Actualizar estilo
exports.actualizarEstilo = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const estilo = await Estilo.findById(id);
        if (!estilo) {
            return res.status(404).json({ mensaje: 'Estilo no encontrado.' });
        }

        if (nombre) estilo.nombre = nombre;
        if (descripcion) estilo.descripcion = descripcion;

        const actualizado = await estilo.save();

        console.log('✏️ Estilo actualizado:', actualizado);

        res.status(200).json({
            mensaje: 'Estilo actualizado correctamente',
            estilo: actualizado
        });
    } catch (error) {
        console.error('❌ Error al actualizar estilo:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Eliminar estilo
exports.eliminarEstilo = async(req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await Estilo.findByIdAndDelete(id);

        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Estilo no encontrado.' });
        }

        console.log('🗑️ Estilo eliminado:', eliminado);

        res.status(200).json({
            mensaje: 'Estilo eliminado exitosamente',
            estilo: eliminado
        });
    } catch (error) {
        console.error('❌ Error al eliminar estilo:', error.message);
        res.status(500).json({ error: error.message });
    }
};