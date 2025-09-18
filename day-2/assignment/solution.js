class Product {
    #name;
    constructor(name, price) {
        this.#name = name;
        this.price = price;
    }

    get name() {
        return this.#name;
    }
}




class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addProduct(product) {
        this.items.push(product);
    }

    getTotal() {
        return this.items.reduce((total, product) => total + product.price, 0);
    }
}

// Example usage
const cart = new ShoppingCart();
const prod1 = new Product('Laptop', 1200);
const prod2 = new Product('Mouse', 25);

cart.addProduct(prod1);
cart.addProduct(prod2);

console.log(prod1.name); // Output: Laptop
prod1.name = 'Tablet';   // No effect, name remains 'Laptop'
console.log(prod1.name); // Output: Laptop
console.log(`Total: $${cart.getTotal()}`); // Output: Total: $1225