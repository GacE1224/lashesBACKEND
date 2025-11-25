const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ofertaSchema = new Schema({
    productoId: { type: Schema.Types.ObjectId, ref: "catalogos", required: true },


    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    diseño: { type: String, required: true },
    estilo: { type: String, required: true },
    tecnica: { type: String, required: true },
    descripcionCondiciones: { type: String, required: true },
    precio: { type: Number, required: true },
});

module.exports = mongoose.model('Oferta', ofertaSchema);