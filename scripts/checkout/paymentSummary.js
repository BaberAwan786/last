import { cart } from "../../data/cart.js";
import { shoes, garments, tables, getProductById } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let totalCents = 0;
  const shippingCentsPrice = 250;

  // Combine all product arrays for easier lookup
  const allProducts = [...shoes, ...garments, ...tables];

  cart.forEach((cartItem) => {
    // Find the matching product from the combined product list
    const product = getProductById(cartItem.productId, allProducts);

    // Accumulate product price
    productPriceCents += product.priceCents * cartItem.quantity;
  });

  // Calculate total
  totalCents = productPriceCents + shippingCentsPrice;

    const paymentSummaryHTML = ` 
    <div class="name">Full Name:</div>
    <div class="input-div"><input class="name-input" type="text" placeholder="Type your name here..."></div>    
    <div class="adress">Adress:</div>
    <div class="input-div"><input class="adress-input" type="text" placeholder="Type your adress here..."></div>

    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$2.5</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$0</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$0</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary order-btn">
            Place your order
          </button>
          `;

  document.querySelector('.js-payment-summary')
  .innerHTML = paymentSummaryHTML;
  

  document.querySelector('.order-btn').addEventListener('click', () =>{

    const nameInput = document.querySelector('.name-input').value.trim();
    const adressInput = document.querySelector('.adress-input').value.trim();

    if (!nameInput || !adressInput) {
      alert("Please fill in all fields.");
      return;
  }
    watsappArray.push(`Name: ${nameInput}`);
    watsappArray.push(`Adress: ${adressInput}`);



    const message = watsappArray.join(" ");
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "923467713626"
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    

  });
}










