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
