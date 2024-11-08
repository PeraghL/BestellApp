const minDelivery = 15;
const deliveryFee = 3;
let isDelivery = true;
let isCartOpen = false;
let cart = [];

function init() {
  renderAllDishes();
  renderCartSummary();
}

function renderAllDishes() {
  for (let category in myDishes) {
    let container = document.getElementById(
      category.toLocaleLowerCase() + "container"
    );

    if (container) {
      container.innerHTML = "";

      for (let i = 0; i < myDishes[category].length; i++) {
        const dish = myDishes[category][i];

        container.innerHTML += renderDishHTML(dish);
      }
    }
  }
}

function addToCart(name, price) {
  let existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  renderCart();
  toogleCheckoutInfo();
}

function renderCart() {
  let cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const totalPrice = item.price * item.quantity;

    cardContainer.innerHTML += renderCartItemHTML(cart[i]);
  }
  renderCartSummary();
  updateCartButton();
}

function toogleCheckoutInfo() {
  let checkoutInfo = document.getElementById("checkoutInfo");
  let checkoutInfoMain = document.getElementById("checkoutInfoMain");

  if (cart.length > 0) {
    checkoutInfo.classList.add("dp-none");
    checkoutInfoMain.classList.remove("dp-none");
  } else {
    checkoutInfo.classList.remove("dp-none");
    checkoutInfoMain.classList.add("dp-none");
  }
}

function increaseQuantity(name) {
  let item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity += 1;
    renderCart();
  }
}

function decreaseQuantity(name) {
  let item = cart.find((item) => item.name === name);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(name);
      return;
    }
  }
  renderCart();
}

function updateButtonStyles(button, addClass, removeClass) {
  button.classList.add(addClass);
  button.classList.remove(removeClass);
}

function selectDeliveryMode(mode) {
  isDelivery = mode === "lieferung";
  let deliveryButton = document.getElementById("deliveryButton");
  let pickupButton = document.getElementById("pickupButton");

  if (isDelivery) {
    updateButtonStyles(deliveryButton, "button_active", "button_unactive");
    updateButtonStyles(pickupButton, "button_unactive", "button_active");
  } else {
    updateButtonStyles(deliveryButton, "button_unactive", "button_active");
    updateButtonStyles(pickupButton, "button_active", "button_unactive");
  }

  renderCartSummary();
  updateCartButton();
}

function renderCartSummary() {
  let subtotal = calculateSubtotal();
  let delivery = isDelivery ? deliveryFee : 0;
  let total = subtotal + delivery;
  let salesInfoContainer = document.getElementById("checkoutInfoMain");
  let mobileSalesContainer = document.getElementById("mobileCheckout");
  salesInfoContainer.innerHTML = renderSummaryHTML(subtotal, delivery, total);

  if (cart.length > 0) {
    mobileSalesContainer.innerHTML = renderSummaryMobileHTML(total);
  } else {
    mobileSalesContainer.innerHTML = renderSummaryMobileHTML(subtotal);
  }
}

function calculateSubtotal() {
  let subtotal = 0;
  
  for (let i = 0; i < cart.length; i++) {
    subtotal += cart[i].price * cart[i].quantity;
  }
  return subtotal;
}

function clearCart() {
  cart = [];
  renderCart();
  toogleCheckoutInfo();
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  renderCart();
  toogleCheckoutInfo();
}

function closeWindow() {
  let about = document.getElementById("about_us");
  about.classList.add("dp-none");
}

function showWindow() {
  let about = document.getElementById("about_us");
  about.classList.remove("dp-none");
}

function closeCheckoutWindow() {
  let about = document.getElementById("checkout");
  about.classList.add("dp-none");
}

function showCheckoutWindow() {
  let subtotal = calculateSubtotal();

  if (subtotal >= minDelivery) {
    let about = document.getElementById("checkout");
    about.classList.remove("dp-none");
    clearCart();
  } else {
    let minOrderMessage = document.getElementById("minOrderMessage");
    minOrderMessage.textContent = `Der Mindestbestellwert beträgt ${minDelivery} €. Aktuelle Zwischensumme: ${subtotal.toFixed(
      2
    )} €`;
    minOrderMessage.classList.remove("dp-none");
  }
}

function updateCartButton() {
  let cartButton = document.getElementById("mobileCheckout");
  if (isCartOpen) {
    cartButton.innerHTML = `<span>Schließen</span>`;
  } else {
    cartButton.innerHTML = renderSummaryMobileHTML(calculateSubtotal());
  }
}

function toggleCart() {
  let cartDialog = document.getElementById("shoppingMobile");
  cartDialog.classList.toggle("dp-none");
  isCartOpen = !isCartOpen;
  updateCartButton();
}