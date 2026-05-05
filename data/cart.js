export let cart;

loadFromStorage();
export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));
    // if(!cart) {
    //     cart = [];
    // }
    if (!cart) {
        cart = [{
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

export function removeFromCart(productId) {
    console.log('entering the removeFromCart function');

    const newCart = [];

    cart.forEach((CartItem) => {
        if(CartItem.productId != productId){
            newCart.push(CartItem);
        }
    });

    cart = newCart;
    saveToStorage();
    console.log('Leaving removeFromCart function');
}

function saveToStorage () {
    console.log('Entering SaveToStorage function...');

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('Leaving SaveToStorage function');
}

export function addToCart(productId) {
    console.log('Entering addToCart function...');

    let matchingItem;

    cart.forEach((CartItem) => {
        if(productId === CartItem.productId){
            matchingItem = CartItem;
        }
    })

    if(matchingItem) {
        matchingItem.quantity++;
    }else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1',
        });
    }
    saveToStorage();
    console.log('Leaving addToCart function');
    
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    console.log("entering updateDeliveryOption function.");

    let matchingItem;

    cart.forEach((CartItem) => {
        if(productId === CartItem.productId){
            matchingItem = CartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
    // location.reload();
}

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {

        console.log(xhr.response);

        if(fun){
            fun();
        }

    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}