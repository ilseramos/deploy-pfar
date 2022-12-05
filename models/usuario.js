// database model for usuario 

const mongoose = require('mongoose');
const { Schema } = mongoose;

let usuarioSchema = new Schema({
    nickname: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    picture: {
        type: String,
        required: false
    },
    email_verified: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
