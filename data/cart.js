export let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  export function addToCart(productId) {
    // Get selected quantity from the dropdown
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const selectedQuantity = quantitySelector ? Number(quantitySelector.value) : 1;
  
    // Check if the product already exists in the cart
    const matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  
    if (matchingItem) {
      // Update the quantity of the existing item
      matchingItem.quantity += selectedQuantity;
    } else {
      // Add a new item to the cart
      cart.push({
        productId: productId,
        quantity: selectedQuantity,
      });
    }
  
    saveToStorage();
  }
  
  export function removeFromCart(productId) {
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
    saveToStorage();
    
  }
  
