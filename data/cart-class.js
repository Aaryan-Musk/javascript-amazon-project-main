class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;

        this.loadFromStorage();

        // never return form constructor
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
        // if(!cart) {
        //     cart = [];
        // }
        if (!this.cartItems) {
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1',
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2',
            }];
        }
    }

    saveToStorage () {
        console.log('Entering SaveToStorage method...');

        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));

        console.log('Leaving SaveToStorage method');
    }

    addToCart(productId) {
        console.log('Entering addToCart method...');

        let matchingItem;

        this.cartItems.forEach((CartItem) => {
            if(productId === CartItem.productId){
                matchingItem = CartItem;
            }
        })

        if(matchingItem) {
            matchingItem.quantity++;
        }else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1',
            });
        }
        this.saveToStorage();
        console.log('Leaving addToCart method');
        
    }

    removeFromCart(productId) {
        console.log('entering the removeFromCart method');

        const newCart = [];

        this.cartItems.forEach((CartItem) => {
            if(CartItem.productId != productId){
                newCart.push(CartItem);
            }
        });

        this.cartItems = newCart;
        this.saveToStorage();
        console.log('Leaving removeFromCart method');
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        console.log("entering updateDeliveryOption function.");

        let matchingItem;

        this.cartItems.forEach((CartItem) => {
            if(productId === CartItem.productId){
                matchingItem = CartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
        // location.reload();
    }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);



