var express = require("express");
var router = express.Router();
var db = require("../models");

// Get Route

router.get("/", function(req, res){
    db.Cart.find()
    .then(function(items){
        res.json(items);
    })
    .catch(function(err){
        res.send(err)
    })
})

// Post Route
router.post("/", function(req, res){
    db.Cart.create(req.body)
    .then(function(addedItem){
        res.json(addedItem);
    })
    .catch(function(err){
        res.send(err);
    })
        
})

// Show Route
router.get("/:itemId", function(req, res){
    db.Cart.findById(req.params.itemId)
    .then(function(foundItem){
        res.status(201).json(foundItem);
    })
    .catch(function(err){
        res.send(err);
    })
})

// Put / Update Route
router.put("/:itemId", function(req, res){
    db.Cart.findOneAndUpdate({_id: req.params.itemId}, req.body, {new: true})
    .then(function(item){
        res.json(item)
    })
    .catch(function(err){
        res.send(err);
    })
});

//Delete Route
router.delete("/:itemId", function(req, res){
    db.Cart.remove({_id: req.params.itemId})
    .then(function(){
        res.json({message: "Item deleted!"})
    })
    .catch(function(err){
        res.send(err);
    })
});

module.exports = router;