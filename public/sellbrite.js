/* global $ */
$(document).ready(function(){
    $.getJSON("/api/products")
    .then(getItems)
    .catch(function(err){
        console.log(err)
    })
    
    $.getJSON("/api/cart")
    .then(function(cartItems){
        addCartItems(cartItems);
        totalCartItems(cartItems);
        cartAmount(cartItems);
    })
    .catch(function(err){
        console.log(err)
    })
    
    $("#products").on("click", ".item-wrapper", function(){
        pickedItem($(this));
    });
    
    $("#cart-items").on("click", ".del-item", function(e){
        e.stopPropagation();
        removeItem($(this).closest(".cart-item-wrapper"));
    })
    
});

// Get items from third-party JSON database
function getItems(items){
    items.products.forEach(function(item){
        getItem(item)
    });
}

// Add items to from third-party Json to Cart.ly website
function getItem(item){
    
    var newItem = $('<div class="col-12 col-md-4 col-lg-3 item-wrapper">' +
     '<div class="card mb-4">' +
      '<img class="card-img-top" src="./assets/img/'+item.filename+'"alt="Card image cap">' +
      '<div class="card-body">' +
        '<p class="card-subtitle text-center" id="item-'+item.filename.substr(0, item.filename.length - 4)+'">' + item.name + '</p>' +
        '<p class="card-text text-center">'+ toDollars(item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + '</p>' +
        '<div class="text-center">' +
            '<a href="#" class="btn btn-outline-secondary btn-sm btn-item">Add to cart</a>' +
        '</div>' +
      '</div>' +
    '</div>' +
'</div>');
    
    newItem.data("id", item.filename.substr(0, item.filename.length - 4));
    newItem.data("name", item.name);
    newItem.data("price", toDollars(item.price));
    $("#products").append(newItem);
}


// Add selected item to Shopping Cart
function pickedItem(item){
    $.post("/api/cart", {
        name: item.data("name"),
        price: item.data("price"),
        sku: item.data("id")
    })
    .then(function(newItem){
        addCartItem(newItem);
    })
    .catch(function(err){
        console.log(err)
    })
}



// Get all items from current items from Shopping Cart
function addCartItems(items){
    items.forEach(function(item){
        addCartItem(item);
    });
}

// Adds Items to Shopping Cart
function addCartItem(item){
    var cartItem = $('<li class="list-group-item cart-item-wrapper" >'+
    '<img src="./assets/img/'+item.sku+'.png" class="float-left border border-secondary" style="height: 50px; width: 50px; object-fit: cover"</img>'+
    '<div class="text-right font-weight-light">'+item.name+' <span class="del-item text-secondary"><i class="fa fa-times-circle"></i></span></div>'+
    '<div class="text-right font-weight-light">'+item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })+'</div>'+
    '</li>')
    cartItem.data("id", item._id);
    cartItem.data("price", item.price);
    
    $("#cart-items").append(cartItem);
    
    // Updates the cart total as the items are added
    updateCartTotal(true);
    
    // Update the purchase amount for the cart total
    updateCartAmount(item, true);
    
}

// Remove item from Cart
function removeItem(item){
    console.log(item.data("price"));
    // Update the purchase amount for the cart total
    updateCartAmount(item, false);
     var clickedItem = item.data("id");
    var deleteUrl = "/api/cart/" + clickedItem;
    $.ajax({
        method: "DELETE",
        url: deleteUrl
    })
    .then(function(data){
        item.remove();
    })
    .catch(function(err){
        console.log(err);
    })
    
    // Updates the cart total as the items are removed
    updateCartTotal(false);
    
}

// Tally's up item total in Cart
function totalCartItems(items){
    var itemTotal = 0;
    items.forEach(function(item){
        itemTotal += item.quantity;
    });
    $("#cart-total").text(itemTotal);
}


// Update Cart's item tally as items are added or removed
function updateCartTotal(add){
   var currentCartTotal = Number($("#cart-total").text());
   if(add === true){
        var newCartTotal = currentCartTotal + 1;
    } else {
        var newCartTotal = currentCartTotal - 1;
    }
    $("#cart-total").text(newCartTotal);
}

// Calculates the total $ amount for the Cart
function cartAmount(items){
    var totalAmount = 0;
    items.forEach(function(item){
        totalAmount += item.price;
    });
    $("#cart-amount").text(totalAmount.toFixed(2))
}

function updateCartAmount(item, add){
    var currentTotal = Number($("#cart-amount").text());
    if(add === true){
        var newTotal = currentTotal + item.price; 
    } else {
        var newTotal = currentTotal - item.data("price");
        console.log(item.data("price"));
    }
    $("#cart-amount").text(newTotal.toFixed(2))
}

// Convert number to dollars
function toDollars(num){
    var dprice = num.toString();
    var dollars = Number(dprice.substr(0,dprice.length - 2));
    var cents = Number("." + dprice.substr(dprice.length-2));
    return dollars + cents
}

