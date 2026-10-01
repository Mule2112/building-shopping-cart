// Data: The products available in the shop
const products = [
  { id: 1, name: "Vanilla Cupcake", price: 2.99 },
  { id: 2, name: "Chocolate Cookie", price: 1.50 },
  { id: 3, name: "Strawberry Cake", price: 5.99 },
  { id: 4, name: "Glazed Donut", price: 1.25 }
];

// DOM Elements
const cartContainer = document.getElementById("products-container");
const productsContainer = document.getElementById("dessert-card-container");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const totalNumberOfItems = document.getElementById("total-items");
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    this.items.push(product);

    // Update the UI list of items
    const { name, price } = product;
    cartContainer.innerHTML += `
      <div class="product" id="dessert${id}">
        <p>${name}</p>
        <p>$${price.toFixed(2)}</p>
      </div>
    `;
  }

  getCounts() {
    return this.items.length;
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;

    // Update UI Labels
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;

    return this.total;
  }

  clearCart() {
    // 1. Check if empty
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    // 2. Confirm with user
    const isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");

    // 3. Reset everything
    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      cartContainer.innerHTML = ""; // Clear the list of items
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = "$0.00";
      cartTaxes.textContent = "$0.00";
      cartTotal.textContent = "$0.00";
    }
  }
}

// 1. Instantiate the cart
const cart = new ShoppingCart();

// 2. Add event listeners to "Add to Cart" buttons
[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", () => {
    cart.addItem(Number(btn.id), products);
    totalNumberOfItems.textContent = cart.getCounts();
    cart.calculateTotal();
  });
});

// 3. Add event listener to "Clear Cart" button (Bound to the cart object)
clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));