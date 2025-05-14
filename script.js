const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
  document.querySelector('.mobile-nav').classList.toggle('active');
});


const cart = {};
const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const confirmBtn = document.getElementById("confirm-btn");
const cartContainer = document.getElementById("cart-container");
const containerBoxes = document.querySelector('.container')

const books = document.querySelectorAll(".box");

books.forEach(book => {
  const title = book.querySelector("p:nth-of-type(1)").textContent;
  const priceText = book.querySelector("p:nth-of-type(3)").textContent;
  let parts = priceText.split(" ");
  let priceWithoutDollar = parts[0].replace("$", "");
  const price = parseFloat(priceWithoutDollar);


  book.querySelector(".rent-btn").addEventListener("click", () => {
    if (cart[title]) {
      cart[title].quantity += 1;
    } else {
      cart[title] = { price, quantity: 1 };
    }
    updateCart();
    cartContainer.style.display = 'block';
  });
});

function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  for (const title in cart) {
    const item = cart[title];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.textContent = `${title} ${item.quantity} days — $${itemTotal}`;
    cartItemsEl.appendChild(li);
  }

  totalPriceEl.textContent = `Total: $${total}`;
}

const cancelBtn = document.querySelector('.cancel');

cancelBtn.addEventListener('click', () => {
  for (const title in cart) {
    delete cart[title];
  }
  totalPriceEl.textContent = `Total: $0`;
  cartItemsEl.innerHTML = '';
  cartContainer.style.display = 'none';
});

const rentImg = document.querySelectorAll('.rent')
const popupImg = document.querySelector('.popup-img')
const popup = document.querySelector('.popup')
const backBtn = document.querySelector('.back-btn')

rentImg.forEach(img => {
  img.addEventListener('click', () => {
    popup.classList.add('active')
    popupImg.src = img.src
    cartContainer.style.display = 'none'
    containerBoxes.classList.add('hidden')
    document.querySelector('header').style.display = 'none'
    document.querySelector('h1').style.display = 'none'
  })
})

backBtn.addEventListener('click', () => {
  popup.classList.remove('active')
  containerBoxes.classList.remove('hidden')
  document.querySelector('header').style.display = 'flex'
  document.querySelector('h1').style.display = 'block'
})