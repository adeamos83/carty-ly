var mongoose = require("mongoose");
mongoose.set("debug", true);

mongoose.connect(process.env.DATABASEURL);

// mongoose.connect("mongodb://adeamos83:cart1234@ds233208.mlab.com:33208/cart-ly")


mongoose.Promise = Promise;

module.exports.Cart = require("./cart");