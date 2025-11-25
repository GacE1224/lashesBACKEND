const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    diseno: { type: String, required: true },
    estilo: { type: String, required: true },
    tecnica: { type: String, required: true },
    precio: { type: Number, required: true },
});

module.exports = mongoose.model('catalogos', catalogoSchema);