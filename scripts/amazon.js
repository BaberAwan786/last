import { cart, addToCart } from "../data/cart.js";
import { shoes, garments, tables } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

function generateProductHTML(products) {
  return products
    .map((product) => {
      return `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              ${[...Array(10).keys()].map(
                (i) => `<option value="${i + 1}" ${i === 0 ? "selected" : ""}>${i + 1}</option>`
              ).join("")}
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    })
    .join("");
}

const shoesHTML = generateProductHTML(shoes);
const garmentsHTML = generateProductHTML(garments);
const tablesHTML = generateProductHTML(tables);

document.querySelector(".shoes").addEventListener("click", () => {
  document.querySelector(".js-products-grid").innerHTML = shoesHTML;
  attachAddToCartListeners();
});

document.querySelector(".garments").addEventListener("click", () => {
  document.querySelector(".js-products-grid").innerHTML = garmentsHTML;
  attachAddToCartListeners();
});
document.querySelector(".tables").addEventListener("click", () => {
    document.querySelector(".js-products-grid").innerHTML = tablesHTML;
    attachAddToCartListeners();
  });

function updateCartQuantity() {
  const cartQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function attachAddToCartListeners() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}

// Initial Load
document.querySelector(".js-products-grid").innerHTML = shoesHTML;
attachAddToCartListeners();
updateCartQuantity();

document.addEventListener("DOMContentLoaded", () => {
  const sidebarBtn = document.querySelector(".sidebar-btn");
  const sidebar = document.querySelector(".sidebar");
  const listItems = document.querySelectorAll('.sidebar li');

  // Toggle sidebar visibility
  function toggleSidebar() {
    sidebar.classList.toggle("show");
    sidebarBtn.innerHTML = sidebar.classList.contains("show") ? "✖" : "☰";
  }

  // Event listener for sidebar toggle button
  sidebarBtn.addEventListener("click", toggleSidebar);

  // Event listener for each list item to close the sidebar
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebar.classList.remove("show"); // Ensure the sidebar closes
      sidebarBtn.innerHTML = "☰"; // Reset the button icon

    });
  });
});


  