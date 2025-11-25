const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tecnicaSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
});

module.exports = mongoose.model('tecnicas', tecnicaSchema);