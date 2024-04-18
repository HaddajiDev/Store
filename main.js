import Set_Product from "./product.js";

var Current_Product = {};

var Wishlist_products = [];

var Cart_Products = [];

var cards = document.getElementsByClassName("product");
for (let i = 0; i < cards.length; i++) {    
    cards[i].querySelector(".part-1").querySelector('.item_2').querySelector(".btnn").addEventListener("click", function() {
        Get_Product(cards[i]);
    });

    cards[i].querySelector(".part-1 #Wishlist_btn").addEventListener("click", function() {
        Wishlist_product(this);
    });

    cards[i].querySelector(".part-1").querySelector('.item').querySelector(".btnn").addEventListener("click", function() {
        Add_To_Cart(this);
    });
}

function Get_Product(card) {
    Current_Product = Set_Product(card.querySelector(".part-2").innerHTML,
        card.querySelector(".part-2 #product_descrption").innerHTML,
        card.querySelector(".part-2 .product_price").innerHTML, getRandomInt(1000));

    document.cookie = 'myCookie=' + JSON.stringify(Current_Product);
    console.log("Done");
    return Current_Product;
}

function Wishlist_product(arg) {
    var value = Load_Coockies('MyWishlist=');
    if (value)
        Wishlist_products = value;
    Wishlist_products.push(Get_Product(arg.parentNode));
    document.cookie = 'MyWishlist=' + JSON.stringify(Wishlist_products);
}

function Add_To_Cart(arg) {
    var value = Load_Coockies('MyCart=');
    if (value)
        Cart_Products = value;
    Cart_Products.push(Get_Product(arg.parentNode));
    document.cookie = 'MyCart=' + JSON.stringify(Cart_Products);
    console.log(Cart_Products);
    console.log("Done");
}



function Load_Coockies(index) {
    let cookieValue = document.cookie.split('; ').find(row => row.startsWith(index));
    if (cookieValue) {
        cookieValue = cookieValue.split('=')[1];
        var Current_Product = JSON.parse(cookieValue);
        return Current_Product;
    }
}


document.getElementById("Delete_Coockies").addEventListener("click", function() {
    deleteAllCookies();
});

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}