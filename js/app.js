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
    var text ='';

    for (let i = 0; i < products.length; i++) {
        text += products[i].name +' '+products[i].weight +' '+ products[i].price +'$' + '\n';
    }

    var basket = {},
        check, count,
        sum = 0,
        text_result ='';

    do {
        var prod = prompt(text + 'Select product');
        if (prod !== '') {
            products.forEach(function (product) {
                if (prod==product.name) {
                    count = prompt('how much '+ product.name + 'is needed ?');

                    if(product.name in basket) {
                        basket[product.name].weight += +count;
                    } else {
                        basket[product.name] = product;
                        basket[product.name].weight = +count;
                    }
                }
            });
        }
        check = confirm('Everyone chose?');
    }while (!check);

    for (product in basket) {
        text_result += basket[product].name + ' x ' + basket[product].weight + ' = ' + (basket[product].weight * basket[product].price) + '$' +'\n';
        sum += basket[product].weight * basket[product].price;
    }

    alert(text_result + '\n' + sum + '$');
};

market();