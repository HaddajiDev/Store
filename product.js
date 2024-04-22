function Product(Name, description, price, ID, url, url_2, url_3) {
    this.Name = Name;
    this.description = description;
    this.price = price;
    this.ID = ID;
    this.url = url;
    this.url_2 = url_2;
    this.url_3 = url_3;
}

const Set_Product = (Name, description, price, ID, url, url_2, url_3) => {
    return new Product(Name, description, price, ID, url, url_2, url_3);
}

var cookieValue = document.cookie.split('; ').find(row => row.startsWith('myCookie='));


if (cookieValue) {
    cookieValue = cookieValue.split('=')[1];
    var Current_Product = JSON.parse(cookieValue);

    window.onload = function() {
        set_Values();

        function set_Values() {
            if (Current_Product != null) {
                document.getElementById("product_name_pr").innerHTML = Current_Product.Name;
                document.getElementById("product_descrption_pr").innerHTML = Current_Product.description;
                document.getElementById("product_price_pr").innerHTML = Current_Product.price;
                document.getElementById("product_img").src = Current_Product.url;
                document.getElementById("product-extra-img-1").src = Current_Product.url;
                document.getElementById("product-extra-img-2").src = Current_Product.url_2;
                document.getElementById("product-extra-img-3").src = Current_Product.url_3;
                document.getElementById("brand").innerHTML = Current_Product.Name.split(" ")[0];
            }
            var imgs = document.getElementsByClassName("C_btn");
            for (let i = 0; i < 3; i++) {
                imgs[i].addEventListener("click", function() {
                    Change_img("product-extra-img-" + `${i + 1}`);
                });
            }
            document.getElementById("product-extra-img-1").style.borderColor = "red";
            document.getElementById("brand").style.color = "red";
            document.getElementById("cart-btn").addEventListener("click", function() {
                Add_to_Cart_Product();
            });
            document.getElementById("wish-btn").addEventListener("click", function() {
                Add_to_whishlist_product();
            });
        }
    }
}

var cart_count = document.getElementById("cart-count");
var value_2 = Load_Coockies('MyCart=');
if (value_2)
    cart_count.innerHTML = value_2.length;

var wish_count = document.getElementById("wish-count");
var value_3 = Load_Coockies("MyWishlist=");
if (value_3)
    wish_count.innerHTML = value_3.length;


function Load_Coockies(index) {
    let cookieValue = document.cookie.split('; ').find(row => row.startsWith(index));
    if (cookieValue) {
        cookieValue = cookieValue.split('=')[1];
        var Current_Product = JSON.parse(cookieValue);
        return Current_Product;
    }
}
var Main_img = document.getElementById("product_img");


function Change_img(str) {
    Main_img.src = document.getElementById(str).src;
    reset_Color();
    if (Main_img.src == document.getElementById(str).src) {
        document.getElementById(str).style.borderColor = "red";
    }
}


var Cart_products = [];
var Wishlist_products = [];


function Add_to_Cart_Product() {
    var value = Load_Coockies("MyCart=");
    if (value)
        Cart_products = value;
    let this_product = {
        Name: Current_Product.Name,
        description: Current_Product.description,
        price: Current_Product.price,
        ID: getRandomInt(1000),
        url: Current_Product.url,
        url_2: Current_Product.url_2,
        url_3: Current_Product.url_3
    }
    Cart_products.push(this_product);
    document.cookie = 'MyCart=' + JSON.stringify(Cart_products);
    let value_2 = Load_Coockies('MyCart=');
    if (value_2)
        cart_count.innerHTML = value_2.length;
}

function Add_to_whishlist_product() {
    let value = Load_Coockies('MyWishlist=');
    if (value)
        Wishlist_products = value;
    let this_product = {
        Name: Current_Product.Name,
        description: Current_Product.description,
        price: Current_Product.price,
        ID: getRandomInt(1000),
        url: Current_Product.url,
        url_2: Current_Product.url_2,
        url_3: Current_Product.url_3
    }
    Wishlist_products.push(this_product);
    document.cookie = 'MyWishlist=' + JSON.stringify(Wishlist_products);
    let value_2 = Load_Coockies('MyWishlist=');
    if (value_2)
        wish_count.innerHTML = value_2.length;
}



function reset_Color() {
    for (let i = 1; i < 4; i++) {
        document.getElementById("product-extra-img-" + `${i}`).style.borderColor = "rgba(165, 165, 165, 0.644)";
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


export default Set_Product;