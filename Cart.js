var cookieValue = document.cookie.split('; ').find(row => row.startsWith('MyCart='));
var totale_Price = document.getElementById("Total_price");
var price = 0;
var Names = [];

if (cookieValue) {
    cookieValue = cookieValue.split('=')[1];
    var Current_Product = JSON.parse(cookieValue);
    window.onload = function() {
        set_Values();
        console.log(Load_Coockies('MyCart='));

        function set_Values() {
            for (let i = 0; i < Current_Product.length; i++) {
                let Cur_Names = new Set(Current_Product.map(el => el.Name));
                Names = Array.from(Cur_Names);
            }

            for (let i = 0; i < Current_Product.length; i++) {
                var count_el = Current_Product.filter(el => el.Name == Current_Product[i].Name).length;
                if (count_el > 1 && Names.includes(Current_Product[i].Name)) {
                    Spawn_Parent(i, count_el);
                    Names = Names.filter(el => el !== Current_Product[i].Name)
                } else if (count_el == 1) {
                    Spawn_Parent(i, count_el);
                }
            }
        }
    }
}

function Delete_Object(arg, Name) {
    arg.parentElement.remove();
    let Cart_Product = Load_Coockies('MyCart=');
    Cart_Product = Cart_Product.filter(el => el.ID !== Name);
    document.cookie = 'MyCart=' + JSON.stringify(Cart_Product);

    location.reload();
}

function Load_Coockies(index) {
    let cookieValue = document.cookie.split('; ').find(row => row.startsWith(index));
    if (cookieValue) {
        cookieValue = cookieValue.split('=')[1];
        var Current_Product = JSON.parse(cookieValue);
        return Current_Product;
    }
}


function Spawn_Parent(index, value) {
    let parent_div = document.createElement("div");
    document.body.appendChild(parent_div);
    parent_div.setAttribute("class", ".Delete_Object");
    let Name_product = document.createElement("h1");
    parent_div.appendChild(Name_product);

    let Descrption_product = document.createElement("p");
    parent_div.appendChild(Descrption_product);

    let Price_product = document.createElement("p");
    parent_div.appendChild(Price_product);

    let Delete_Product = document.createElement("button");
    parent_div.appendChild(Delete_Product);

    let count = document.createElement("h3");
    parent_div.appendChild(count);

    Delete_Product.innerHTML = "Remove Product";
    Delete_Product.addEventListener("click", function() {
        Delete_Object(this, Current_Product[index].ID);
    });

    count.innerHTML = "Units = " + value;
    Name_product.innerHTML = Current_Product[index].Name;
    Descrption_product.innerHTML = Current_Product[index].description;
    Price_product.innerHTML = Current_Product[index].price;

    let Current_price = Current_Product[index].price.replace(/$/g, '');
    price += parseInt(Current_price, 10) * value;

    totale_Price.innerHTML = "Totale Price = " + price;

}