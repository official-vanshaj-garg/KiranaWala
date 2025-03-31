const mongoose = require('mongoose');

const storeOwnerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    store: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        products: [{
            name: String,
            price: Number,
            description: String,
            image: String
        }]
    }
});

module.exports = mongoose.model('StoreOwner', storeOwnerSchema);