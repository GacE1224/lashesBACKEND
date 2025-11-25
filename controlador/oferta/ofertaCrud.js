const Oferta = require('../../modelos/ofertas');
const Catalogo = require("../../modelos/catalogo");


// Crear oferta
exports.crearOferta = async(req, res) => {
    try {
        const { productoId, descripcionCondiciones, precio } = req.body;

        // Buscar el producto en el catálogo
        const producto = await Catalogo.findById(productoId);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        // Crear oferta usando los datos del catálogo
        const nuevaOferta = new Oferta({
            productoId,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            diseño: producto.diseno, // ojo aquí
            estilo: producto.estilo,
            tecnica: producto.tecnica,

            descripcionCondiciones,
            precio,
        });

        await nuevaOferta.save();

        res.status(201).json({
            mensaje: "Oferta creada correctamente",
            data: nuevaOferta
        });

    } catch (error) {
        console.error("Error al crear oferta:", error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las ofertas
exports.obtenerOfertas = async(req, res) => {
    try {
        const ofertas = await Oferta.find();
        res.json(ofertas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener oferta por ID
exports.obtenerOfertaPorId = async(req, res) => {
    try {
        const oferta = await Oferta.findById(req.params.id);
        if (!oferta) return res.status(404).json({ mensaje: "Oferta no encontrada" });
        res.json(oferta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar oferta
exports.actualizarOferta = async(req, res) => {
    try {
        const ofertaActualizada = await Oferta.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        if (!ofertaActualizada) return res.status(404).json({ mensaje: "Oferta no encontrada" });
        res.json({ mensaje: "Oferta actualizada", data: ofertaActualizada });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar oferta
exports.eliminarOferta = async(req, res) => {
    try {
        const ofertaEliminada = await Oferta.findByIdAndDelete(req.params.id);
        if (!ofertaEliminada) return res.status(404).json({ mensaje: "Oferta no encontrada" });
        res.json({ mensaje: "Oferta eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};