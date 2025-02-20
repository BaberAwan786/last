import { cart, removeFromCart } from "../../data/cart.js";
import { shoes, garments, tables, getProductById } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  if (cart.length === 0) {
    document.querySelector('.js-order-summary').innerHTML = `
      <div class="empty-cart-message">
        Your cart is empty. <a href="index.html">Shop now</a>.
      </div>`;
    return;
  }

  let cartSummaryHTML = '';
  
  const allProducts = [...shoes, ...garments, ...tables];

  cart.forEach((cartItem) => {
    const matchingProduct = getProductById(cartItem.productId, allProducts);

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            <div class="delivery-option">
              <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // Insert the generated HTML into the DOM
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Add delete event listeners for each item
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      // Remove the product item container from the DOM
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      // Re-render the order summary and payment summary
      renderOrderSummary();
      renderPaymentSummary(); // Reflect updated totals
    });
  });
}