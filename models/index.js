var mongoose = require("mongoose");
mongoose.set("debug", true);

// Connects Database
var url = process.env.DATABASEURL || "mongodb://localhost/cartly-api"
mongoose.connect(url) ;

mongoose.Promise = Promise;

module.exports.Cart = require("./cart");