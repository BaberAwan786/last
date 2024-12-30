import { cart } from "../../data/cart.js";
import { shoes, garments, tables, getProductById } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

const watsappArray = [];

export function renderPaymentSummary() {
  let productPriceCents = 0;
  const shippingCentsPrice = 250;
  const taxRate = 0.10;
  const allProducts = [...shoes, ...garments, ...tables];

  cart.forEach((cartItem) => {
    const product = getProductById(cartItem.productId, allProducts);
    productPriceCents += product.priceCents * cartItem.quantity;

    watsappArray.push(`Item: ${product.name}`);
    watsappArray.push(`Price: $${formatCurrency(product.priceCents)}`);
    watsappArray.push(`Qty: ${cartItem.quantity}`);
  });

  const taxCents = productPriceCents * taxRate;
  const totalCents = productPriceCents + shippingCentsPrice + taxCents;

  watsappArray.push(`Delivery Charge: $${formatCurrency(shippingCentsPrice)}`);
  watsappArray.push(`Estimated Tax: $${formatCurrency(taxCents)}`);
  watsappArray.push(`Final Price: $${formatCurrency(totalCents)}`);

  const paymentSummaryHTML = `
    <div class="name">Full Name:</div>
    <div class="input-div"><input class="name-input" type="text" placeholder="Type your name here..."></div>
    <div class="address">Address:</div>
    <div class="input-div"><input class="address-input" type="text" placeholder="Type your address here..."></div>

    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingCentsPrice)}</div>
    </div>
    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents + shippingCentsPrice)}</div>
    </div>
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>
    <button class="place-order-button button-primary order-btn">Place your order</button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  const nameInputEl = document.querySelector('.name-input');
  const addressInputEl = document.querySelector('.address-input');

  document.querySelector('.order-btn').addEventListener('click', () => {
    const nameInput = nameInputEl.value.trim();
    const addressInput = addressInputEl.value.trim();

    if (!nameInput || !addressInput) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(nameInput)) {
      alert("Please enter a valid name.");
      return;
    }

    if (addressInput.length < 10) {
      alert("Please enter a valid address.");
      return;
    }

    watsappArray.push(`Name: ${nameInput}`);
    watsappArray.push(`Address: ${addressInput}`);

    const message = watsappArray.join("\n");
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "923467713626";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  });
}
