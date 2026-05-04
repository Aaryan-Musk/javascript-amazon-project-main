import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; 
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js' 
import { renderPaymentSummary } from './paymentSummary.js';



// const today = dayjs();
// const free = today.add(7, 'days');
// console.log(free.format('dddd, MMMM D'));
console.log("Getting/importing all the dependencies");

export function renderOrderSummary () {

    let cartSummaryHtml = '';

    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        console.log('getting the delivery date using the deliveryOptionId value of cartItem');
        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        console.log('creating html for the checkout page for products in cart...');

        cartSummaryHtml += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
            </div>
        `;
    });

    function deliveryOptionsHTML (matchingProduct, cartItem) {

        console.log('inside DeliveryOptionsHTML func to get HTML of delivery-options HTML tag')

        console.log("getting delivery options from its FILE. ")

        let html = '';

        deliveryOptions.forEach((deliveryOption) => {

            console.log('checking for each delivery option type out of 3 for the cartItem that has been passed into the function');

            console.log('creating HTML based on the deliveryOptions and CartItem arrays.')
        
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0
            ? 'FREE'
            : `$${formatCurrency(deliveryOption.priceCents)} -`
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `
                <div class="delivery-option js-delivery-option" 
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>
            `
        });

        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {

            const productId = link.dataset.productId;

            console.log('Clicked delete button for product: ' + productId);

            console.log('called removeFromCart function...')
            removeFromCart(productId);
            
            console.log('came back from removeFromCart function.')
            console.log('removing the selected cartItem HTML from the cartSummaryHTML');

            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.remove();
            renderPaymentSummary();

        })
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            console.log('the delivery date option is changed.'); 
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderPaymentSummary();
            renderOrderSummary();
        });
    });


}

renderOrderSummary();