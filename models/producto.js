// database model for producto

const mongoose = require('mongoose');
const { Schema } = mongoose;

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    precioUni: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    descripcion: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false,
        default: 'https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png'
    },
    disponible: {
        type: Boolean,
        required: true,
        default: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: false
    }
});

module.exports = mongoose.model('Producto', productoSchema);