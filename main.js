import Set_Product from "./product.js";

var Current_Product = {};

var Wishlist_products = [];

var Cart_Products = [];

var cards = document.getElementsByClassName("product");


for (let i = 0; i < cards.length; i++) {    
    cards[i].querySelector(".item_3 .cart").addEventListener("click", function() {
        Get_Product(cards[i]);
    });

    cards[i].querySelector(".item_2 .wish").addEventListener("click", function() {
        Wishlist_product(cards[i]);
    });

    cards[i].querySelector(".item .btnn").addEventListener("click", function() {
        Add_To_Cart(cards[i]);
    });
}

function Get_Product(card) {    
    Current_Product = {
        Name: card.querySelector("#product_name").innerHTML,
        description: card.querySelector("#product_descrption").innerHTML,
        price: card.querySelector("#product_price").innerHTML,
        ID: getRandomInt(1000),
        url : card.querySelector(".part-1 > img").src,
        url_2 : card.querySelector(".part-1 .img-extra-1").src,
        url_3 : card.querySelector(".part-1 .img-extra-2").src
    };
    document.cookie = 'myCookie=' + JSON.stringify(Current_Product);       
    return Current_Product;
}

var cart_count = document.getElementById("cart-count");
var value_2 = Load_Coockies('MyCart=');
if(value_2)
    cart_count.innerHTML = value_2.length;

var wish_count = document.getElementById("wish-count");
var value_3 = Load_Coockies("MyWishlist=");
if(value_3)
    wish_count.innerHTML = value_3.length;

function Wishlist_product(arg) {
    let value = Load_Coockies('MyWishlist=');
    if (value)
        Wishlist_products = value;    
    Wishlist_products.push(Get_Product(arg.parentNode));
    document.cookie = 'MyWishlist=' + JSON.stringify(Wishlist_products);    
    wish_count.innerHTML = value.length;
}

function Add_To_Cart(arg) {
    let value = Load_Coockies('MyCart=');
    if (value)
        Cart_Products = value;    
    Cart_Products.push(Get_Product(arg.parentNode));    
    document.cookie = 'MyCart=' + JSON.stringify(Cart_Products);    
    let value_2 = Load_Coockies('MyCart=');
    cart_count.innerHTML = value_2.length;
    console.log(Load_Coockies('MyCart='));
}



function Load_Coockies(index) {
    let cookieValue = document.cookie.split('; ').find(row => row.startsWith(index));
    if (cookieValue) {
        cookieValue = cookieValue.split('=')[1];
        var Current_Product = JSON.parse(cookieValue);
        return Current_Product;
    }
}


// document.getElementById("Delete_Coockies").addEventListener("click", function() {
//     deleteAllCookies();
// });

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

var objects = document.getElementsByClassName("obj");

var My_buttons = document.getElementsByClassName("cata");

for(let i = 0; i < objects.length; i++){
    objects[i].style.display = "none";
    My_buttons[i].querySelector("a").addEventListener("click", function(){
        Swap_objects(i);
    });
}

objects[0].style.display = "flex";


function Swap_objects(index){
    for(let i = 0; i < objects.length; i++){
        objects[i].style.display = "none";
    }
    objects[index].style.display = "flex";    
}