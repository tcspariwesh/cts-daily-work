function Product(name, price) {
    Object.defineProperty(this, 'name', {
        value: name,
        writable: false,
        enumerable: true,
        configurable: false
    });
    this.price = price;
}

function ShoppingCart() {
    this.items = [];
}

ShoppingCart.prototype.addProduct = function(product) {
    this.items.push(product);
};

ShoppingCart.prototype.getTotal = function() {
    return this.items.reduce(function(total, product) {
        return total + product.price;
    }, 0);
};

// Example usage
var cart = new ShoppingCart();
var prod1 = new Product('Laptop', 1200);
var prod2 = new Product('Mouse', 25);

cart.addProduct(prod1);
cart.addProduct(prod2);

console.log(prod1.name); // Output: Laptop
prod1.name = 'Tablet';   // No effect, name remains 'Laptop'
console.log(prod1.name); // Output: Laptop
console.log('Total: $' + cart.getTotal()); // Output: Total: $1225