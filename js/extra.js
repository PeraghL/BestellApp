function closeWindow() {
    let about = document.getElementById('about_us');
    about.classList.add('dp-none')
}

function showWindow() {
    let about = document.getElementById('about_us');
    about.classList.remove('dp-none')
}

function closeCheckoutWindow() {
    let about = document.getElementById('checkout');
    about.classList.add('dp-none')
}

function showCheckoutWindow() {
    let subtotal = calculateSubtotal();

    if (subtotal >= minDelivery) {
        let about = document.getElementById('checkout');
        about.classList.remove('dp-none');
        clearCart();
    } else {
        let minOrderMessage = document.getElementById('minOrderMessage');
        minOrderMessage.textContent = `Der Mindestbestellwert beträgt ${minDelivery} €. Aktuelle Zwischensumme: ${subtotal.toFixed(2)} €`;
        minOrderMessage.classList.remove('dp-none');
    }
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
    toogleCheckoutInfo();
}