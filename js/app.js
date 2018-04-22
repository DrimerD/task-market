function addEvent(elem, type, handler){
    if(elem.addEventListener){
        elem.addEventListener(type, handler, false);
    } else {
        elem.attachEvent('on'+type, function(){ handler.call( elem ); });
    }
    return false;
}

function market() {
    var product = function (name, weight, price) {
        this.name = name;
        this.weight = weight;
        this.price = price;
    };

    var a1 = new product('Banana', 1, 10);
    var a2 = new product('Apple', 1, 20);
    var a3 = new product('Buble', 1, 30);
    var a4 = new product('Gum', 1, 40);

    var products = [];

    products.push(a1,a2,a3,a4);

    for (let i = 0; i < products.length; i++) {
        var item_box = document.createElement('div');
        item_box.classList.add('item_box');
        var item_title = document.createElement('h3');
        item_title.classList.add('item_title');
        var item_weight = document.createElement('span');
        item_weight.classList.add('item_weight');
        var item_price_block = document.createElement('div');
        var item_price = document.createElement('span');
        item_price.classList.add('item_price');
        item_price_block.classList.add('item_price_block');
        var add_item = document.createElement('button');
        add_item.classList.add('add_item');
        add_item.setAttribute('data-id', i);

        item_title.innerText = products[i].name;
        item_weight.innerText = 'Weight: ' + products[i].weight + '\n';
        item_price_block.innerText = 'Price : ';
        item_price.innerText = products[i].price +'$'+'\n';
        add_item.innerText = 'Add to cart';

        item_price_block.appendChild(item_price);
        item_box.appendChild(item_title);
        item_box.appendChild(item_weight);
        item_box.appendChild(item_price_block);
        item_box.appendChild(add_item);
        document.getElementsByClassName('container')[0].appendChild(item_box);
    }
}

market();

var itemBox = document.querySelectorAll('.item_box'),
    cartCont = document.getElementById('cart_content');

function addToCart(e) {
    this.disabled = true;
    var cartData = getCartData() || {},
        parentBox = this.parentNode,
        itemId = this.getAttribute('data-id'),
        itemTitle = parentBox.querySelector('.item_title').innerHTML,
        itemPrice = parentBox.querySelector('.item_price').innerHTML;
    if(cartData.hasOwnProperty(itemId)) {  //якщо є товар +1
        cartData[itemId][2] += 1;
    } else {
        cartData[itemId] = [itemTitle, itemPrice, 1];
    }
    if(!setCartData(cartData)){
        this.disabled = false;
    }
    return false;
}

for(var i = 0; i < itemBox.length; i++){
    addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
    addEvent(itemBox[i].querySelector('.add_item'), 'click', openCart);
}

function openCart(e){
    var cartData = getCartData(),
        totalItems = '',
        total_sum = 0;
    //якщо щось є в корзині готуємо чек
    if(cartData !== null){
        totalItems = '<table class="shopping_list"><tr><th>Name</th><th>Price</th><th>Weight</th></tr>';
        for(var items in cartData){
            totalItems += '<tr>';
            for(var i = 0; i < cartData[items].length; i++) {
                totalItems += '<td>' + cartData[items][i] + '</td>';
                if (i===1) {
                    total_sum += parseInt(cartData[items][i]) * parseInt(cartData[items][i+1]);
                }
            }
            totalItems += '</tr>';
        }
        totalItems += '<tr><td>Total price</td><td>' + total_sum + '$</td></tr></table>';
        cartCont.innerHTML = totalItems;
    } else {

        cartCont.innerHTML = 'In the basket is empty!';
    }
    return false;
}

function getCartData(){
    return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o){
    localStorage.setItem('cart', JSON.stringify(o));
    return false;
}

addEvent(document.getElementById('clear_cart'), 'click', function(e){
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Basket clear.';
});

addEvent(document.getElementById('checkout'), 'click', openCart);

