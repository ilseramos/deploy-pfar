// database model for carrito

const mongoose = require('mongoose');
const { Schema } = mongoose;

let carritoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('Carrito', carritoSchema);