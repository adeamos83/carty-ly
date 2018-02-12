var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/cartly-api");


mongoose.Promise = Promise;

module.exports.Cart = require("./cart");