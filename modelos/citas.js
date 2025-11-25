const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citasSchema = new Schema({
    nombre_usuario: { type: String, required: true },
    productos: { type: String, required: true },
    telefono: { type: Number, required: true },
    hora_dia: { type: Date, required: true },
    costo: { type: Number, required: true }
});

module.exports = mongoose.model('citas', citasSchema);