function renderDishHTML(dish) {
  return `
      <div class="content_render">
          <div class="top_info">
              <h4>${dish.name}</h4>
              <img src="ref/icons/icons8-plus-35.png" alt="" onclick="addToCart('${dish.name}', ${dish.price})">
          </div>
          <p>${dish.description}</p>
          <p class="bold">${dish.price} €</p>
      </div>
    `;
}

function renderCartItemHTML(item) {
  const totalPrice = item.price * item.quantity;
  return `
      <div class="shopping_menu">
          <div class="shopping_menu_item">
              <img src="ref/icons/icons8-minus-30.png" alt="" onclick="decreaseQuantity('${item.name}')">
              <p>${item.name}</p>
              <p>${totalPrice} €</p>
              <img src="ref/icons/icons8-plus-30.png" alt="" onclick="increaseQuantity('${item.name}')">
              <p>Stück: ${item.quantity}</p>
              <img src="ref/icons/icons8-trash-can-30.png" alt="" onclick="removeFromCart('${item.name}')">
          </div>
      </div>
    `;
}

function renderSummaryHTML(subtotal, delivery, total) {
    return `
      <div class="shopping_cart_sales_info_box">
          <p>Zwischensumme: <span class="bold">${subtotal.toFixed(2)} €</span></p>
          <p>Lieferkosten: <span class="bold">${delivery.toFixed(2)} €</span></p>
          <p>Gesamt: <span class="bold">${total.toFixed(2)} €</span></p>
          <p id="minOrderMessage" class="warning-message dp-none"></p>
          <div class="sales_button">
              <a href="#" onclick="showCheckoutWindow()">Bestellen</a>
          </div>
      </div>
    `;
  }