export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
},{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];
  
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
  