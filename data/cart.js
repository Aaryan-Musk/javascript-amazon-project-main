export const cart = [];

export function addToCart(productId) {

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
            quantity: 1
        });
    }
    
}
