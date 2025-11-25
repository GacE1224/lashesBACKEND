const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disenoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
});

module.exports = mongoose.model('disenos', disenoSchema);