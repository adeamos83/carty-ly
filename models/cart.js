var mongoose = require("mongoose");

// Cart Model

var cartSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    sku: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    }
});

var Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;