const CART_STORAGE_KEY = "bloomValleyCart";
const CUSTOM_ORDER_STORAGE_KEY = "bloomValleyCustomOrder";
const cartPreviewList = document.querySelector("#cart-preview-list");
const cartModal = document.querySelector("#cart-modal");

function getCartItems() {
  try {
    return JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCartItems(cartItems) {
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
}

function clearStoredCart() {
  sessionStorage.removeItem(CART_STORAGE_KEY);
}

function updateCartPreview(cartItems = getCartItems()) {
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
    const cartItems = getCartItems();
    cartItems[item] = (cartItems[item] || 0) + 1;
    saveCartItems(cartItems);
    updateCartPreview();
    alert("Item added to the cart.");
  });
});

document.querySelectorAll(".clear-cart").forEach((button) => {
  button.addEventListener("click", () => {
    clearStoredCart();
    updateCartPreview();
    alert("Cart cleared.");
  });
});

document.querySelectorAll(".process-order").forEach((button) => {
  button.addEventListener("click", () => {
    clearStoredCart();
    updateCartPreview();

    if (cartModal) {
      cartModal.classList.remove("is-open");
    }
    alert("Thank you for your order.");
  });
});

document.querySelectorAll(".view-cart").forEach((button) => {
  button.addEventListener("click", () => {
    updateCartPreview(getCartItems());
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

document.querySelectorAll(".contact-form").forEach((form) => {
  const fields = Array.from(form.querySelectorAll("input, textarea"));

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.value.trim()) {
        field.closest("label").classList.remove("field-error");
        field.removeAttribute("aria-invalid");
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emptyFields = fields.filter((field) => !field.value.trim());

    if (emptyFields.length) {
      alert("All fields must be filled.");

      fields.forEach((field) => {
        const isEmpty = !field.value.trim();
        field.closest("label").classList.toggle("field-error", isEmpty);

        if (isEmpty) {
          field.setAttribute("aria-invalid", "true");
        } else {
          field.removeAttribute("aria-invalid");
        }
      });

      emptyFields[0].focus();
      return;
    }

    const customOrderData = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      customOrder: form.elements["custom-order"].value.trim(),
      feedback: form.elements.feedback.value.trim()
    };

    localStorage.setItem(
      CUSTOM_ORDER_STORAGE_KEY,
      JSON.stringify(customOrderData)
    );

    alert("Thank you for your message.");
  });
});
