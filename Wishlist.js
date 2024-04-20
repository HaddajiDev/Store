var cookieValue = document.cookie.split('; ').find(row => row.startsWith('MyWishlist='));
var Names = [];
if (cookieValue) {
    cookieValue = cookieValue.split('=')[1];
    var Current_Product = JSON.parse(cookieValue);
    window.onload = function() {
        set_Values();
        console.log(Current_Product);
        function set_Values() {
            for (let i = 0; i < Current_Product.length; i++) {
                let Cur_Names = new Set(Current_Product.map(el => el.Name));
                Names = Array.from(Cur_Names);
            }

            for (let i = 0; i < Current_Product.length; i++) {
                var count_el = Current_Product.filter(el => el.Name == Current_Product[i].Name).length;
                if (count_el > 1 && Names.includes(Current_Product[i].Name)) {
                    Spawn_Cell(i, count_el);
                    Names = Names.filter(el => el !== Current_Product[i].Name)
                } else if (count_el == 1) {
                    Spawn_Cell(i, count_el);
                }
            }

        }
    }

}

function Delete_Object(arg, Name) {
    arg.parentElement.remove();
    let Cart_Product = Load_Coockies('MyWishlist=');
    Cart_Product = Cart_Product.filter(el => el.ID !== Name);
    document.cookie = 'MyWishlist=' + JSON.stringify(Cart_Product);

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

var cart_count = document.getElementById("cart-count");
var value_2 = Load_Coockies('MyCart=');
if(value_2)
    cart_count.innerHTML = value_2.length;

var wish_count = document.getElementById("wish-count");
var value_3 = Load_Coockies("MyWishlist=");
if(value_3)
    wish_count.innerHTML = value_3.length;

function Spawn_Parent(index, value) {
    let parent_div = document.createElement("div");
    document.body.appendChild(parent_div);

    let Name_product = document.createElement("h1");
    parent_div.appendChild(Name_product);

    let Descrption_product = document.createElement("p");
    parent_div.appendChild(Descrption_product);

    let Price_product = document.createElement("p");
    parent_div.appendChild(Price_product);

    let Count = document.createElement("h3");
    parent_div.appendChild(Count);

    let Delete_Product = document.createElement("button");
    parent_div.appendChild(Delete_Product);

    Delete_Product.innerHTML = "Remove Product";
    Delete_Product.addEventListener("click", function() {
        Delete_Object(this, Current_Product[index].ID);
    });

    Count.innerHTML = "Units = " + value;
    Name_product.innerHTML = Current_Product[index].Name;
    Descrption_product.innerHTML = Current_Product[index].description;
    Price_product.innerHTML = Current_Product[index].price;
}

function Spawn_Cell(index, value){
    let Main_parent = document.getElementById("My_table");
    let tr_parent = document.createElement("tr");
    Main_parent.appendChild(tr_parent);

    let td_Name_parent = document.createElement("td");
    tr_parent.appendChild(td_Name_parent);

    let img_Name_Cont = document.createElement("div");
    img_Name_Cont.setAttribute("class", "Pro-img-Name");
    td_Name_parent.appendChild(img_Name_Cont);

    let Main_img = document.createElement("img");
    img_Name_Cont.appendChild(Main_img);

    let product_Name = document.createElement("h4");
    img_Name_Cont.appendChild(product_Name);

    let td_Price_unit_parent = document.createElement("td");
    tr_parent.appendChild(td_Price_unit_parent);

    let Price_unit = document.createElement("h4");
    td_Price_unit_parent.appendChild(Price_unit);

    let td_unit_count = document.createElement("td");
    tr_parent.appendChild(td_unit_count);

    let plus_btn = document.createElement("button");
    plus_btn.innerHTML = "+";
    plus_btn.setAttribute("id", "plus-btn");
    td_unit_count.appendChild(plus_btn);
    
    let Count_input = document.createElement("input");
    Count_input.setAttribute("id", "unit-value");
    Count_input.setAttribute("min", "0");
    Count_input.setAttribute("type", "number");
    td_unit_count.appendChild(Count_input);

    let minus_btn = document.createElement("button");
    minus_btn.innerHTML = "-";
    minus_btn.setAttribute("id", "minus-btn");
    td_unit_count.appendChild(minus_btn);

    minus_btn.addEventListener("click", function(){
        Delete_Object(td_unit_count, Current_Product[index].ID);
    });

    let td_SubTotale = document.createElement("td");
    tr_parent.appendChild(td_SubTotale);

    let subTotale = document.createElement("h4");
    td_SubTotale.appendChild(subTotale);


    Count_input.setAttribute("value", `${value}`);
    Main_img.setAttribute("src", `${Current_Product[index].url}`);
    product_Name.innerHTML = Current_Product[index].Name;
    
    Price_unit.innerHTML = Current_Product[index].price;

    let Current_price = Current_Product[index].price.replace("$", '');
    
    

    subTotale.innerHTML = (parseFloat(Current_price) * value).toFixed(2) + "$";
    

}