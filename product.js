function Product(Name, description, price, ID, url) {
    this.Name = Name;
    this.description = description;
    this.price = price;
    this.ID = ID;
    this.url = url;
}

const Set_Product = (Name, description, price, ID, url) => {
    return new Product(Name, description, price, ID, url);
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
            }

        }
    }
}



export default Set_Product;