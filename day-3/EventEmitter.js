const EventEmitter = require('events');

class ShoppingCart extends EventEmitter {
    constructor() {
        super();
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
        this.emit('itemAdded', item);
    }
    removeItem(item) {
        const idx = this.items.indexOf(item);
        if (idx > -1) {
            this.items.splice(idx, 1);
            this.emit('itemRemoved', item);
        }
    }
}
// Usage
const cart = new ShoppingCart();
cart.on('itemAdded', (item) => {
    console.log(`Item added: ${item}`);
});

cart.on('itemRemoved', (item) => {
    console.log(`Item removed: ${item}`);
});

cart.addItem('Apple');
cart.addItem('Banana');
cart.removeItem('Apple');