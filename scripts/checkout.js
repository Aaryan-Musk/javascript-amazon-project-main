import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProductsFetch} from '../data/products.js'
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js'; 
// import '../data/backend-practice.js';


// promises keep our code more flat and easy to read and understand

async function loadPage() {

    await loadProductsFetch();
    // async await works only on promises
    const value = await new Promise((resolve) => {
        loadCart(() => {
            resolve('value3');
        });
    });
    
    renderOrderSummary();
    renderPaymentSummary();    


}

loadPage();

/*
Promise.all([

    loadProductsFetch(),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    }),

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();    
});

*/

// new Promise((resolve) => {

//     loadProducts(() => {
//         console.log('finished loading')
//         resolve('value1');
//     });

// }).then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });

// }).then(() => {

//     renderOrderSummary();
//     renderPaymentSummary();

// });

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });
