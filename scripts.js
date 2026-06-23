const cartItems = {};
const cartPreviewList = document.querySelector("#cart-preview-list");
const cartModal = document.querySelector("#cart-modal");

function updateCartPreview() {
  if (!cartPreviewList) return;

  cartPreviewList.innerHTML = "";
  const items = Object.entries(cartItems);

  if (!items.length) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-cart";
    emptyItem.textContent = "*Cart Empty*";
    cartPreviewList.appendChild(emptyItem);
    return;
  }

  items.forEach(([item, quantity]) => {
    const listItem = document.createElement("li");
    const itemName = document.createElement("span");
    const itemQuantity = document.createElement("span");

    itemName.textContent = item;
    itemQuantity.textContent = `x${quantity}`;
    listItem.append(itemName, itemQuantity);
    cartPreviewList.appendChild(listItem);
  });
}

document.querySelectorAll(".subscribe-button").forEach((button) => {
  button.addEventListener("click", () => {
    alert("Thank you for subscribing.");
  });
});

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.dataset.item || "Item";
    cartItems[item] = (cartItems[item] || 0) + 1;
    updateCartPreview();
    alert("Item added to the cart.");
  });
});

document.querySelectorAll(".clear-cart").forEach((button) => {
  button.addEventListener("click", () => {
    Object.keys(cartItems).forEach((item) => {
      delete cartItems[item];
    });
    updateCartPreview();
    alert("Cart cleared.");
  });
});

document.querySelectorAll(".process-order").forEach((button) => {
  button.addEventListener("click", () => {
    if (cartModal) {
      cartModal.classList.remove("is-open");
    }
    alert("Thank you for your order.");
  });
});

document.querySelectorAll(".view-cart").forEach((button) => {
  button.addEventListener("click", () => {
    updateCartPreview();
    if (cartModal) {
      cartModal.classList.add("is-open");
    }
  });
});

if (cartModal) {
  cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal) {
      cartModal.classList.remove("is-open");
    }
  });
}

document.querySelectorAll(".contact-submit").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Thank you for your message.");
  });
});
