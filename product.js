function Product(Name, description, price, ID) {
    this.Name = Name;
    this.description = description;
    this.price = price;
    this.ID = ID;
}

const Set_Product = (Name, description, price, ID) => {
    return new Product(Name, description, price, ID);
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
            }

        }
    }
}



export default Set_Product;