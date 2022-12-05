// database model for categoria

const mongoose = require('mongoose');
const { Schema } = mongoose;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion es necesaria']
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);