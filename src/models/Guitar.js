const mongoose = require('mongoose');
const guitarSchema = mongoose.Schema(
    {
        idProd: {
            type: String,
            required: true
        },
        priceID: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;

/* Crear un archivo llamado User.js y utilizando una estructura similar a la de la guitarra, crea un esquema
para un usuario con las propiedades username, email y password las cuales deben ser requeridas y el email unique. Tambien, agrega el timestamps. */